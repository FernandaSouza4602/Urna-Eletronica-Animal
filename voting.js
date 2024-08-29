document.addEventListener('keydown', function(event) {
    const digit1 = document.getElementById('digit1');
    const digit2 = document.getElementById('digit2');
    const candidateImage = document.getElementById('candidateImage');
    const candidateName = document.getElementById('candidateName');
    const key = event.key;

    // Identify if the user typed a number
    if (key >= '0' && key <= '9') {
        numberInput.play();

        if (digit1.textContent === '') {
            digit1.textContent = key;
        } else if (digit2.textContent === '') {
            digit2.textContent = key;

            const candidateNumber = digit1.textContent + digit2.textContent;
            const candidate = candidates[candidateNumber];

            // Check if the number belongs to a candidate
            if (candidate) {
                candidateImage.src = candidate.image;
                candidateImage.style.display = 'block';
                candidateName.textContent = candidate.name;
                candidateName.style.display = 'block';
            } else {
                candidateImage.style.display = 'none';
                candidateName.style.display = 'none';
            }
        }
    }
       
    // Allow user to delete a number
    else if (key === 'Backspace') {
        if (digit2.textContent !== ''){
            digit2.textContent = '';
        } else if (digit1.textContent !== '') {
            digit1.textContent = '';
        }

        candidateImage.style.display = 'none';
        candidateName.style.display = 'none';
    }

    else if (key === 'Enter' && digit1.textContent !== '' && digit2.textContent !== '') {
        const candidateNumber = digit1.textContent + digit2.textContent;
        if (candidates[candidateNumber]) {

            // Get the current vote count from localStorage
            let votes = JSON.parse(localStorage.getItem('votes')) || {};

            // Increment the vote count for the selected candidate
            votes[candidateNumber] = (votes[candidateNumber] || 0) + 1;

            // Save the updated votes back to localStorage
            localStorage.setItem('votes', JSON.stringify(votes));

            // Redirects the user to the end page
            window.location.href = 'end.html';
        }
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

let slashPressed = false;
let backspacePressedPressed = false;

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