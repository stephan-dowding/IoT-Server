$(function() {
  $("#reset").click(function() {
    $.post("/reset");
  });

  var celloGame = new CelloGame();
  var celloGameAnswer = celloGame.answer;
  var celloGameQuestion = celloGame.question;
  var celloGameQuestionSet = celloGame.questionSet;

  $('#questionSet', '#celloGame').text(celloGameQuestionSet);
  $('#buttonOne', '#celloGame').text(celloGameQuestion[celloGameAnswer[0]]);
  $('#buttonTwo', '#celloGame').text(celloGameQuestion[celloGameAnswer[1]]);
  $('#buttonThree', '#celloGame').text(celloGameQuestion[celloGameAnswer[2]]);
  $('#buttonFour', '#celloGame').text(celloGameQuestion[celloGameAnswer[3]]);

});
