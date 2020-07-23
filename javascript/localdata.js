const navlist = document.querySelector("#navbar");

// Data e horário
const list = document.createElement("ul");
const listTitle = document.createElement("h2");

// Pega as datas do localStorage
var dates = JSON.parse(localStorage.getItem("dates")) || [];

// Quantidade de loadAmoutPomos
var pomos = JSON.parse(localStorage.getItem("amoutOfPomos")) || [];


// Função que salva dados no local Storage;

function saveToStorage(key, data){
    localStorage.setItem(key, JSON.stringify(data));
}

// Função que salva a data atual no localStorage
function saveDates() {
    const data = new Date();
    const dateNow = data.toLocaleDateString() + " - " + data.toLocaleTimeString();
    dates.push(dateNow);
    saveToStorage("dates", dates);
}

// mostra a data e o horário de cada pomodoro concluído

function loadDates(){
    list.innerHTML = "";

    // Percorendo o array + cronologia das datas 
    for(let i = 0; i < dates.length; i++){
        let li = document.createElement("li");
        let content = document.createTextNode(`${i+1}° ${dates[i]}`);

        li.appendChild(content);
        list.appendChild(li);
    }

    navlist.appendChild(list);

}

// Função que salve +1 pomodoro no localStorage (Contabilizar os pomodoros concluídos)
function savePomo(){
    pomos.push(1);
    saveToStorage("amoutOfPomos", pomos);
    return true;
}


// mostra a quantidade de pomos concluídos
function loadAmoutPomos(){
    const amountPomos = document.createElement("h1");
    amountPomos.innerHTML = `Quantidade de pomodoros concluídos: ${pomos.length}`
    navlist.appendChild(amountPomos);
}


// Reseta as informações do navbar
function reloadBufferPomo(){
    navlist.innerHTML = "";
    listTitle.innerHTML = "Datas e horários";
    list.appendChild(listTitle);
    loadAmoutPomos();
    loadDates();
}





