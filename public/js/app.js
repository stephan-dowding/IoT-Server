var clock;
var sound = new Audio('../assets/tick.wav')

$(document).ready(function() {
  clock = $('#clock').FlipClock({
        clockFace: 'MinuteCounter',
        autoStart: false,
            countdown: true,
        callbacks: {
          stop: function() {
            $('.message').html('Time\'s Up!!!')
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
