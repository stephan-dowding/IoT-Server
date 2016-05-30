(function (window) {
  function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };

  function CelloGame() {
    this.numOfQuestionSet = 4;
    this.numOfIconPerQuestionSet = 6;

    this.answer = [0,1,2,3];
    this.questionSet = 0;
    this.question = [0,1,2,3];
  }

  CelloGame.prototype.resetGame = function(){
    this.questionSet = this.selectRandomQuestionSet();

    var randomIconWithIndex = this.getRandomIconInQuestionSet();

    this.question = randomIconWithIndex.map(function(el){
      return el[0];
    });

    this.answer = randomIconWithIndex.sort(function(a, b){
        return a[0] - b[0];
    }).map(function(el){
      return el[1];
    });
  };

  CelloGame.prototype.selectRandomQuestionSet = function() {
    return Math.floor(Math.random() * (this.numOfQuestionSet - 1));
  };

  CelloGame.prototype.getRandomIconInQuestionSet = function() {
    var iconArray = [];

    for(i = 0; i < this.numOfIconPerQuestionSet; i++) {
      iconArray.push(i);
    }

    iconArray = shuffle(iconArray).slice(0, this.answer.length);

    return iconArray.map(function(el, index){
      return [el, index];
    });
  };

  window.CelloGame = CelloGame;
})(window);
