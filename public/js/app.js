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

              $('#clock').hide();
              $('body').css('background-color', 'black');
              $('#bomb').show();
              $('#bomb')[0].play();
              setTimeout(function(){location.reload();},5000);
            }
          },
          interval: function () {
              sound.play();
          }
        }
    });
});

socket = io.connect();

socket.on('countdown', function(data) {
    clock.setTime(data.duration);
    clock.setCountdown(true);
    clock.start();
});

socket.on('start', function(data) {
    clock.setTime(data.duration);
    clock.setCountdown(true);
    clock.start();
});

socket.on('message', function(data) {
  $('.message').html(data.message);
});

socket.on('boom', function(data) {
    $('.message').html("You have failed this city!");
});
