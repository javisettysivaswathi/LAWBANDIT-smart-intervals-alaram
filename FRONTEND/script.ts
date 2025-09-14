document.addEventListener('DOMContentLoaded', () => {
    // ==========================
    // Smart Interval Alarm (TypeScript)
    // ==========================
  
    // DOM Elements (typed)
    const customMessage = document.getElementById('customMessage') as HTMLInputElement;
    const totalTimeInput = document.getElementById('totalTime') as HTMLInputElement;
    const intervalTimeInput = document.getElementById('intervalTime') as HTMLInputElement;
    const countdown = document.getElementById('countdown') as HTMLParagraphElement;
    const statusDisplay = document.getElementById('status') as HTMLHeadingElement;
    const progressBar = document.getElementById('progressBar') as HTMLProgressElement;
    const beepSound = document.getElementById('beepSound') as HTMLAudioElement;
  
    const startBtn = document.getElementById('startBtn') as HTMLButtonElement;
    const pauseBtn = document.getElementById('pauseBtn') as HTMLButtonElement;
    const stopBtn = document.getElementById('stopBtn') as HTMLButtonElement;
    const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;
  
    // Timer State Interface
    interface TimerState {
      totalSeconds: number;
      intervalSeconds: number;
      elapsedSeconds: number;
      countdownInterval?: number;
      isPaused: boolean;
    }
  
    // Timer state
    const timer: TimerState = {
      totalSeconds: 0,
      intervalSeconds: 0,
      elapsedSeconds: 0,
      countdownInterval: undefined,
      isPaused: false,
    };
  
    // Helper Functions
    const minutesToSeconds = (minutes: number): number => minutes * 60;
  
    const formatTime = (seconds: number): string => {
      const m = Math.floor(seconds / 60).toString().padStart(2, '0');
      const s = (seconds % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
    };
  
    // Speech function
    const speakMessage = (message: string): void => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(message);
        speechSynthesis.speak(utterance);
      }
    };
  
    // Timer Functions
    const startTimer = (): void => {
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
  
    const pauseTimer = (): void => {
      if (timer.countdownInterval) {
        clearInterval(timer.countdownInterval);
        timer.countdownInterval = undefined;
        timer.isPaused = true;
        statusDisplay.textContent = 'Status: Paused';
      }
    };
  
    const stopTimer = (): void => {
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
  
    const resetTimer = (): void => {
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
  