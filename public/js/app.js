var clock;
var sound = new Audio('../assets/tick.wav')

var timerActive = false;

$(document).ready(function() {
  $('#bomb').hide();
  $('#win').hide();
  clock = $('#clock').FlipClock({
        clockFace: 'MinuteCounter',
        autoStart: false,
        countdown: true,
        callbacks: {
          stop: function() {
            if( timerActive ) {
              handleBoom();
            }
          },
          interval: function () {
            if( timerActive ) {
              sound.play();
            }
          }
        }
    });
});

function handleBoom() {
  timerActive = true;
  socket.emit('times-up', {});
  $('#clock').hide();
  $('#win').hide();
  $('body').css('background-color', 'black');
  $('#bomb').show();
  $('#bomb')[0].play();
  setTimeout(function(){
    $('.message').html("You have failed this city!");
    $('#clock').show();
    $('body').css('background-color', 'white');
    $('#bomb').hide();
    $('#bomb')[0].stop();
  },5000);
}

socket = io.connect();

socket.on('start', function(data) {
    $('#win').hide();
    timerActive = true;
    $('.message').html("");
    clock.setTime(data.duration);
    clock.setCountdown(true);
    clock.start();
});

socket.on('reset', function(data) {
  location.reload();
});

socket.on('message', function(data) {
  $('.message').html(data.message);
});

socket.on('boom', function(data) {
  clock.stop();
});

socket.on('bomb-disarmed', function(data) {
  timerActive = false;
  $('#clock').hide();
  $('#bomb').hide();
  $('#win').show();
});
