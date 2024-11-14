// Select elements
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const timerDisplay = document.getElementById('timer');
const fontSelect = document.getElementById('font-select');
const fontColor = document.getElementById('font-color');
const backgroundType = document.getElementById('background-type');
const solidColorPicker = document.getElementById('solid-color-picker');
const applyBackground = document.getElementById('apply-background');
const gifUrlInput = document.getElementById('gif-url');
const uploadGif = document.getElementById('upload-gif');

// Timer functionality
let timerInterval;
let timeLeft = 25 * 60;

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 25 * 60;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Apply font and color changes
fontSelect.addEventListener('change', () => {
    document.body.style.fontFamily = fontSelect.value;
});

fontColor.addEventListener('input', () => {
    document.body.style.color = fontColor.value;
});

// Background customization
applyBackground.addEventListener('click', () => {
    if (backgroundType.value === 'solid') {
        document.body.style.background = solidColorPicker.value;
    } else if (backgroundType.value === 'gif') {
        const gifUrl = gifUrlInput.value || URL.createObjectURL(uploadGif.files[0]);
        document.body.style.background = `url(${gifUrl}) no-repeat center center / cover`;
    }
});

// Button event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
