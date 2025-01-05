<script setup>
import { useGameStore } from "../stores/game";
const store = useGameStore();
</script>

<template>
  <div class="race-schedule">
    <h2>Race Schedule</h2>
    <div class="race-schedule-container" v-if="store.raceSchedule.length">
      <div
        v-for="(round, index) in store.raceSchedule"
        :key="index"
        class="race-round"
        :class="{ active: index === store.currentRound }"
      >
        <h2>Round {{ index + 1 }}</h2>
        <div class="race-horses">
          <span v-for="horse in round" :key="horse.id" class="horse">
            {{ horse.name }}
          </span>
        </div>
      </div>
    </div>
    <p v-else>No race schedule available. Generate the schedule first.</p>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/styles/variables.scss" as *;
.race-schedule {
  @include card;
  margin-top: 16px;

  h2 {
    margin-bottom: 16px;
    color: #333;
  }

  &-container {
    @include flex-center;
    flex-direction: row;
    gap: 16px;
    @media screen and (max-width: 1024px) {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  }

  .race-round {
    margin-bottom: 1.5rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;

    &.active {
      background-color: #f9f9f9;
      border-color: #007bff;
    }

    h2 {
      margin: 0 0 0.5rem;
    }

    .race-horses {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .horse {
        font-weight: bold;
        white-space: nowrap;
      }
    }
  }
}
</style>
