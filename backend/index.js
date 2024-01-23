import express from "express"
import { Server } from "socket.io"
import { createServer } from "http"
import cors from "cors"
import { disconnect } from "process";

const port = 3000;

const app = express();


const server = createServer(app)

const io = new Server(server, {
    cors : {
        origin:"http://localhost:5173",
        methods: ["GET" , "POST"],
        credentials: true,
    }
});

app.use(cors({
    origin:"http://localhost:5173",
    methods: ["GET" , "POST"],
    credentials: true,
}))

app.get('/', (req, res) => {
    res.send("Hello World");
})

io.on("connection", (socket) => {
    console.log("User connected", socket.id)
    // socket.emit("welcome", `welcome to the server, ${socket.id}`)
    // socket.broadcast.emit("welcome", `${socket.id} joined the server`)
    socket.on("message", ({room, message}) => {
        console.log({room,message})
        socket.to(room).emit("receive-message", message)
    })

    socket.on("join-room", (room) => {
        socket.join(room)
    })

    socket.on("disconnect", () => { 
        console.log("User disconnected", socket.id)
    })
})

server.listen(port , () => {
    console.log(`app is up on port ${port}`);
})