window.onload = cargarFunciones;

function cargarFunciones() {
  randomizeTablero()
  init()
}
function init() {
  tempo = 0
  h = 0;
  m = 0;
  s = 0;
  document.getElementById("hms").innerHTML = "00:00:00";
  escribir();
  id = setInterval(escribir, 1000);
}
function randomizeTablero() {
  let fila;
  i = 1;
  do {
    let cardIndex = Math.floor(Math.random() * cards.length);
    if (!selectedCards.includes(cardIndex)) {
      selectedCards.push(cardIndex);
      let card = cards[cardIndex];
      let celda = document.createElement('div');
      celda.classList.add('celda');
      celda.innerHTML = `<img src="${card.img}" alt="${card.name}" class="image imageTabla" id="${card.id}" onclick="validarCarta('${card.id}')" check=0 >`;

      fila = document.getElementById(`fila${Math.ceil(i / 3)}`);
      fila.appendChild(celda);

      const posicion = (i - 1) % 3;
      const filaIndex = Math.floor((i - 1) / 3);
      if (!ordenTablero[filaIndex]) {
        ordenTablero[filaIndex] = [];
      }
      ordenTablero[filaIndex][posicion] = cardIndex;

      i++;
    }
  } while (i <= 9);
}
function randomizeMazo() {
  let cardIndex = Math.floor(Math.random() * cards.length);
  let card = cards[cardIndex];
  cardsValidations.push(card);
  let cell = document.createElement('div');
  cell.classList.add('cell');
  cell.innerHTML = `<img src="${card.img}" alt="${card.name}" class="image">`;

  let oldCelda = document.querySelector('#mazo .cell');
  let padre = document.querySelector('#mazo');
  padre.replaceChild(cell, oldCelda);
}
function progressBar() {
  let barra = document.getElementById("barraProgreso")
  let recipiente = document.getElementById("barra")
  if (barra.clientWidth >= recipiente.clientWidth) {
    barra.style.width = 0 + "px"
  } else {
    barra.style.width = barra.clientWidth + 25 + "px";
  }
}
function validarCarta(id) {
  acierto = new Audio("sounds/Acierto.mp3")
  error = new Audio("sounds/Error.mp3")
  const card = cardsValidations.find(card => card.id === id);
  if (card) {
    acierto.play()
    const image = document.querySelector(`img[id="${id}"]`);
    image.style = 'animation: rotar 1s'
    image.src = card.frase;
    card.check = 1;
  } else {
    error.play();
  }
}
function escribir() {
  var hAux, mAux, sAux;
  tempo++
  s++;
  if (s > 59) { m++; s = 0; }
  if (m > 59) { h++; m = 0; }
  if (h > 24) { h = 0; }

  if (s < 10) { sAux = "0" + s; } else { sAux = s; }
  if (m < 10) { mAux = "0" + m; } else { mAux = m; }
  if (h < 10) { hAux = "0" + h; } else { hAux = h; }

  document.getElementById("hms").innerHTML = hAux + ":" + mAux + ":" + sAux;
}
function parar() {
  clearInterval(id);
}
function tomarTiempoFinal() {
  let tiempo = document.getElementById("hms");
  totaltiempo = tiempo.textContent;
  return totaltiempo
}
function sistemaRecompensa() {
  let tiempoaca = document.createElement('div');
  tiempoaca.classList.add('tiempo');
  tiempoaca.innerHTML = `<h3 id="tituloModal">Your time was: ${totaltiempo}</h3> <button id="reload" class="botonModal">Play again</button>`
  let padre1 = document.querySelector('.modal-body')
  padre1.appendChild(tiempoaca);
  document.querySelector('#reload').addEventListener('click', () => {
    location.href = "index.html";
  });

  //5 estrellas solo colocar segundos en tempo ej= 1 minuto solo 60 o 1 minuto y medio 90
  if (tempo < 21) {
  }
  //4 estrellas
  if (tempo >= 20 && tempo < 46) {
    const estrella = document.querySelector(`img[id="estrella1"]`);
    estrella.src = "img/estrellaPerder.png"
  }
  //3 estrellas
  if (tempo >= 45 && tempo < 66) {
    for (i = 1; i <= 2; i++) {
      const estrella = document.querySelector(`img[id="estrella${i}"]`);
      estrella.src = "img/estrellaPerder.png"
    }
  }
  //2 estrellas
  if (tempo >= 66 && tempo < 81) {
    for (i = 1; i <= 3; i++) {
      const estrella = document.querySelector(`img[id="estrella${i}"]`);
      estrella.src = "img/estrellaPerder.png"
    }
  }
  //1 estrellas
  if (tempo >= 81) {
    for (i = 1; i <= 4; i++) {
      const estrella = document.querySelector(`img[id="estrella${i}"]`);
      estrella.src = "img/estrellaPerder.png"
    }
  }

}
function verificarPatron(nro) {
  let winner = false;
  let suma = 0;
  switch (nro) {
    case 1: //Tabla Completa
      for (let i = 0; i < ordenTablero.length; i++) {
        for (let j = 0; j < ordenTablero[i].length; j++) {
          if (cards[ordenTablero[i][j]].check == 1) {
            suma++;
          }
        }
      }
      if (suma == 9) {
        winner = true;
      }
      break;
    case 2: //Diagonal
      for (let i = 0; i < ordenTablero.length; i++) {
        for (let j = 0; j < ordenTablero[i].length; j++) {
          // Verificar si la posición actual coincide con [0][0], [1][1], [2][2]
          if (i === j) {
            if (cards[ordenTablero[i][j]].check == 1) {
              suma++;
            }
          }
        }
      }
      if (suma == 3) {
        winner = true;
      }
      break;
    case 3: //Cuadrado
      for (let i = 0; i < ordenTablero.length; i++) {
        for (let j = 0; j < ordenTablero[i].length; j++) {
          // Verificar si la posición actual no es [1][1]
          if (i != 1 || j != 1) {
            if (cards[ordenTablero[i][j]].check == 1) {
              suma++;
            }
          }
        }
      }
      if (suma == 8) {
        winner = true;
      }
      break;
    case 4: //X
      for (let i = 0; i < ordenTablero.length; i++) {
        for (let j = 0; j < ordenTablero[i].length; j++) {
          if (i === j || (i===0&&j===2) || (i===2&&j===0)) {
            if (cards[ordenTablero[i][j]].check == 1) {
              suma++;
            }
          }
        }
      }
      if (suma == 5) {
        winner = true;
      }
      break;
    case 5: //L
      for (let i = 0; i < ordenTablero.length; i++) {
        for (let j = 0; j < ordenTablero[i].length; j++) {
          if (j===0 || i===2) {
            if (cards[ordenTablero[i][j]].check == 1) {
              suma++;
            }
          }
        }
      }
      if (suma == 5) {
        winner = true;
      }
      break;
    case 6: //+
      for (let i = 0; i < ordenTablero.length; i++) {
        for (let j = 0; j < ordenTablero[i].length; j++) {
          if (i===1 || j===1) {
            if (cards[ordenTablero[i][j]].check == 1) {
              suma++;
            }
          }
        }
      }
      if (suma == 5) {
        winner = true;
      }
      break;
  }
  if (winner == true) {
    ganar.play()
    parar()
    tomarTiempoFinal()
    sistemaRecompensa()
    $("#modalFinal").show();
  }
}

