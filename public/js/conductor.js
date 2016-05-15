$(function() {
  var celloGame = new CelloGame();
  resetCelloGame();

  $("#reset").click(function() {
    var celloGameAnswer = resetCelloGame();
    $.post("index.html", { answer: {celloGame: celloGameAnswer}});
  });

  function resetCelloGame(){
    celloGame.resetGame();
    var celloGameAnswer = celloGame.answer;
    var celloGameQuestion = celloGame.question;
    var celloGameQuestionSet = celloGame.questionSet;

    $('#answer', '#celloGame').text(celloGameAnswer);
    $('#questionSet', '#celloGame').text(celloGameQuestionSet);
    $('#buttonOne', '#celloGame').text(celloGameQuestion[celloGameAnswer[0]]);
    $('#buttonTwo', '#celloGame').text(celloGameQuestion[celloGameAnswer[1]]);
    $('#buttonThree', '#celloGame').text(celloGameQuestion[celloGameAnswer[2]]);
    $('#buttonFour', '#celloGame').text(celloGameQuestion[celloGameAnswer[3]]);

    return celloGameAnswer;
  }

});
