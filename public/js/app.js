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
    $('.message').html('');
    clock.setTime(data.duration * 60);
    clock.setCountdown(true);
    clock.start();
});

socket.on('start', function(data) {
    $('.message').html("You have got " + data.duration * 60 + " minutes");
    clock.setTime(data.duration * 60);
    clock.setCountdown(true);
    clock.start();
});
