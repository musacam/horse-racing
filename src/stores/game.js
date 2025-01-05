import { defineStore } from "pinia";

export const useGameStore = defineStore("game", {
  state: () => ({
    raceAmount: 6,
    horseAmount: 20,
    conditionScore: 100,
    horseAmountForRace: 10,
    currentRound: 0,
    roundDistances: [1200, 1400, 1600, 1800, 2000, 2200],
    horses: [],
    raceSchedule: [],
    raceResults: [],
    isRacing: false,
    startTime: null,
    stoppedTime: null,
  }),

  getters: {
    availableHorses() {
      return this.horses;
    },
    currentRoundHorses() {
      return this.raceSchedule[this.currentRound] || [];
    },
    isGameComplete() {
      return this.currentRound >= this.raceAmount;
    },
    currentRoundDistance() {
      return this.roundDistances[this.currentRound];
    },
  },
  actions: {
    generateHorses() {
      const generateRandomColor = () => {
        const randomChannel = () => Math.floor(Math.random() * 256);
        return `rgb(${randomChannel()}, ${randomChannel()}, ${randomChannel()})`;
      };

      const colors = new Set();
      while (colors.size < this.horseAmount) {
        colors.add(generateRandomColor());
      }

      this.horses = Array.from({ length: this.horseAmount }, (_, index) => ({
        id: index + 1,
        name: `Horse ${index + 1}`,
        color: Array.from(colors)[index],
        condition: Math.floor(Math.random() * this.conditionScore) + 1,
        position: 0,
      }));
    },

    generateRaceSchedule() {
      this.raceSchedule = Array.from({ length: this.raceAmount }, () => {
        const shuffled = [...this.horses].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, this.horseAmountForRace).map((horse) => ({
          ...horse,
          position: 0,
          completionTime: null,
        }));
      });
      this.currentRound = 0;
      this.raceResults = [];
      this.isRacing = false;
    },

    updatePositions(raceHorses) {
      raceHorses.forEach((horse) => {
        const baseSpeed = 20;
        const conditionBonus = (horse.condition / this.conditionScore) * 10;
        const randomFactor = Math.random() * 10;
        const distanceFactor = 200 / this.currentRoundDistance;
        const finalSpeed =
          (baseSpeed + conditionBonus + randomFactor) * distanceFactor;

        horse.position += finalSpeed;

        if (
          !horse.completionTime &&
          horse.position >= this.currentRoundDistance
        ) {
          horse.completionTime = performance.now() - this.startTime;
        }
      });

      this.raceSchedule[this.currentRound] = [...raceHorses];
    },

    isRaceComplete(raceHorses) {
      return raceHorses.every(
        (horse) => horse.position >= this.currentRoundDistance
      );
    },

    completeRace(raceHorses) {
      const sortedResults = raceHorses
        .sort((a, b) => a.completionTime - b.completionTime)
        .map((horse, index) => ({ ...horse, rank: index + 1 }));

      this.raceResults.push({
        round: this.currentRound + 1,
        results: sortedResults,
      });

      this.currentRound++;
      this.isRacing = false;
      this.startTime = null;
    },

    startRace() {
      if (this.isRacing || this.isGameComplete) return;

      this.isRacing = true;
      const raceHorses = this.raceSchedule[this.currentRound].map((horse) => ({
        ...horse,
        position: 0,
        completionTime: null,
      }));

      this.startTime = performance.now();

      const animate = () => {
        if (!this.isRacing) return;

        this.updatePositions(raceHorses);

        if (this.isRaceComplete(raceHorses)) {
          this.completeRace(raceHorses);
        } else {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    },

    pauseRace() {
      this.isRacing = false;
      this.stoppedTime = performance.now();
    },

    resumeRace() {
      if (this.isRacing || !this.raceSchedule[this.currentRound]) return;

      this.isRacing = true;

      if (this.stoppedTime) {
        this.startTime += performance.now() - this.stoppedTime;
        this.stoppedTime = null;
      }

      const raceHorses = this.raceSchedule[this.currentRound];

      const animate = () => {
        if (!this.isRacing) return;

        this.updatePositions(raceHorses);

        if (this.isRaceComplete(raceHorses)) {
          this.completeRace(raceHorses);
        } else {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    },

    resetGame() {
      this.horses = [];
      this.currentRound = 0;
      this.raceSchedule = [];
      this.raceResults = [];
      this.isRacing = false;
      this.startTime = null;
      this.stoppedTime = null;
    },
  },
});
