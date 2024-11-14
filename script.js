let timer;
let timeLeft;
let isWorking = true;
let totalTime;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const workTimeInput = document.getElementById('workTime');
const breakTimeInput = document.getElementById('breakTime');
const progressBar = document.getElementById('progress-bar');
const animatedCharacter = document.getElementById('animated-character');
const openSettingsBtn = document.getElementById('open-settings');
const settingsPanel = document.getElementById('settings-panel');
const applyCustomizationsBtn = document.getElementById('apply-customizations');

const alarm = new Audio('alarm.mp3');

function playAlarm() {
    alarm.play();
}

function startTimer() {
    clearInterval(timer);
    timeLeft = isWorking ? workTimeInput.value * 60 : breakTimeInput.value * 60;
    totalTime = timeLeft;
    updateCharacter();
    updateDisplay();
    timer = setInterval(() => {
        timeLeft--;
        updateDisplay();
        updateProgressBar();
        if (timeLeft === 0) {
            clearInterval(timer);
            playAlarm();
            isWorking = !isWorking;
            startTimer();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
}

function resetTimer() {
    clearInterval(timer);
    isWorking = true;
    timeLeft = workTimeInput.value * 60;
    totalTime = timeLeft;
    updateCharacter();
    updateDisplay();
    updateProgressBar();
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateProgressBar() {
    const progress = ((totalTime - timeLeft) / totalTime) * 100;
    progressBar.style.width = `${progress}%`;
}

function updateCharacter() {
    if (isWorking) {
        animatedCharacter.querySelector('img').src = 'working.gif';
    } else {
        animatedCharacter.querySelector('img').src = 'break.gif';
    }
}

// Apply customizations
applyCustomizationsBtn.addEventListener('click', () => {
    const selectedBackground = backgroundType.value;
    if (selectedBackground === 'solid') {
        document.body.style.background = solidColorInput.value;
    } else if (selectedBackground === 'gradient') {
        document.body.style.background = `linear-gradient(${gradientValueInput.value})`;
    } else if (selectedBackground === 'image' || selectedBackground === 'gif') {
        document.body.style.background = `url(${backgroundUrlInput.value}) no-repeat center center/cover`;
    }
    document.body.style.fontFamily = fontType.value;
    timerDisplay.style.fontSize = `${fontSizeInput.value}px`;
    timerDisplay.style.color = fontColorInput.value;
    settingsPanel.style.display = 'none';
});

// Open and close settings
openSettingsBtn.addEventListener('click', () => {
    settingsPanel.style.display = settingsPanel.style.display === 'block' ? 'none' : 'block';
});

// Initialize
resetTimer();
