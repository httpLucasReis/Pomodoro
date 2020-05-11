const d_seconds = document.querySelector("div#seconds");

var buffer_seconds; // Memória padrão para os segundos
var seconds;
var minuts;
var toCount = false; // Contando?
var checkClick = false; // Clicou?
playAudioT = false;
const audio = document.querySelector("audio");

// Função para inserir um elemento na tela
function display(element) {
  document.getElementById(element).style.display = "inline";
}

// Função para remover um elemento da tela
function remove(element) {
  document.getElementById(element).style.display = "none";
}

// Função para verificar se a contagem está pausada
function paused() {
  let p = toCount == false && checkClick == true;
  if (p) {
    alert("Por favor, despause!");
  }
}

// Função para tocar áudio

function playSound() {
  if (playAudioT == false) {
    audio.play();
    playAudioT = true;
  }
}
// Função para checar qual botão o usuário clicou

function check(start) {
  if (start == "stop") {
    display("continue");
    remove("pause");
  }

  if (start == "continue") {
    display("pause");
    remove("continue");
  }

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
// Função para chamar a contagem específica para um ciclo de trabalho
function work() {
  playAudioT = false; // Reseta a condição para tocar o áudio
  paused();
  buffer_seconds = 1500; // 25 minutos em segundos
  if (checkClick == false) {
    toCount = true;
    couting();
    checkClick = true;
  }
}

// Função para chamar a contagem específica para um cliclo de descanso
function rest() {
  playAudioT = false;
  paused();
  buffer_seconds = 300; // 5 minutos em segundos
  if (checkClick == false) {
    toCount = true;
    couting();
    checkClick = true;
  }
}

// Função que pausa a contagem
function pause() {
  toCount = false;
}

// Função que despausa a contagem
function continueWork() {
  toCount = true;
}

// Transforma os segundos e minutos e os colaca na tela. Chama a função de contagem principal
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

// Tira 1 segundo do buffer_seconds e depois reimprime os minutos na tela
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
    playSound();
  }
}
