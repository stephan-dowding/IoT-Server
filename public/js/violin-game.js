function ViolinGame() {
  this.numOfQuestionSet = 14;

  this.question = ["Blue", "Green", "Yellow"];
  this.answer = ["true", "false", "true"];
}

ViolinGame.prototype.resetGame = function(){
  this.randomiseAnswer();
};

ViolinGame.prototype.randomiseAnswer = function() {
  var fileReader = new FileReader();
  var selectedSet = '';
  var self = this;
  fileReader.readLine(this.selectAnswerSet()).then(function(data){
    selectedSet = data.split("|");
    self.answer = selectedSet[1].split(',');
    self.question = selectedSet[0];
    $('#questionSet', '#violinGame').text(self.question);
  });
};

ViolinGame.prototype.selectAnswerSet = function() {
  return Math.floor(Math.random() * this.numOfQuestionSet);
};

function shuffle(o) {
  for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};

// module.exports = ViolinGame;
