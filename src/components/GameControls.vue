<script setup>
import { ref } from 'vue'
import { useGameStore } from '../stores/game';
const store = useGameStore();
const gamePaused = ref(false);
const togglePause = () => {
  if (store.isRacing) {
    store.pauseRace();
    gamePaused.value = true;
  } else {
    store.resumeRace();
    gamePaused.value = false;
  }
};
</script>

<template>
  <div class="game-controls">
    <button 
      @click="store.generateHorses()" 
      :disabled="store.isRacing || gamePaused"
      data-test="generate-horses"
      class="generate-btn"
    >
      Generate Horses
    </button>
    <button 
      @click="store.generateRaceSchedule()" 
      :disabled="!store.horses.length || store.isRacing || gamePaused"
      data-test="generate-schedule"
      class="schedule-btn"
    >
      Generate Schedule
    </button>
    <button 
      @click="store.startRace()" 
      :disabled="!store.raceSchedule.length || store.isRacing || store.isGameComplete || gamePaused"
      data-test="start-race"
      class="start-btn"
    >
      Start Race
    </button>
    <button 
      @click="togglePause" 
      :disabled="!store.raceSchedule.length || store.isGameComplete || store.startTime === null"
      class="pause-btn"
    >
      {{ store.isRacing ? "Pause Race" : "Continue Race" }}
    </button>
    <button 
      @click="store.resetGame()"
      :disabled="store.isRacing"
      class="reset-btn"
    >
      Reset Game
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/variables.scss' as *;

.game-controls {
  @include card;
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  
  button {
    @include button;
    flex: 1;
    min-width: 150px;
    
    &.generate-btn {
      background-color: #6C63FF;
      color: white;
      
      &:hover:not(:disabled) {
        background-color: #B3ADF7;
      }
    }
    
    &.schedule-btn {
      background-color: #FFA500;
      color: white;
      
      &:hover:not(:disabled) {
        background-color: #FFD699;
      }
    }
    
    &.start-btn {
      background-color: #28A745;
      color: white;
      
      &:hover:not(:disabled) {
        background-color: #B3DFC0;
      }
    }
    
    &.pause-btn {
      background-color: #FFC107;
      color: white;
      
      &:hover:not(:disabled) {
        background-color: #FFE5A3;
      }
    }
    &.reset-btn {
      background-color: #DC3545;
      color: white;
      
      &:hover:not(:disabled) {
        background-color: #F5B1B6;
      }
    }
  }
}
</style>