import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import HorseList from "@/components/HorseList.vue";
import { useGameStore } from "@/stores/game";

describe("HorseList Tests", () => {
  let wrapper;
  let gameStore;

  beforeEach(() => {
    wrapper = mount(HorseList, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    });

    gameStore = useGameStore();
    gameStore.horses = [
      { id: 1, name: "Horse 1", color: 'rgb(110, 68, 33)', condition: 80 },
      { id: 2, name: "Horse 2", color: 'rgb(5, 125, 48)', condition: 90 },
    ];
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders a list of horses", () => {
    const horseItems = wrapper.findAll(".horse-item");
    expect(horseItems).toHaveLength(2);
    expect(horseItems[0].text()).toContain("Horse 1");
    expect(horseItems[1].text()).toContain("Horse 2");
  });

  it("displays the correct horse colors as styles", () => {
    const horseColors = wrapper.findAll(".horse-color");
    expect(horseColors[0].element.style.backgroundColor).toBe('rgb(110, 68, 33)');
    expect(horseColors[1].element.style.backgroundColor).toBe('rgb(5, 125, 48)');
  });

  it("shows the correct horse condition", () => {
    const horseConditions = wrapper.findAll(".horse-condition");
    expect(horseConditions[0].text()).toContain("80");
    expect(horseConditions[1].text()).toContain("90");
  });
});
