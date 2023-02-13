import React, { useState, useRef, useEffect } from "react"
import * as faceapi from "@vladmandic/face-api"
import { useNavigate } from "react-router-dom"
import { useAppliances } from "../contexts/ApplianceProvider";

const FaceRecognition = () => {
    const [username, setUsername] = useState("");
    const videoRef = useRef();
    const isButtonClicked = useRef(false);

    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([
            faceapi.nets.faceRecognitionNet.loadFromUri(`${import.meta.env.VITE_API_URL}/models`),
            faceapi.nets.faceLandmark68Net.loadFromUri(`${import.meta.env.VITE_API_URL}/models`),
            faceapi.nets.ssdMobilenetv1.loadFromUri(`${import.meta.env.VITE_API_URL}/models`) //heavier/accurate version of tiny face detector
        ]).then(start)
    }, [])

    const { setIsLoading } = useAppliances();

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 7000)
    }, [])

    function start() {
        console.log('Models Loaded');
        navigator.getUserMedia(
            { video: {} },
            stream => videoRef.current.srcObject = stream,
            err => console.error(err)
        )
        console.log('video added')
        recognizeFaces()
    }

    async function recognizeFaces() {
        const labeledDescriptors = await loadLabeledImages()
        console.log(labeledDescriptors)
        const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.5)

        let interval;
        videoRef.current.addEventListener('play', async () => {
            console.log('Playing')
            const canvas = faceapi.createCanvasFromMedia(videoRef.current)
            document.getElementById("video-container").append(canvas)

            const displaySize = { width: videoRef.current.width, height: videoRef.current.height }
            console.log(displaySize)
            faceapi.matchDimensions(canvas, displaySize)

            let count = 0;
            interval = setInterval(async () => {
                const detections = await faceapi.detectAllFaces(videoRef.current).withFaceLandmarks().withFaceDescriptors()

                const resizedDetections = faceapi.resizeResults(detections, displaySize)

                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

                const results = resizedDetections.map((d) => {
                    return faceMatcher.findBestMatch(d.descriptor)
                })

                let userFound = false;
                results.forEach((result, i) => {
                    const box = resizedDetections[i].detection.box
                    const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                    drawBox.draw(canvas)
                    if (count === 50) {
                    // stop navigator webcam
                        videoRef.current.srcObject.getTracks().forEach(track => track.stop());

                        clearInterval(interval);
                        navigate("/");
                    }
                    if (result.label === document.getElementById("username").value && result.distance < 0.4) {
                        count++;
                        userFound = true;
                    }
                })
                if (!userFound) count = 0;
            }, 100)
        })
    }

    function loadLabeledImages() {
        const labels = ['Utkarsh', 'Chaitanya'] // for WebCam
        return Promise.all(
            labels.map(async (label) => {
                const descriptions = []
                for (let i = 1; i <= 7; i++) {
                    const img = await faceapi.fetchImage(`${import.meta.env.VITE_API_URL}/labeled_images/${label}/${i}.jpg`)
                    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                    descriptions.push(detections.descriptor)
                }
                console.log(label + ' Faces Loaded | ')
                return new faceapi.LabeledFaceDescriptors(label, descriptions)
            })
        )
    }

    function handleChange(e) {
        if (isButtonClicked.current) return;
        setUsername(e.target.value);
    }

    function handleClick() {
        videoRef.current.play();
        isButtonClicked.current = true;
    }

    return (
        <div id="face-recognition">
            <h2 className="text-4xl font-bold mb-4">Sign in to
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 mx-2">HOME SMARTLYTICS</span> Console</h2>
            <h3 className="text-lg mb-8">Click the sign in button and recognize your face to go to your dashboard</h3>
            <div className="flex items-center justify-center mb-8">
                <div>
                    <label className="font-bold text-lg">Username:</label>
                    <input id="username" className="border-blue-400 outline-blue-400 border-2 rounded-sm mr-6 ml-2 py-2 px-4" placeholder="Username" value={username} onChange={handleChange} />
                </div>
                <button onClick={handleClick}>Sign in</button>
            </div>
            <div id="video-container" className="relative flex items-center justify-center">
                <video ref={videoRef} width="720" height="550" muted></video>
            </div>
        </div>
    )
}

export default FaceRecognition