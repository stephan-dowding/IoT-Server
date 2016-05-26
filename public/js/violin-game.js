(function (window) {
  function ViolinGame() {
    this.numOfQuestionSet = 14;

    this.question = ["Blue", "Green", "Yellow"];
    this.answer = ["true", "false", "true"];
  }

  ViolinGame.prototype.resetGame = function(){
    return this.randomiseAnswer();
  };

  ViolinGame.prototype.randomiseAnswer = function() {
    var fileReader = new FileReader();
    var selectedSet = '';
    var self = this;
    return fileReader.readLine(this.selectAnswerSet()).then(function(data){
      selectedSet = data.split("|");
      self.answer = selectedSet[1].split(',');
      self.question = selectedSet[0];
      $('#questionSet', '#violinGame').text(self.question);
      $('#answer', '#violinGame').text(self.answer);
      return self.answer;
    });
  };

  ViolinGame.prototype.selectAnswerSet = function() {
    return Math.floor(Math.random() * this.numOfQuestionSet);
  };

  window.ViolinGame = ViolinGame;
})(window);
