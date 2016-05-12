$(function() {
  $("#reset").click(function() {
    $.post("/reset");
  });
});
