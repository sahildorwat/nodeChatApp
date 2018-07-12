const path = require('path')
const express = require('express');
const socketIO = require('socket.io')
const http = require('http')

const { isRealString } = require('./utils/validation')
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', 'public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const { generateMessage, generateLocationMessage} = require('./utils/message')

app.use(express.static(publicPath));

io.on('connection',(socket) => {
    console.log('added new connection');

    socket.on('join', (param, callback) => {
        console.log('inside join', param.name , param.room)
        if (!isRealString(param.name) || !isRealString(param.room)) {
            callback('Need both name and room.')
        }

        callback();
    });



    socket.emit('newMessage', generateMessage('admin', 'welcome to chat app'))
    socket.broadcast.emit('newMessage', generateMessage( 'admin', 'new user joined'))

    socket.on('disconnect', () => {
        console.log('sclient disconnected')
    })

    socket.on('createMessage', (message, callback) => {
        console.log(message);
        io.emit('newMessage', generateMessage( message.from, message.text));
        callback()
    })

    socket.on('createLocationMessage', (message) => {
        console.log(message)
        socket.broadcast.emit('newLocationMessage', generateLocationMessage( message.from,
                                                                             message.latitude,
                                                                             message.longitude ));
    })
})

server.listen(port, function () {
    console.log(`server is runnig on post ${port}`);
})

