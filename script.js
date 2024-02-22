const screens = document.querySelectorAll('.screen');
const chooseInsectBtns = document.querySelectorAll('.choose-insect-btn');
const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');
const gameNode = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');

let seconds = 0;
let score = 0;
let selectedInsect = {};
const usedAngles = new Set(); 

startButton.addEventListener('click', () => {
    screens[0].classList.remove('visible');
    screens[1].classList.add('visible');
});

chooseInsectBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');

        selectedInsect = { src };

        screens[1].classList.remove('visible');
        screens[2].classList.add('visible');

        startGame();
    })
})

restartButton.addEventListener('click', () => { 
    screens[2].classList.remove('visible'); 
    screens[1].classList.add('visible'); 

    seconds = 0; 
    score = 0;
    timeEl.innerHTML = `Time: ${seconds}`; 
    scoreEl.innerHTML = `Score: ${score}`; 

    const insects = document.querySelectorAll('.insect');
    insects.forEach(insect => insect.remove()); 
});

function startGame() {
    setInterval(increaseTime, 1000);
    createInsect();
}

function increaseTime() {
    timeEl.innerHTML = `Time: ${seconds}`;
    seconds++;
}

function createInsect() {
    const { x, y } = getRandomLocation();
    let angle = getRandomAngle();

    while (usedAngles.has(angle)) {
        angle = getRandomAngle();
    }

    usedAngles.add(angle);

    const insect = document.createElement('img');
    insect.src = selectedInsect.src;

    insect.classList.add('insect');
    insect.style.display = 'block';
    insect.style.top = `${y}px`;
    insect.style.left = `${x}px`;
    insect.style.transform = `rotate(${angle}deg)`;

    insect.addEventListener('click', catchInsect)

    gameNode.appendChild(insect);
}

function getRandomLocation() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const x = (Math.random() * width) - 50;
    const y = (Math.random() * height) - 50;

    return { x, y };
}

function getRandomAngle() {
    return Math.floor(Math.random() * 360);
}

function playAudioSound() {
    const audio = document.getElementById('audio');

    audio.play();
}

function catchInsect() {
    playAudioSound();
    increaseScore();

    this.remove();

    addInsect();
}

function addInsect() {
    setTimeout(createInsect, 1000);
}

function increaseScore() {
    score++;

    scoreEl.innerHTML = `Score: ${score}`;
}
