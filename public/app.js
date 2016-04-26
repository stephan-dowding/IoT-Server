var socket = io('http://localhost:3000/');

socket = io.connect();

// div = document.createElement('div');
// document.getElementById('clock').appendChild(div);

class Bomb {
	constructor(duration) {
		this.duration = duration;
		this.toHHMMSS();

		this.clock = document.createElement('div');
		document.getElementById('clock').appendChild(this.clock);
		
		this.updateDisplay();
	}

	startCountDown() {
		console.log('start countdown')
		if (this.timer) this.stopCountDown()
		this.timer = window.setInterval(this.countdownSecond.bind(this), 1000);
	}

	stopCountDown() {
		window.clearInterval(this.timer)
	}

	countdownSecond() {
		this.duration = this.duration - 1;
		this.toHHMMSS();

		if (this.duration === 0) {
			this.stopCountDown();
			this.div.textContent = "BOOM";
		}
		else this.updateDisplay();
	}

	setTimer(seconds) {
		this.duration = seconds;
	}

	toHHMMSS() {
		this.hour = Math.floor(this.duration / 3600);
		this.minute = Math.floor(this.duration % 3600 / 60);
		this.second = Math.floor(this.duration % 3600 % 60);
	}

	updateDisplay() {
		var hourDisplay = this.hour > 10 ? this.hour.toString() : '0' + this.hour.toString();
		var minuteDisplay = this.minute > 10 ? this.minute.toString() : '0' + this.minute.toString();
		var secondDisplay = this.second > 10 ? this.second.toString() : '0' + this.second.toString();
		this.clock.textContent = hourDisplay + ':' + minuteDisplay + ':' + secondDisplay;
	}
}

var bomb = new Bomb(60);

socket.on('countdown', function(data) {
  var seconds = data.duration * 60;
  bomb.setTimer(seconds);
  bomb.startCountDown();
});