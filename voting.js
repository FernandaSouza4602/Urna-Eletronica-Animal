document.addEventListener('keydown', function(event) {
    const digit1 = document.getElementById('digit1');
    const digit2 = document.getElementById('digit2');
    const candidateImage = document.getElementById('candidateImage');
    const candidateName = document.getElementById('candidateName');
    const fimScreen = document.getElementById('fimScreen');
    const votingConfirmation = document.getElementById('votingConfirmation');
    const numberInput = document.getElementById('numberInput');
    const key = event.key;

    // Identify if the user typed a number
    digit1.addEventListener('input', handleInput);
    digit2.addEventListener('input', handleInput);

    function handleInput() {
        numberInput.play();

        if(digit1.value !== '' && digit2.value !== '') {
            const candidateNumber = digit1.value + digit2.value;
            const candidate = candidates[candidateNumber];

            if (candidate) {
                candidateImage.src = candidate.image;
                candidateImage.style.display = 'block';
                candidateName.textContent= candidate.name;
                candidateName.style.display = 'block';
            } else {
                candidateImage.style.display = 'none';
                candidateName.style.display = 'none';
            }
        }
    }
       
    // Allow user to delete a number
    digit1.addEventListener('keydown', handleBackspace);
    digit2.addEventListener('keydown', handleBackspace);

    function handleBackspace(event){
        if (event.key === 'Backspace') {
            if (digit2.value !== ''){
             digit2.value = '';
            } else if (digit1.value !== '') {
                digit1.value = '';
            }

            candidateImage.style.display = 'none';
            candidateName.style.display = 'none';
        }
    }   
});

function handleConfirm() {
    if (digit1.value !== '' && digit2.value !== '') {
        const candidateNumber = digit1.value + digit2.value;
        if (candidates[candidateNumber]) {

            let votes = JSON.parse(localStorage.getItem('votes')) || {};

            votes[candidateNumber] = (votes[candidateNumber] || 0) + 1;

            localStorage.setItem('votes', JSON.stringify(votes));
            document.querySelector('.container').style.display = 'none';
            document.querySelector('.candidate-image-container').style.display = 'none';
            document.querySelector('.candidate-name-container').style.display = 'none';

            fimScreen.style.display = 'flex';
            votingConfirmation.play();

            setTimeout(function() {
                window.location.href = 'index.html';
            }, 2000);
        }
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        handleConfirm();
    }
});

const candidates = {
    "34": {name: "Macaquias Macaco", image: "./images/Macaquias Macaco.jpg"},
    "71": {name: "Genésio Lobo-Guará", image: "./images/Genésio Lobo-Guará.jpg"},
    "99": {name: "Tamandaré Tamanduá", image: "./images/Tamandaré Tamanduá.jpg"},
    "22": {name: "Vaca Vivoca", image: "./images/Vaca Vivoca.jpg"},
    "11": {name: "Pedro Preguiça", image: "./images/Pedro Preguiça.jpg"},
    "12": {name: "Iracema Siriema", image: "./images/Iracema Siriema.jpg"},
    "01": {name: "Tião Leão", image: "./images/Tião Leão.jpg"}
};

const voltarButton = document.getElementById('voltarButton');
const confirmarButton = document.getElementById('confirmarButton');

let slashPressed = false;
let backspacePressed = false;

document.addEventListener('keydown', function(event) {
    if (event.key === '/') {
        slashPressed = true;
    }
    if (event.key === 'Backspace') {
        backspacePressed = true;
    }

    if (slashPressed && backspacePressed) {
        window.location.href = 'index.html';
    }
});

voltarButton.addEventListener('click', function() {
    slashPressed = true;
    backspacePressed = true;
    window.location.href = 'index.html';
});

confirmarButton.addEventListener('click', function() {
    handleConfirm();
});