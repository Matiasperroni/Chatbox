import express from 'express';
import logger from 'morgan';
import { Server } from 'socket.io';
import {createServer} from "node:http";


const port = process.env.PORT || 8080

const app = express()
const server = createServer(app)
const io = new Server(server)
app.use(logger("dev"))

io.on("connection", (socket) => {
    console.log("User connected");
})

app.get("/", (req, res) => {
    res.send("<h1>hola si funco</h1>")
})

server.listen(port, () => {
    console.log("Listening on port", port);
})