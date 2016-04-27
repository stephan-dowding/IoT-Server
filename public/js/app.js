var clock;
var sound = new Audio('../assets/tick.wav')

$(document).ready(function() {
  $('#bomb').hide();
  clock = $('#clock').FlipClock({
        clockFace: 'MinuteCounter',
        autoStart: false,
        countdown: true,
        callbacks: {
          stop: function() {
            if(clock.getTime() == 0){
              handleBoom();
            }
          },
          interval: function () {
              sound.play();
          }
        }
    });
});

function handleBoom() {
  socket.emit('times-up', {});
  clock.stop();
  $('#clock').hide();
  $('body').css('background-color', 'black');
  $('#bomb').show();
  $('#bomb')[0].play();
  setTimeout(function(){
    // location.reload();
    $('#clock').show();
    $('body').css('background-color', 'white');
    $('#bomb').hide();
    $('#bomb')[0].stop();
  },5000);
}

socket = io.connect();

socket.on('start', function(data) {
    $('.message').html("");
    clock.setTime(data.duration);
    clock.setCountdown(true);
    clock.start();
});

socket.on('message', function(data) {
  $('.message').html(data.message);
});

socket.on('boom', function(data) {
  handleBoom();
  $('.message').html("You have failed this city!");
});
