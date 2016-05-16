$(function() {
  var celloGame = new CelloGame();
  resetCelloGame();

  $("#reset").click(function() {
    var celloGameAnswer = resetCelloGame();
    $.ajax({
      type: 'POST',
      url: '/reset',
      data: JSON.stringify ({
        "answer": {
          "celloGame": celloGameAnswer
        }
      }),
      contentType: "application/json",
      dataType: 'json'
    });
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
