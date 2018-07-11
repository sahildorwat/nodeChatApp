const socket = io();

socket.on('connect',function() {
    console.log('connected to server');

    setTimeout(function() {
        socket.emit('newMessage', {message: 'I am good'})
    },2000);

})

socket.on('newMessage', function(message){
    console.log(message);
})

socket.on('disconnect',function() {
    console.log('connected to server');
})