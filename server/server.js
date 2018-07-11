const path = require('path')
const express = require('express');
const socketIO = require('socket.io')
const http = require('http')

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', 'public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log(socket);
    console.log('starting new connection')

    socket.on('disconnect', () => {
        console.log('disconnected')
    })
})

server.listen(port, () => {
    console.log(`server is runnig on post ${port}`);
})

