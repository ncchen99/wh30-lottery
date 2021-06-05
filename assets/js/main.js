const csvFilePaths = [
  "./assets/data/畢業活動抽獎名單 - 重複抽獎名單.csv",
  "./assets/data/畢業活動抽獎名單 - IG抽獎名單.csv",
  "./assets/data/畢業活動抽獎名單 - Line抽獎名單.csv",
];
button = $(".card__button");
var classNumber2Name = {};
var idPool = [];
var clickable = true;

function csvJSON(csv) {
  var lines = csv.split("\r\n");

  var result = [];

  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (JSON.stringify(list[i]) === JSON.stringify(obj)) {
      return true;
    }
  }
  return false;
}

function removeByClassNumber(claasNumber) {
  for (i = 0; i < idPool.length; i++) {
    if (idPool[i][Object.keys(idPool[i])[0]] == claasNumber) {
      idPool.splice(i, 1);
      return true;
    }
  }
  return false;
}

button.on("click", function clicked() {
  if (!clickable) return false;
  clickable = false;
  $(this).addClass("card__button--triggered");
  $("#num").removeClass("show-text");
  $("#num").css({ "font-family": "" });
  $(this).off("click", clicked);
  var count = 40;
  var counter = setInterval(timer, 50);
  var randomResult;
  function timer() {
    count -= 1;
    if (count === -1) {
      clearInterval(counter);

      setTimeout(function () {
        count = 40;
        document.getElementById("num").innerHTML =
          idPool[randomResult][Object.keys(idPool[randomResult])[0]];
        $("#num").addClass("show-text");

        setTimeout(function () {
          $("#num").removeClass("show-text");
        }, 1200);
        setTimeout(function () {
          $("#num").css({ "font-family": "'Noto Sans TC', sans-serif" });
          document.getElementById("num").innerHTML =
            classNumber2Name[
              idPool[randomResult][Object.keys(idPool[randomResult])[0]]
            ];
          $("#num").addClass("show-text");
          button.removeClass("card__button--triggered");
          button.on("click", clicked);
          var removeClassNumber =
            idPool[randomResult][Object.keys(idPool[randomResult])[0]];
          idPool.splice(randomResult, 1);
          var success = removeByClassNumber(removeClassNumber);
          clickable = true;
        }, 1500);
      }, 1000);

      return;
    }
    randomResult = randomNumber(0, idPool.length);
    document.getElementById("num").innerHTML = Object.keys(
      idPool[randomResult]
    )[0];
  }
});

(function () {
  "use strict";
  $(document).ready(function () {
    for (var id in csvFilePaths) {
      $.get(csvFilePaths[id]).then((lottery_data) => {
        var data = JSON.parse(csvJSON(lottery_data));
        for (var id in data) {
          if (data[id]["班級座號"])
            classNumber2Name[data[id]["班級座號"]] = data[id]["姓名"]
              ? data[id]["姓名"]
              : "未登記";
          if ("序號1" in data[id]) {
            // duplicate
            for (var i = 1; i < 3; i++) {
              var lottery_id = data[id]["序號" + i];
              if (
                !containsObject(
                  {
                    [lottery_id]: data[id]["班級座號"],
                  },
                  idPool
                ) &&
                data[id]["班級座號"]
              ) {
                idPool.push({ [lottery_id]: data[id]["班級座號"] });
              }
            }
          } else {
            // single
            var lottery_id = data[id]["序號"];
            if (
              !containsObject(
                {
                  [lottery_id]: data[id]["班級座號"],
                },
                idPool
              ) &&
              data[id]["班級座號"]
            ) {
              idPool.push({ [lottery_id]: data[id]["班級座號"] });
            }
          }
        }
      });
      $(".preloader").fadeOut(500);
    }
  });
})();
