import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import RaceTrack from "@/components/RaceTrack.vue";
import { useGameStore } from "@/stores/game";

describe("RaceTrack Tests", () => {
  let wrapper;
  let gameStore;

  beforeEach(() => {
    wrapper = mount(RaceTrack, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    });

    gameStore = useGameStore();
    gameStore.raceSchedule = [
      [
        { id: 1, name: "Red Horse", position: 120 },
        { id: 2, name: "Blue Horse", position: 240 },
      ],
    ];
    gameStore.currentRound = 0;
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders horses on the track with their positions", () => {
    const horseElements = wrapper.findAll(".horse");
    expect(horseElements).toHaveLength(2);
    expect(horseElements[0].text()).toContain("Red Horse");
    expect(horseElements[1].text()).toContain("Blue Horse");
  });

  it("renders no horses if raceSchedule is empty", async () => {
    gameStore.raceSchedule = [];
    await wrapper.vm.$nextTick();

    const horseTracks = wrapper.findAll(".horse");
    expect(horseTracks).toHaveLength(0);
  });
    
  it("displays positions correctly", () => {
    const horseElements = wrapper.findAll(".horse");

    expect(horseElements[0].element.style.left).toBe("10%");
    expect(horseElements[1].element.style.left).toBe("20%");
  });

});
