const path = require('path')
const express = require('express');
const socketIO = require('socket.io')
const http = require('http')

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', 'public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const { generateMessage} = require('./utils/message')

app.use(express.static(publicPath));

io.on('connection',(socket) => {
    console.log('added new connection');

    socket.emit('newMessage', generateMessage('admin', 'welcome to chat app'))
    socket.broadcast.emit('newMessage', generateMessage( 'admin', 'new user joined'))

    socket.on('disconnect', () => {
        console.log('sclient disconnected')
    })

    socket.on('createMessage', (message) => {
        io.emit('newMessage', generateMessage( message.from, message.text));

    })
})

server.listen(port, function () {
    console.log(`server is runnig on post ${port}`);
})