const cards = [
  { name: 'Flowers', img: 'img/Carta001.png', frase: 'img/Atras/Atras001.png', id: 'carta01' },
  { name: 'Basquet', img: 'img/Carta002.png', frase: 'img/Atras/Atras002.png', id: 'carta02' },
  { name: 'Soccer', img: 'img/Carta003.png', frase: 'img/Atras/Atras003.png', id: 'carta03' },
  { name: 'Camera', img: 'img/Carta004.png', frase: 'img/Atras/Atras004.png', id: 'carta04' },
  { name: 'Music', img: 'img/Carta005.png', frase: 'img/Atras/Atras005.png', id: 'carta05' },
  { name: 'Fish', img: 'img/Carta006.png', frase: 'img/Atras/Atras006.png', id: 'carta06' },
  { name: 'Kite', img: 'img/Carta007.png', frase: 'img/Atras/Atras007.png', id: 'carta07' },
  { name: 'Guitar', img: 'img/Carta008.png', frase: 'img/Atras/Atras008.png', id: 'carta08' },
  { name: 'Videogames', img: 'img/Carta009.png', frase: 'img/Atras/Atras009.png', id: 'carta09' },
  { name: 'Golf', img: 'img/Carta010.png', frase: 'img/Atras/Atras010.png', id: 'carta10' },
  { name: 'Microphone', img: 'img/Carta011.png', frase: 'img/Atras/Atras011.png', id: 'carta11' },
  { name: 'Baseball', img: 'img/Carta012.png', frase: 'img/Atras/Atras012.png', id: 'carta12' },
  { name: 'TableTenis', img: 'img/Carta013.png', frase: 'img/Atras/Atras013.png', id: 'carta13' },
  { name: 'Knit', img: 'img/Carta014.png', frase: 'img/Atras/Atras014.png', id: 'carta14' },
  { name: 'Football', img: 'img/Carta015.png', frase: 'img/Atras/Atras015.png', id: 'carta15' },
  { name: 'Paint', img: 'img/Carta016.png', frase: 'img/Atras/Atras016.png', id: 'carta16' },
  { name: 'Book', img: 'img/Carta017.png', frase: 'img/Atras/Atras017.png', id: 'carta17' },
  { name: 'Cook', img: 'img/Carta018.png', frase: 'img/Atras/Atras018.png', id: 'carta18' },
];
const ordenTablero = [];
let selectedCards = [];
let cardsValidations = [];
let ganar = new Audio("sounds/Ganar.mp3")
setInterval(progressBar, 250);
let nroPatron = parseInt(localStorage.getItem("selectedOption"));
document.querySelector('.boton-loteria').addEventListener('click', () => {
  verificarPatron(nroPatron);
});
setInterval(randomizeMazo, 2000);