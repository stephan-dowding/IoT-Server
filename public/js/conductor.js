$(function() {
  var celloGame = new CelloGame();

  resetCelloGameAndSendAnswer();

  $("#resetBtn").click(function() {
    resetCelloGameAndSendAnswer();
  });

  function resetCelloGameAndSendAnswer(){
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
  }

  function resetCelloGame(){
    celloGame.resetGame();
    var celloGameAnswer = celloGame.answer;
    var celloGameQuestion = celloGame.question;
    var celloGameQuestionSet = celloGame.questionSet;

    $('#answer', '#celloGame').text(celloGameAnswer);
    $('#questionSet', '#celloGame').text(celloGameQuestionSet);

    for(var i=0; i < celloGameQuestion.length; i++) {
        $('p', '#celloGame #button' + (i + 1)).text(celloGameQuestion[celloGameAnswer[i]]);
        $('img', '#celloGame #button' + (i + 1)).attr('src', getImagePathForButton(celloGameQuestion[celloGameAnswer[i]]));
    }

    function getImagePathForButton(button) {
      var imageFolder = "assets/cellogame/";
      return imageFolder + celloGameQuestionSet + "_"  + button + ".jpg";
    }

    return celloGameAnswer;
  }
});
