import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import RaceResults from '@/components/RaceResults.vue';
import { useGameStore } from '@/stores/game';

describe('RaceResults Tests', () => {
  let wrapper;
  let gameStore;

  beforeEach(() => {
    wrapper = mount(RaceResults, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    });

    gameStore = useGameStore();
    gameStore.raceResults = [
      {
        round: 1,
        results: [
          { id: 1, name: 'Red Horse', rank: 1, color: 'red' },
          { id: 2, name: 'Blue Horse', rank: 2, color: 'blue' },
        ],
      },
    ];
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders race results for each round', () => {
    const roundResults = wrapper.findAll('.round-result');
    expect(roundResults).toHaveLength(1);
    expect(roundResults[0].text()).toContain('Round 1');
  });

  it('renders horse standings with correct details', () => {
    const standings = wrapper.findAll('.standing-item');
    expect(standings).toHaveLength(2);

    // Check first horse
    const firstHorse = standings[0];
    expect(firstHorse.find('.horse-name').text()).toBe('Red Horse');
    expect(firstHorse.find('.position').text()).toContain('1st');
    expect(firstHorse.find('.horse-color').element.style.backgroundColor).toBe('red');

    // Check second horse
    const secondHorse = standings[1];
    expect(secondHorse.find('.horse-name').text()).toBe('Blue Horse');
    expect(secondHorse.find('.position').text()).toContain('2nd');
    expect(secondHorse.find('.horse-color').element.style.backgroundColor).toBe('blue');
  });

  it('reacts to changes in race results', async () => {
    gameStore.raceResults.push({
      round: 2,
      results: [
        { id: 3, name: 'Green Horse', rank: 1, color: 'green' },
        { id: 4, name: 'Yellow Horse', rank: 2, color: 'yellow' },
      ],
    });
    await wrapper.vm.$nextTick();

    const roundResults = wrapper.findAll('.round-result');
    expect(roundResults).toHaveLength(2);
    expect(roundResults[1].text()).toContain('Round 2');
  });
});

