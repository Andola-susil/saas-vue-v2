<template>
    <div class="timer">
      <p>Elapsed Time: {{ formattedTime }}</p>
      <button @click="startTimer" :disabled="timerRunning">Start</button>
      <button @click="stopTimer" :disabled="!timerRunning">Stop</button>
      <button @click="resetTimer">Reset</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Timer',
    data() {
      return {
        startTime: 0, // Timestamp when the timer started
        elapsedTime: 0, // Time in milliseconds
        timer: null, // Interval ID
        timerRunning: false // Timer state
      };
    },
    computed: {
      // Formats elapsed time as HH:MM:SS.sss
      formattedTime() {
        const hours = String(Math.floor(this.elapsedTime / 3600000)).padStart(2, '0');
        const minutes = String(Math.floor((this.elapsedTime % 3600000) / 60000)).padStart(2, '0');
        const seconds = String(Math.floor((this.elapsedTime % 60000) / 1000)).padStart(2, '0');
        const milliseconds = String(this.elapsedTime % 1000).padStart(3, '0');
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
      }
    },
    methods: {
      // Starts the timer
      startTimer() {
        if (!this.timerRunning) {
          this.timerRunning = true;
          this.startTime = Date.now() - this.elapsedTime; // Adjust start time to account for paused duration
          this.timer = setInterval(() => {
            this.elapsedTime = Date.now() - this.startTime;
          }, 1);
        }
      },
      // Stops the timer
      stopTimer() {
        if (this.timerRunning) {
          clearInterval(this.timer);
          this.timerRunning = false;
        }
      },
      // Resets the timer
      resetTimer() {
        this.stopTimer();
        this.elapsedTime = 0;
      }
    },
    beforeDestroy() {
      // Ensure timer is stopped when component is destroyed
      this.stopTimer();
    }
  };
  </script>
  
  <style scoped>
  .timer {
    text-align: center;
  }
  
  p {
    font-size: 1.5rem;
  }
  
  button {
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    border: none;
    border-radius: 0.25rem;
    background-color: #007bff;
    color: white;
    transition: background-color 0.3s ease;
  }
  
  button:disabled {
    background-color: #aaa;
  }
  
  button:hover:not(:disabled) {
    background-color: #0056b3;
  }
  </style>
  