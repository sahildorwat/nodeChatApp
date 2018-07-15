const path = require('path')
const express = require('express');
const socketIO = require('socket.io')
const http = require('http')

const { isRealString } = require('./utils/validation')
const { Users } = require('./utils/users')
const { generateMessage, generateLocationMessage} = require('./utils/message')

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', 'public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));
const users = new Users();

io.on('connection',(socket) => {
    console.log('added new connection');

    socket.on('join', (params, callback) => {
        console.log('inside join', params.name , params.room)
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Need both name and room.')
        }

        socket.join(params.room)
        users.removeUser(socket.id)
        users.addUser( socket.id ,  params.name, params.room )

        io.to(params.room).emit('updateUserList', users.getUserList(params.room))

        socket.emit('newMessage', generateMessage('Admin', 'welcome to chat app'))
        socket.broadcast.to(params.room).emit('newMessage', generateMessage( 'admin', `${params.name}  joined the room`))
        callback();
    });

    socket.on('disconnect', () => {
        const user = users.removeUser(socket.id)
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} left chat room`))

        }
        console.log('client disconnected')
    })

    socket.on('createMessage', (message, callback) => {
        console.log(message);
        const user = users.getUser(socket.id)
        if( user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage( user.name, message.text));
        }
        callback()
    })

    socket.on('createLocationMessage', (message) => {
        console.log(message)
        const user = users.getUser(socket.id)
        if(user) {
            socket.broadcast.to(user.room).emit('newLocationMessage', generateLocationMessage( user.name,
                message.latitude,
                message.longitude ));
        }
    })
})

server.listen(port, function () {
    console.log(`server is runnig on post ${port}`);
})

