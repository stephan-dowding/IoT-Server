function CelloGame() {
  this.numOfQuestionSet = 4;
  this.numOfIconPerQuestionSet = 6;

  this.answer = [0,1,2,3];
  this.questionSet = 0;
  this.question = [0,1,2,3];

  this.resetGame();
}

CelloGame.prototype.resetGame = function(){
  this.randomiseAnswer();
  this.randomiseQuestion();
};

CelloGame.prototype.randomiseAnswer = function() {
  this.answer = shuffle(this.answer);
};

CelloGame.prototype.randomiseQuestion = function() {
  this.questionSet = this.selectQuestionSet();
  this.question = this.selectIconInQuestionSet();
};

CelloGame.prototype.selectQuestionSet = function() {
  return Math.floor(Math.random() * (this.numOfQuestionSet - 1));
};

CelloGame.prototype.selectIconInQuestionSet = function() {
  var iconArray = [];

  for(i = 0; i < this.numOfIconPerQuestionSet; i++) {
    iconArray.push(i);
  }

  iconArray = shuffle(iconArray);
  return iconArray.slice(0, this.answer.length).sort();
};

function shuffle(o) {
  for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};

module.exports = CelloGame;
