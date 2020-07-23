const d_seconds = document.querySelector("div#seconds");
d_seconds.innerHTML = "25 : 00";

var buffer_seconds; // Memória padrão para os segundos
var seconds;
var minuts;
var toCount = false; // Contando?
var checkClick = false; // Clicou?
var playAudioT = false;
var interval;
var typeOfPomo;

const oldtitle = document.title;
const audio = document.querySelector("audio");

// Carregando o localStorage
reloadBufferPomo();

// Função para inserir um elemento na tela
function display(element) {
  document.getElementById(element).style.display = "inline";
}

// Função para remover um elemento da tela
function remove(element) {
  document.getElementById(element).style.display = "none";
}

// Função resetar a contagem mesmo que o usuário tenha pausado
function forceCount() {
  toCount = true;
}

// Função que limpa o intervalo é libera a opção de clique.
function resetPomo() {
  clearInterval(interval);
  checkClick = false;
}

// Função para tocar áudio

function playSound() {
  if (playAudioT == false) {
    audio.play();
    playAudioT = true;
  }
}

// Função para checar qual botão o usuário clicou

function check(task) {

  if (task == "stop") {
    display("continue");
    remove("pause");
  } else {
    display("pause");
    remove("continue");
  }

  switch (task) {
    case "work":
      work();
      break;
    case "srest":
      shortRest();
      break;
    case "lrest":
      longRest();
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
  forceCount();
  buffer_seconds = 1500; // 25 minutos em segundos
  if (checkClick == false) {
    toCount = true;
    couting();
    checkClick = true;
  }
}

// Descanso Curto

function shortRest() {
  playAudioT = false;
  forceCount();
  buffer_seconds = 300; // 5 minutos em segundos
  if (checkClick == false) {
    toCount = true;
    couting();
    checkClick = true;
  }
}

// Descanso longo
function longRest() {
  playAudioT = false;
  forceCount();
  buffer_seconds = 600;
  console.log(checkClick);
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

// Função para o acrescenta 0 em números menores que 10

function addZero(minuts, seconds) {
  if (minuts < 10) {
    minuts = "0" + minuts;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return [minuts, seconds];
}

// Transforma os segundos e minutos e os colaca na tela. Chama a função de contagem principal
function couting() {
  typeOfPomo = buffer_seconds;
  interval = setInterval(count, 1000);
}

// Tira 1 segundo do buffer_seconds e depois reimprime os minutos na tela
function count() {

  if (buffer_seconds > 0) {
    if (toCount == true) {
      buffer_seconds--;
      seconds = buffer_seconds % 60;
      minuts = Math.floor(buffer_seconds / 60);
      let time = addZero(minuts, seconds);

      d_seconds.innerHTML = time[0] + " : " + time[1];
      document.title = `${oldtitle}  ${time[0]}  :  ${time[1]}`;
    }
  } else {
    console.log(typeOfPomo);
    if (typeOfPomo == 2) { // Se o usuário concluir o pomodoro de 25 minutos
      savePomo();
      saveDates();
      reloadBufferPomo();  // Atualizando a lista e quantidade de pomos
    }
    d_seconds.innerHTML = "ACABOU";
    document.title = oldtitle + " ACABOU";
    playSound();
    resetPomo();   
  }
}