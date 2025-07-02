$("h1").addClass("margin-50 big-title");

$(document).keydown(function (event) {
  $("h1").text(event.key);
});
