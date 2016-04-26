var socket = io('http://localhost:3000/')

socket = io.connect()

socket.on('countdown', function(msg) {
  console.log(msg);
});
