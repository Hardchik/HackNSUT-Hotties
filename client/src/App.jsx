import { useEffect } from "react"
import './App.css'
import LoadingScreen from './components/LoadingScreen'
import io from "socket.io-client"
import MiniDrawer from "./components/Drawer";
import FaceRecognition from "./components/FaceRecognition";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Room from "./components/Room";
import { useAppliances } from "./contexts/ApplianceProvider";

export const socket = io(import.meta.env.VITE_API_URL);
socket.on("connect", () => {
  console.log("connected");
})

function App() {
  const { isLoading, setIsLoading } = useAppliances();

  useEffect(() => {
    socket.on("start-loading", () => setIsLoading(true))
    socket.on("stop-loading", () => setIsLoading(false))
  }, [])
  
  return (
    <div className="App">
      {isLoading && <LoadingScreen />}
      <Router>
        <Routes>
          <Route path="/signin" element={<FaceRecognition />} />
          <Route path="/" element={<MiniDrawer />}>
            <Route path="/:roomname" element={<Room />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
