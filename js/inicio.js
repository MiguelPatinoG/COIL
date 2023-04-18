const modalBtn = document.querySelector('#modalBtn');
const miModal = new bootstrap.Modal(document.querySelector('#exampleModal'));

const btnCreditos = document.querySelector('#btnCreditos');
const modalCreditos = new bootstrap.Modal(document.querySelector('#modalCreditos'));

modalBtn.addEventListener('click', () => {
  miModal.show();
});

btnCreditos.addEventListener('click', () => {
  modalCreditos.show();
});

document.querySelector('#btn-selec').addEventListener('click', () => {
    miModal.hide();
    location.href = "Juego.html";
});

const options = document.querySelectorAll('.option');
let selectedOption;

options.forEach(option => {
  option.addEventListener('click', function() {
    options.forEach(option => option.classList.remove('selected'));
    this.classList.add('selected');
    
    localStorage.setItem("selectedOption",this.alt);
  });
});