$(function() {
  var celloGame = new CelloGame();
  var violinGame = new ViolinGame();
  var trumpetGame = new TrumpetGame();

  $("#configBtn").click(function() {
    configureCelloGame();
    configureViolinGame();
    configureTrumpetGame();
  });

  $("#resetBtn").click(function() {
    $.post("/reset");
  });

  $("#armBtn").click(function() {
      $.post("/arm");
  });

  $("#startBtn").click(function() {
    $.ajax({url: "/start",
            method: "POST",
            data: JSON.stringify({duration: parseInt($("#durationTxt").val())}),
            contentType: "application/json"
          });
  });

  function configureViolinGame() {
    violinGame.resetGame().then(function (answer) {
      sendConfig("violin-chip", answer);
    });
  }

  function configureTrumpetGame() {
    var trumpetGameAnswer = trumpetGame.resetGame();
    sendConfig("trumpet-edison", trumpetGameAnswer);
  }

  function configureCelloGame(){
    var celloGameAnswer = resetCelloGame();

    $('#answer', '#celloGame').text(celloGameAnswer);
    sendConfig("cello-chip", { answer: celloGameAnswer });
  }

  function resetCelloGame(){
    celloGame.resetGame();
    var celloGameAnswer = celloGame.answer;
    var celloGameQuestion = celloGame.question;
    var celloGameQuestionSet = celloGame.questionSet;

    $('#questionSet', '#celloGame').text(celloGameQuestionSet);

    for(var i=0; i < celloGameQuestion.length; i++) {
      $('p', '#celloGame #button' + (i + 1)).text(celloGameQuestion[i]);
      $('img', '#celloGame #button' + (i + 1)).attr('src', getImagePathForButton(celloGameQuestion[i], celloGameQuestionSet));
    }

    return celloGameAnswer;
  }

  function sendConfig(deviceName, data) {
    $.ajax({
      type: 'POST',
      url: '/configure',
      data: JSON.stringify({
        "deviceName": deviceName,
        "data": data
      }),
      contentType: "application/json",
      dataType: 'json'
    });
  }

  function getImagePathForButton(button, questionSet) {
    var imageFolder = "assets/cellogame/";
    return imageFolder + questionSet + "_"  + button + ".jpg";
  }
});
