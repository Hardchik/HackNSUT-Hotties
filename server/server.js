const app = require("./app");
const http = require("http");
const server = http.createServer(app);

exports.io = require("socket.io")(server, {
    cors: {
        origin: [process.env.CLIENT_URL]
    }
});

require("./socket");

const PORT = process.env.PORT || 3030;

server.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});