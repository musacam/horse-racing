<script setup>
import { useGameStore } from '../stores/game';
const store = useGameStore();
</script>

<template>
  <div class="horse-list">
    <h2>Available Horses</h2>
    <div class="horses" data-test="horses">
      <div 
        v-for="horse in store.horses" 
        :key="horse.id"
        class="horse-item"
        :class="{ 'selected': store.currentRoundHorses.some(h => h.id === horse.id) }"
      >
        <div 
          class="horse-color" 
          :style="{ backgroundColor: horse.color }"
        ></div>
        <div class="horse-info">
          <span class="horse-name">{{ horse.name }}</span>
          <span class="horse-condition">Condition: {{ horse.condition }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/variables.scss' as *;

.horse-list {
  @include card;
  height: 100%;
  min-width: 300px;
  h2 {
    margin-bottom: 16px;
    color: #333;
  }
  
  .horses {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0 8px;
    max-height: 600px;
    overflow-y: auto;
    
    .horse-item {
      display: flex;
      align-items: center;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      transition: background-color 0.3s ease;
      
      &.selected {
        background-color: #E3F2FD;
        border-color: #2f2f2f;
      }
      
      .horse-color {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 16px;
      }
      
      .horse-info {
        display: flex;
        flex-direction: column;
        
        .horse-name {
          font-weight: bold;
        }
        
        .horse-condition {
          font-size: 0.9em;
          color: #666;
        }
      }
    }
  }
}
</style>