// City Lights Loading Screen Script

const tips = [
    "Welcome to City Lights RP!",
    "Your story. Your city. Your life.",
    "Dream big in City Lights",
    "Create your legend here",
    "Every night brings new opportunities",
    "City Lights - Where dreams come alive",
    "Make your mark on the city",
    "Live the dream in City Lights",
    "Respect the grind, enjoy the climb",
    "City Lights: A world of possibilities",
    "Your adventure starts now",
    "Keep it real, keep it lit",
    "Building something special here",
    "City Lights - Feel the energy",
    "Success is earned, not given"
];

let currentProgress = 0;
let musicEnabled = true;
const audio = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const progressFill = document.getElementById('progressFill');
const loadingText = document.getElementById('loadingText');
const loadingTip = document.getElementById('loadingTip');
const playerCountEl = document.getElementById('playerCount');
const pingEl = document.getElementById('ping');

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    startLoading();
    setupMusicControls();
    updateServerInfo();
    
    // Auto-play music with fade in
    setTimeout(() => {
        if (musicEnabled) {
            audio.volume = 0;
            audio.play().catch(err => console.log('Audio autoplay prevented:', err));
            fadeInMusic();
        }
    }, 1000);
});

function startLoading() {
    currentProgress = 0;
    const interval = setInterval(() => {
        currentProgress += Math.random() * 30;
        
        if (currentProgress > 90) {
            currentProgress = 90;
        }
        
        updateProgress(currentProgress);
        
        if (currentProgress >= 90) {
            clearInterval(interval);
        }
    }, 800);
    
    // Rotate tips
    setInterval(changeTip, 4000);
    changeTip();
}

function updateProgress(value) {
    progressFill.style.width = value + '%';
    const messages = [
        'Connecting to City Lights...',
        'Loading server data...',
        'Initializing resources...',
        'Syncing with database...',
        'Preparing your experience...'
    ];
    const messageIndex = Math.floor(value / 20);
    loadingText.textContent = messages[Math.min(messageIndex, messages.length - 1)];
}

function changeTip() {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    loadingTip.textContent = randomTip;
}

function setupMusicControls() {
    musicBtn.addEventListener('click', toggleMusic);
    
    // Listen for game events
    window.addEventListener('message', (event) => {
        const data = event.data;
        
        if (data.action === 'updateProgress') {
            currentProgress = Math.max(currentProgress, data.progress);
            updateProgress(currentProgress);
        }
        
        if (data.action === 'setLoadingText') {
            loadingText.textContent = data.text;
        }
    });
}

function toggleMusic() {
    musicEnabled = !musicEnabled;
    
    if (musicEnabled) {
        fadeInMusic();
        musicBtn.classList.remove('muted');
        musicIcon.textContent = '🔊';
    } else {
        fadeOutMusic();
        musicBtn.classList.add('muted');
        musicIcon.textContent = '🔇';
    }
}

function fadeInMusic(duration = 2000) {
    const steps = 50;
    const stepDuration = duration / steps;
    let step = 0;
    
    audio.play().catch(err => console.log('Audio play error:', err));
    
    const fadeInterval = setInterval(() => {
        step++;
        audio.volume = (step / steps) * 0.7; // Max volume 0.7
        
        if (step >= steps) {
            clearInterval(fadeInterval);
            audio.volume = 0.7;
        }
    }, stepDuration);
}

function fadeOutMusic(duration = 1000) {
    const steps = 50;
    const stepDuration = duration / steps;
    let step = 0;
    const startVolume = audio.volume;
    
    const fadeInterval = setInterval(() => {
        step++;
        audio.volume = startVolume * (1 - step / steps);
        
        if (step >= steps) {
            clearInterval(fadeInterval);
            audio.pause();
            audio.volume = 0.7;
        }
    }, stepDuration);
}

function updateServerInfo() {
    // Listen for server data from game
    window.addEventListener('message', (event) => {
        const data = event.data;
        
        if (data.action === 'updatePlayerCount') {
            playerCountEl.textContent = data.players + '/' + data.maxPlayers;
        }
        
        if (data.action === 'updatePing') {
            pingEl.textContent = data.ping + 'ms';
        }
    });
    
    // For testing/local display
    // You can remove this section when integrated with your server
    updateLocalStats();
}

function updateLocalStats() {
    // Simulate player count and ping updates
    setInterval(() => {
        const fakePlayerCount = Math.floor(Math.random() * 100) + 1;
        const fakePing = Math.floor(Math.random() * 100) + 30;
        playerCountEl.textContent = fakePlayerCount + '/128';
        pingEl.textContent = fakePing + 'ms';
    }, 3000);
}

// Optional: Complete loading when game sends ready signal
window.addEventListener('message', (event) => {
    if (event.data.action === 'completeLoading') {
        currentProgress = 100;
        updateProgress(100);
        loadingText.textContent = 'Welcome to City Lights RP!';
        fadeOutMusic(2000);
    }
});
