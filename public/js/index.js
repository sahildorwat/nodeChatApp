const socket = io();

function scrollToBottom () {
    const messages = jQuery('#messages')
    const newMessage = messages.children('li:last-child') 

    const clientHeight = messages.prop('clientHeight')
    const scrollTop = messages.prop('scrollTop')
    const scrollHeight = messages.prop('scrollHeight')
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight()

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        // console.log('should scroll');
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect',function() {
    console.log('connected to server');
})


socket.on('disconnect',function() {
    console.log('connected to server');
})

jQuery('#message-form').on('submit', function(event){
    event.preventDefault();
    const messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage',{from: 'sahil', text: messageTextBox.val()}, function(){
        console.log('got it.')
        messageTextBox.val('');
    })
})

socket.on('newMessage', function(message){
    const createdTimestamp = moment(message.createdAt).format('h:mm a')
    const template = jQuery('#message-template').html();
    const html = Mustache.render(template, {...message, createdAt: createdTimestamp })
    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message){
    const createdTimestamp = moment(message.createdAt).format('h:mm a')
    const template = jQuery('#location-message-template').html();
    const html = Mustache.render(template, {...message, createdAt: createdTimestamp })
    jQuery('#messages').append(html);
    scrollToBottom();
});

const geolocationButton = jQuery('#send-location')
geolocationButton.on('click', function(){
    if(!navigator.geolocation) {
        return alert('this facility is not allowed in yout browser')
    } 
    
    geolocationButton.attr('disabled', 'disabled').text('sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        geolocationButton.removeAttr('disabled').text('send location');
        socket.emit('createLocationMessage', {from: 'sahil', latitude: position.coords.latitude ,
                                        longitude: position.coords.latitude })
    }, function(){
        geolocationButton.removeAttr('disabled').text('send location');
        alert('You have not allowed permissions for geolocation')
    })
})