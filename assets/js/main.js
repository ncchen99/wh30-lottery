button = $(".card__button");

button.on("click", function clicked() {
  $(this).addClass("card__button--triggered");

  $(this).off("click", clicked);

  var count = 30;
  var counter = setInterval(timer, 100);

  function timer() {
    count -= 1;
    if (count === -1) {
      clearInterval(counter);

      setTimeout(function () {
        count = 30;
        document.getElementById("num").innerHTML = count;

        button.removeClass("card__button--triggered");
        button.on("click", clicked);
      }, 800);

      return;
    }
    document.getElementById("num").innerHTML = count;
  }
});
