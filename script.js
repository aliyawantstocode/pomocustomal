// Full Updated JavaScript Code with Rain and Snow Effects

// Select elements
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const timerDisplay = document.getElementById('timer');
const workTimeInput = document.getElementById('workTime');
const breakTimeInput = document.getElementById('breakTime');
const progressBar = document.getElementById('progress-bar');
const settingsPanel = document.getElementById('settings-panel');
const resizeHandle = document.getElementById('resize-handle');
const openSettingsBtn = document.getElementById('open-settings');
const applyGifBtn = document.getElementById('apply-gif');
const gifUrlInput = document.getElementById('gif-url');
const gifUploadInput = document.getElementById('upload-gif');
const gradientDirection = document.getElementById('gradient-direction');
const gradientStopsContainer = document.getElementById('gradient-stops');
const addGradientStopBtn = document.getElementById('add-gradient-stop');

let timer;
let timeLeft;
let isWorking = true;
let totalTime;
let isDragging = false;
let isResizing = false;
let gradientStops = [];

// Timer functions
function startTimer() {
    clearInterval(timer);
    timeLeft = isWorking ? workTimeInput.value * 60 : breakTimeInput.value * 60;
    totalTime = timeLeft;
    updateDisplay();
    timer = setInterval(() => {
        timeLeft--;
        updateDisplay();
        updateProgressBar();
        if (timeLeft === 0) {
            clearInterval(timer);
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

// Resizable settings panel
resizeHandle.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.body.style.cursor = 'se-resize';
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (isResizing) {
        const newWidth = e.clientX - settingsPanel.offsetLeft;
        const newHeight = e.clientY - settingsPanel.offsetTop;
        if (newWidth > 200) settingsPanel.style.width = `${newWidth}px`;
        if (newHeight > 200) settingsPanel.style.height = `${newHeight}px`;
    }
});

document.addEventListener('mouseup', () => {
    isResizing = false;
    document.body.style.cursor = 'default';
});

// Draggable settings panel
settingsPanel.addEventListener('mousedown', (e) => {
    if (e.target !== resizeHandle) {
        isDragging = true;
        dragOffsetX = e.clientX - settingsPanel.offsetLeft;
        dragOffsetY = e.clientY - settingsPanel.offsetTop;
        document.body.style.cursor = 'move';
    }
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        settingsPanel.style.left = `${e.clientX - dragOffsetX}px`;
        settingsPanel.style.top = `${e.clientY - dragOffsetY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.cursor = 'default';
});

// GIF upload and URL application
applyGifBtn.addEventListener('click', () => {
    const gifUrl = gifUrlInput.value;
    if (gifUrl) {
        document.getElementById('animated-character').querySelector('img').src = gifUrl;
    } else if (gifUploadInput.files.length > 0) {
        const file = gifUploadInput.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('animated-character').querySelector('img').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Gradient customization
addGradientStopBtn.addEventListener('click', () => {
    const stopId = `stop-${gradientStops.length}`;
    gradientStops.push({ id: stopId, color: '#000000', position: 0 });

    const stopElement = document.createElement('div');
    stopElement.className = 'gradient-stop';
    stopElement.id = stopId;
    stopElement.innerHTML = `
        <input type="color" value="#000000" data-id="${stopId}" class="stop-color">
        <input type="number" value="0" min="0" max="100" data-id="${stopId}" class="stop-position">
        <button data-id="${stopId}" class="remove-stop">Remove</button>
    `;
    gradientStopsContainer.appendChild(stopElement);
    attachGradientHandlers();
    updateGradientPreview();
});

function attachGradientHandlers() {
    document.querySelectorAll('.stop-color').forEach(input => {
        input.addEventListener('input', (e) => {
            const stopId = e.target.dataset.id;
            const stop = gradientStops.find(s => s.id === stopId);
            stop.color = e.target.value;
            updateGradientPreview();
        });
    });

    document.querySelectorAll('.stop-position').forEach(input => {
        input.addEventListener('input', (e) => {
            const stopId = e.target.dataset.id;
            const stop = gradientStops.find(s => s.id === stopId);
            stop.position = parseInt(e.target.value);
            updateGradientPreview();
        });
    });

    document.querySelectorAll('.remove-stop').forEach(button => {
        button.addEventListener('click', (e) => {
            const stopId = e.target.dataset.id;
            gradientStops = gradientStops.filter(s => s.id !== stopId);
            document.getElementById(stopId).remove();
            updateGradientPreview();
        });
    });
}

function updateGradientPreview() {
    const gradientValue = gradientStops
        .sort((a, b) => a.position - b.position)
        .map(s => `${s.color} ${s.position}%`)
        .join(', ');

    const direction = gradientDirection.value;
    document.body.style.background = `linear-gradient(${direction}, ${gradientValue})`;
}

// Button event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
openSettingsBtn.addEventListener('click', () => {
    settingsPanel.style.display = settingsPanel.style.display === 'block' ? 'none' : 'block';
});

// Add Snow Effect
function addSnowEffect() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.textContent = '❄';
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
    snowflake.style.fontSize = `${Math.random() * 1.5 + 0.5}rem`;
    document.body.appendChild(snowflake);
    setTimeout(() => snowflake.remove(), 5000);
}
setInterval(addSnowEffect, 300);

// Add Rain Effect
function addRainEffect() {
    const raindrop = document.createElement('div');
    raindrop.className = 'raindrop';
    raindrop.style.left = `${Math.random() * 100}vw`;
    raindrop.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
    document.body.appendChild(raindrop);
    setTimeout(() => raindrop.remove(), 2000);
}
setInterval(addRainEffect, 100);
