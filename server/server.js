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

io.on('connection',(socket) => {
    console.log('added new connection');

    socket.on('disconnect', () => {
        console.log('sclient disconnected')
    })

    socket.emit('newMessage', { message: 'heyyy ... welcome to chat app'})

    socket.on('newMessage', (message) => {
        console.log(message);
    })
})



server.listen(port, function () {
    console.log(`server is runnig on post ${port}`);
})

