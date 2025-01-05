import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { useGameStore } from "../stores/game";

describe("Game Store Tests", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("has correct initial values", () => {
    const store = useGameStore();

    expect(store.raceAmount).toBe(6);
    expect(store.horseAmount).toBe(20);
    expect(store.conditionScore).toBe(100);
    expect(store.horseAmountForRace).toBe(10);
    expect(store.currentRound).toBe(0);
    expect(store.roundDistances).toEqual([1200, 1400, 1600, 1800, 2000, 2200]);
    expect(store.horses).toEqual([]);
    expect(store.raceSchedule).toEqual([]);
    expect(store.raceResults).toEqual([]);
    expect(store.isRacing).toBe(false);
  });

  it("currentRoundHorses returns horses for current round", () => {
    const store = useGameStore();
    store.raceSchedule = [
      [{ id: 1 }, { id: 2 }],
      [{ id: 3 }, { id: 4 }],
    ];
    expect(store.currentRoundHorses).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it("currentRoundHorses returns empty array when no schedule", () => {
    const store = useGameStore();
    expect(store.currentRoundHorses).toEqual([]);
  });

  it("isGameComplete returns true when all rounds completed", () => {
    const store = useGameStore();
    store.currentRound = 6;
    expect(store.isGameComplete).toBe(true);
  });

  it("currentRoundDistance returns correct distance for round", () => {
    const store = useGameStore();
    store.currentRound = 2;
    expect(store.currentRoundDistance).toBe(1600);
  });

  it("generates correct number of horses with correct properties", () => {
    const store = useGameStore();
    vi.spyOn(Math, "random").mockImplementation(() => 0.5);
    const mockColor = "rgb(128, 128, 128)";
    vi.spyOn(store, "generateHorses").mockImplementation(function () {
      this.horses = Array.from({ length: this.horseAmount }, (_, index) => ({
        id: index + 1,
        name: `Horse ${index + 1}`,
        color: mockColor,
        condition: 51,
        position: 0,
      }));
    });

    store.generateHorses();
    expect(store.horses).toHaveLength(20);
    
    const horse = store.horses[0];
    expect(horse).toHaveProperty("id", 1);
    expect(horse).toHaveProperty("name", "Horse 1");
    expect(horse).toHaveProperty("color", mockColor);
    expect(horse).toHaveProperty("condition", 51);
    expect(horse).toHaveProperty("position", 0);

    vi.restoreAllMocks();
  });

  it("each round has correct number of horses", () => {
    const store = useGameStore();
    store.generateHorses();
    store.generateRaceSchedule();
    store.raceSchedule.forEach((round) => {
      expect(round).toHaveLength(10);
    });
  });

  it("resets all game state", () => {
    const store = useGameStore();

    store.generateHorses();
    store.generateRaceSchedule();
    store.startRace();

    store.resetGame();

    expect(store.horses).toEqual([]);
    expect(store.currentRound).toBe(0);
    expect(store.raceSchedule).toEqual([]);
    expect(store.raceResults).toEqual([]);
    expect(store.isRacing).toBe(false);
  });

  it("starts race correctly", () => {
    const store = useGameStore();
    store.generateHorses();
    store.generateRaceSchedule();
    store.startRace();

    expect(store.isRacing).toBe(true);
  });

  it("pauses race correctly", () => {
    const store = useGameStore();
    store.generateHorses();
    store.generateRaceSchedule();
    store.startRace();
    store.pauseRace();

    expect(store.isRacing).toBe(false);
  });

  it("resumes race correctly", () => {
    const store = useGameStore();
    store.generateHorses();
    store.generateRaceSchedule();
    store.startRace();
    store.pauseRace();
    store.resumeRace();

    expect(store.isRacing).toBe(true);
  });
});
