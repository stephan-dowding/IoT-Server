(function (window) {
  var colors = {
    red: { "R": 1, "G": 0, "B": 0 },
    green: { "R": 0, "G": 1, "B": 0 },
    blue: { "R": 0, "G": 0, "B": 1 },
    yellow: { "R": 1, "G": 1, "B": 0 },
    white: { "R": 1, "G": 1, "B": 1 },
    purple: { "R": 1, "G": 0, "B": 1 },
    cyan: { "R": 0, "G": 1, "B": 1 },
    off: { "R": 0, "G": 0, "B": 0 }
  }

  var pressConfig = { disarmCount: 0, led: colors['off'] };
  var holdAndReleaseConfig = [
    { disarmCount: 4, led: colors['blue'] },
    { disarmCount: 1, led: colors['white'] },
    { disarmCount: 5, led: colors['yellow'] },
    { disarmCount: 1, led: colors['green'] },
    { disarmCount: 1, led: colors['purple'] },
    { disarmCount: 1, led: colors['cyan'] }
  ];
  var combinations = [
    { type: 'hold', button_text: 'Abort', button_color: 'Green', battery_count: 0, lit_indicator: '' },
    { type: 'press', button_text: 'Detonate', button_color: '', battery_count: 2, lit_indicator: '' },
    { type: 'press', button_text: '', button_color: '', battery_count: 3, lit_indicator: 'FRK' },
    { type: 'hold', button_text: '', button_color: 'Yellow', battery_count: 0, lit_indicator: '' },
    { type: 'press', button_text: 'Hold', button_color: 'Red', battery_count: 0, lit_indicator: '' },
    { type: 'hold', button_text: 'Abort', button_color: 'Red', battery_count: 0, lit_indicator: '' },
    { type: 'hold', button_text: 'Detonate', button_color: 'Red', battery_count: 0, lit_indicator: '' },
    { type: 'hold', button_text: 'Hold', button_color: 'Green', battery_count: 0, lit_indicator: '' },
    { type: 'hold', button_text: 'Disarm', button_color: 'Red', battery_count: 0, lit_indicator: '' }
  ];

  function TrumpetGame() {
    this.question = { type: 'hold', button_text: 'Abort', button_color: 'Red', battery_count: 0, lit_indicator: '' };
    this.answer = { disarmCount: 4, led: colors['blue'] };
  }

  TrumpetGame.prototype.resetGame = function() {
    this.question = combinations[Math.floor(Math.random() * combinations.length)];
    if (this.question.type === 'press') {
      this.answer = pressConfig;
    } else {
      this.answer = holdAndReleaseConfig[Math.floor(Math.random() * holdAndReleaseConfig.length)];
    }

    this.updateView();
    return this.answer;
  };

  TrumpetGame.prototype.updateView = function() {
    $("#buttonColor").text(this.question.button_color || 'N/A');
    $("#buttonText").text(this.question.button_text || 'N/A');
    $("#batteryCount").text(this.question.battery_count || 'N/A');
    $("#litIndicator").text(this.question.lit_indicator || 'N/A');

    if (this.question.type === 'press') {
      $("#answer", "#trumpetGame").text("Press and release immediately")
    } else {
      $("#answer", "#trumpetGame").text("Hold and release when counter is " + this.answer.disarmCount);
    }
  };

  window.TrumpetGame = TrumpetGame;
})(window);
