function CelloGame() {
  this.numOfQuestionSet = 4;
  this.numOfIconPerQuestionSet = 6;

  this.answer = [0,1,2,3];
  this.selectedQuestionSet = 0;
  this.selectedIconsInQuestion = [0,1,2,3];

  this.resetGame();
}

CelloGame.prototype.resetGame = function(){
  this.randomiseAnswer();
  this.randomiseQuestionSet();
};

CelloGame.prototype.randomiseAnswer = function() {
  this.answer = shuffle(this.answer);
};

CelloGame.prototype.randomiseQuestionSet = function() {
  this.selectedQuestionSet = this.selectQuestionSet();
  this.selectedIconsInQuestion = this.selectIconInQuestionSet();
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
