document.addEventListener('DOMContentLoaded', function () {
    // ==========================
    // Smart Interval Alarm (TypeScript)
    // ==========================
    // DOM Elements (typed)
    var customMessage = document.getElementById('customMessage');
    var totalTimeInput = document.getElementById('totalTime');
    var intervalTimeInput = document.getElementById('intervalTime');
    var countdown = document.getElementById('countdown');
    var statusDisplay = document.getElementById('status');
    var progressBar = document.getElementById('progressBar');
    var beepSound = document.getElementById('beepSound');
    var startBtn = document.getElementById('startBtn');
    var pauseBtn = document.getElementById('pauseBtn');
    var stopBtn = document.getElementById('stopBtn');
    var resetBtn = document.getElementById('resetBtn');
    // Timer state
    var timer = {
        totalSeconds: 0,
        intervalSeconds: 0,
        elapsedSeconds: 0,
        countdownInterval: undefined,
        isPaused: false,
    };
    // Helper Functions
    var minutesToSeconds = function (minutes) { return minutes * 60; };
    var formatTime = function (seconds) {
        var m = Math.floor(seconds / 60).toString().padStart(2, '0');
        var s = (seconds % 60).toString().padStart(2, '0');
        return "".concat(m, ":").concat(s);
    };
    // Speech function
    var speakMessage = function (message) {
        if ('speechSynthesis' in window) {
            var utterance = new SpeechSynthesisUtterance(message);
            speechSynthesis.speak(utterance);
        }
    };
    // Timer Functions
    var startTimer = function () {
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
        timer.countdownInterval = window.setInterval(function () {
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
                var msg = customMessage.value || '⏰ Interval reached!';
                // Play beep
                beepSound.currentTime = 0;
                beepSound.play();
                // Speak message
                speakMessage(msg);
            }
        }, 1000);
    };
    var pauseTimer = function () {
        if (timer.countdownInterval) {
            clearInterval(timer.countdownInterval);
            timer.countdownInterval = undefined;
            timer.isPaused = true;
            statusDisplay.textContent = 'Status: Paused';
        }
    };
    var stopTimer = function () {
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
    var resetTimer = function () {
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
