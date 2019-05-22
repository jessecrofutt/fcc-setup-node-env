$( document ).ready(function() {
  
   //following comment suppresses the error generated because io  is not defined in this file
  /*global io*/
  let socket = io();
   
  // Form submittion with new message in field with id 'm'
  $('form').submit(function(){
    var messageToSend = $('#m').val();
    //send message to server here?
    socket.emit('chat message', messageToSend);
    $('#m').val('');
    return false; // prevent form submit from refreshing page
  });
  
  
 
   //listen for connection to server
   socket.on('user', function(data){
    $('#num-users').text(data.currentUsers+' users online');
    var message = data.name;
    if(data.connected) {
      message += ' has joined the chat.';
    } else {
      message += ' has left the chat.';
    }
    $('#messages').append($('<li>').html('<b>'+ message +'</b>'));
  });
  
    socket.on('chat message', object => {
      $('#messages').append($('<li>').text('<b>' + object.name +': ' + object.message +'</b>'));
    });
  

  
  
  

});
