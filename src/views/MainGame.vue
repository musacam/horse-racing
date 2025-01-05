<script setup>
import HorseList from "../components/HorseList.vue";
import RaceTrack from "../components/RaceTrack.vue";
import RaceResults from "../components/RaceResults.vue";
import GameControls from "../components/GameControls.vue";
import RaceSchedule from "../components/RaceSchedule.vue";
</script>

<template>
  <div class="game-container">
    <header>
      <h1>Horse Racing Game Trial Day</h1>
    </header>
    <div class="game">
      <GameControls />
      <div class="game-layout">
        <HorseList />
        <RaceTrack />
        <RaceResults />
      </div>
      <RaceSchedule />
    </div>
  </div>
</template>

<style lang="scss">
@use "../assets/styles/variables.scss" as *;

.game-container {
  max-width: 90dvw;
  margin: 0 auto;
  padding: 15px;

  header {
    text-align: center;
    margin-bottom: 32px;

    h1 {
      color: #333;
    }
  }

  .game {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .game-layout {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    gap: 32px;
    height: auto;

    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
    }
  }
}
</style>
