"use strict";
document.addEventListener('DOMContentLoaded', () => {
    // ==========================
    // Smart Interval Alarm (TypeScript)
    // ==========================
    // DOM Elements (typed)
    const customMessage = document.getElementById('customMessage');
    const totalTimeInput = document.getElementById('totalTime');
    const intervalTimeInput = document.getElementById('intervalTime');
    const countdown = document.getElementById('countdown');
    const statusDisplay = document.getElementById('status');
    const progressBar = document.getElementById('progressBar');
    const beepSound = document.getElementById('beepSound');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resetBtn = document.getElementById('resetBtn');
    // Timer state
    const timer = {
        totalSeconds: 0,
        intervalSeconds: 0,
        elapsedSeconds: 0,
        countdownInterval: undefined,
        isPaused: false,
    };
    // Helper Functions
    const minutesToSeconds = (minutes) => minutes * 60;
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };
    // Speech function
    const speakMessage = (message) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(message);
            speechSynthesis.speak(utterance);
        }
    };
    // Timer Functions
    const startTimer = () => {
        if (!totalTimeInput.value || !intervalTimeInput.value) {
            alert('Please enter total and interval times!');
            return;
        }
        if (!timer.countdownInterval) {
            timer.totalSeconds = minutesToSeconds(Number(totalTimeInput.value));
            timer.intervalSeconds = minutesToSeconds(Number(intervalTimeInput.value));
            timer.elapsedSeconds = 0;
            statusDisplay.textContent = 'Status: Running';
        }
        if (timer.isPaused) {
            statusDisplay.textContent = 'Status: Resumed';
            timer.isPaused = false;
        }
        timer.countdownInterval = window.setInterval(() => {
            if (timer.elapsedSeconds >= timer.totalSeconds) {
                clearInterval(timer.countdownInterval);
                timer.countdownInterval = undefined;
                statusDisplay.textContent = 'Status: Completed';
                countdown.textContent = '⏹️ Done!';
                progressBar.value = 100;
                return;
            }
            timer.elapsedSeconds++;
            countdown.textContent = formatTime(timer.totalSeconds - timer.elapsedSeconds);
            progressBar.value = (timer.elapsedSeconds / timer.totalSeconds) * 100;
            // Beep + speech at each interval
            if (timer.elapsedSeconds % timer.intervalSeconds === 0) {
                const msg = customMessage.value || '⏰ Interval reached!';
                // Play beep
                beepSound.currentTime = 0;
                beepSound.play();
                // Speak message
                speakMessage(msg);
            }
        }, 1000);
    };
    const pauseTimer = () => {
        if (timer.countdownInterval) {
            clearInterval(timer.countdownInterval);
            timer.countdownInterval = undefined;
            timer.isPaused = true;
            statusDisplay.textContent = 'Status: Paused';
        }
    };
    const stopTimer = () => {
        if (timer.countdownInterval) {
            clearInterval(timer.countdownInterval);
            timer.countdownInterval = undefined;
        }
        timer.elapsedSeconds = 0;
        statusDisplay.textContent = 'Status: Stopped';
        countdown.textContent = '';
        progressBar.value = 0;
        timer.isPaused = false;
    };
    const resetTimer = () => {
        stopTimer();
        timer.totalSeconds = 0;
        timer.intervalSeconds = 0;
        timer.elapsedSeconds = 0;
        countdown.textContent = '';
        progressBar.value = 0;
        statusDisplay.textContent = 'Status: Ready';
        customMessage.value = '';
        totalTimeInput.value = '';
        intervalTimeInput.value = '';
    };
    // Event Listeners
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    stopBtn.addEventListener('click', stopTimer);
    resetBtn.addEventListener('click', resetTimer);
});
