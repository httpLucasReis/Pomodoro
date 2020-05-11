const d_seconds = document.querySelector("div#seconds");

var buffer_seconds;
var seconds;
var minuts;
var toCount = false;
var checkClick = false;
var paused = toCount == false && checkClick == true;

function check(start) {
  switch (start) {
    case "work":
      work();
      break;
    case "rest":
      rest();
      break;
    case "stop":
      pause();
      break;
    case "continue":
      continueWork();
      break;
  }
}

function work() {
  buffer_seconds = 1500;
  if (checkClick == false) {
    toCount = true;
    couting();
    checkClick = true;
  }
}

function rest() {
  buffer_seconds = 300;
  if (checkClick == false) {
    toCount = true;
    couting();
    checkClick = true;
  }
}

function pause() {
  toCount = false;
}

function continueWork() {
  toCount = true;
}

function couting() {
  seconds = buffer_seconds % 60;
  minuts = Math.floor(buffer_seconds / 60);

  if (minuts < 10) {
    minuts = "0" + minuts;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  d_seconds.innerHTML = minuts + " : " + seconds;
  setInterval(count, 1000);
}

function count() {
  if (buffer_seconds > 0) {
    if (toCount == true) {
      buffer_seconds--;
      seconds = buffer_seconds % 60;
      minuts = Math.floor(buffer_seconds / 60);

      if (minuts < 10) {
        minuts = "0" + minuts;
      }

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      d_seconds.innerHTML = minuts + " : " + seconds;
    }
  } else {
    d_seconds.innerHTML = "ACABOU";
  }
}
