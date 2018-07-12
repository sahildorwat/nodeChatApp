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

socket.on('newLocationMessage', function(message) {
    const li = jQuery('<li></li>');
    const a = jQuery('<a target="_blank"> My current location</a>');
    li.text(`${message.from}:`);
    a.attr('href',message.url)
    li.append(a);
    jQuery('#messages').append(li);
})

const geoloc = jQuery('#geolocation')
geoloc.on('click', function(){
    if(!navigator.geolocation) {
        alert('this facility is not allowed in yout browser')
    } else {
        navigator.geolocation.getCurrentPosition(function(position) {
            socket.emit('createLocationMessage', {from: 'sahil', latitude: position.coords.latitude ,
                                          longitude: position.coords.latitude })
            

        }, function(){
            alert('You have not allowed permissions for geolocation')
        })

    }

})