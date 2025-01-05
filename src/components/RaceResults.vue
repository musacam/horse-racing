<script setup>
import { useGameStore } from "../stores/game";
const store = useGameStore();
const formatPosition = (position) => {
  const suffixes = ["st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th"];
  return position + suffixes[position - 1];
};

const formatTimeResults = (time) => {
  const seconds = time / 1000;
  return seconds.toFixed(2) + "s";
};
</script>

<template>
  <div class="race-results">
    <h2>Race Results</h2>

    <div class="results-container" v-if="!store.raceResults.length">
      No results yet
    </div>

    <div class="results-container" data-test="results-container" v-else>
      <div
        v-for="roundNumber in store.raceResults"
        :key="roundNumber.round"
        class="round-result"
      >
        <h3>Round {{ roundNumber.round }} Results</h3>
        <div class="standings">
          <div
            v-for="horse in roundNumber.results"
            :key="horse.id"
            class="standing-item"
          >
            <div
              class="horse-color"
              :style="{ backgroundColor: horse.color }"
            ></div>
            <img src="@/assets/horse.svg" width="30" height="30" />
            <span class="horse-name">{{ horse.name }}</span>
            <span class="position">{{ formatPosition(horse.rank) }} - {{ formatTimeResults(horse.completionTime) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/styles/variables.scss" as *;

.race-results {
  @include card;
  height: 100%;
  overflow: auto;
  min-width: 400px;

  h2 {
    margin-bottom: 16px;
    color: #333;
  }

  .results-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
    max-height: 600px;
    overflow: auto;

    .round-result {
      @include card;
      border: 1px solid #ddd;

      h3 {
        margin-bottom: 16px;
        color: #333;
        font-size: 1.1rem;
      }

      .standings {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .standing-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 4px;
          border-radius: 4px;
          background-color: #f2f2f2;

          .horse-color {
            width: 16px;
            height: 16px;
            border-radius: 50%;
          }

          .horse-name {
            flex: 1;
            font-weight: 500;
          }

          .position {
            font-weight: bold;
            color: #2f2f2f;
          }
        }
      }
    }
  }
}
</style>
