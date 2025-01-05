<script setup>
import { useGameStore } from '../stores/game';
const store = useGameStore();
</script>

<template>
  <div class="race-track">
    <div class="track-info">
      <h2 v-if="!store.isGameComplete">Race Track - Round {{ store.currentRound + 1 }}</h2>
      <h2 v-else>Race Completed</h2>
      <span v-if="!store.isGameComplete">Distance: {{ store.currentRoundDistance }}m</span>
    </div>
    
    <div class="track" data-test="track">
      <div v-if="!store.isGameComplete" class="lanes">
        <div v-for="index in store.currentRoundHorses.length" :key="index" class="lane">
          <div class="lane-number">{{ index }}</div>
        </div>
      </div>

      <div 
        v-for="(horse, index) in store.currentRoundHorses" 
        :key="horse.id"
        class="horse"
        v-if="!store.isGameComplete"
        :style="{
          left: `${(horse.position / store.currentRoundDistance) * 100}%`,
          top: `${index * 63 + 10}px`,
          color: horse.color
        }"
      >
        <img src="@/assets/horse.svg" width="30" height="30" />
        <span class="horse-name">{{ horse.name }}</span>
      </div>
      
      <div class="finish-line"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/variables.scss' as *;

.race-track {
  width: 100%;
  height: 100%;
  min-width: 300px;
  .track-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    
    h2 {
      color: #333;
      margin: 0;
    }
  }
  
  .track {
    position: relative;
    height: 630px;
    background-color: #e8e8e8;
    border-radius: 8px;
    overflow: hidden;

    .lanes {
      position: absolute;
      width: 100%;
      height: 100%;
      
      .lane {
        height: 63px;
        border-bottom: 1px dashed #2f2f2f;
        position: relative;
        
        .lane-number {
          position: absolute;
          left: 5px;
          top: 50%;
          transform: translateY(-50%);
          background: #2f2f2f;
          color: white;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 12px;
        }
      }
    }
    
    .horse {
      position: absolute;
      transition: left 0.1s linear;
      display: flex;
      align-items: center;
      height: 40px;
      padding-left: 30px;
      
      .horse-name {
        margin-left: 8px;
        white-space: nowrap;
        font-size: 0.8rem;
        color: #333;
      }
    }
    
    .finish-line {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: #000;
    }
  }
}
</style>