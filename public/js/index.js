const socket = io();

socket.on('connect',function() {
    console.log('connected to server');
})


socket.on('disconnect',function() {
    console.log('connected to server');
})

jQuery('#message-form').on('submit', function(event){
    event.preventDefault();
    socket.emit('createMessage',{from: 'sahil', text: jQuery('[name=message]').val()}, function(){
        console.log('got it.')
    })
})

socket.on('newMessage', function(message){
    console.log(message);
    const li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});
