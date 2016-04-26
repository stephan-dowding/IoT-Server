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
            $('#clock').hide();
            $('body').css('background-color', 'black');
            $('#bomb').show();
            $('#bomb')[0].play();
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
