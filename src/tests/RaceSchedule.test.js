import { mount } from '@vue/test-utils';
import RaceSchedule from '@/components/RaceSchedule.vue';
import { createTestingPinia } from '@pinia/testing';
import { useGameStore } from '@/stores/game';

describe('RaceSchedule Tests', () => {
  let wrapper;
  let gameStore;

  beforeEach(() => {
    wrapper = mount(RaceSchedule, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              game: {
                raceSchedule: [
                  [
                    { id: 1, name: 'Horse 1' },
                    { id: 2, name: 'Horse 2' },
                  ],
                  [
                    { id: 3, name: 'Horse 3' },
                    { id: 4, name: 'Horse 4' },
                  ],
                ],
                currentRound: 1,
              },
            },
            stubActions: false,
          }),
        ],
      },
    });

    gameStore = useGameStore();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders the race schedule with the correct number of rounds', () => {
    const rounds = wrapper.findAll('.race-round');
    expect(rounds.length).toBe(2);
  });

  it('highlights the current round', () => {
    const activeRound = wrapper.find('.race-round.active');
    expect(activeRound.exists()).toBe(true);
    expect(activeRound.find('h2').text()).toBe('Round 2');
  });

  it('displays the correct horse names for each round', () => {
    const firstRoundHorses = wrapper.findAll('.race-round:nth-of-type(1) .horse');
    expect(firstRoundHorses.length).toBe(2);
    expect(firstRoundHorses[0].text()).toBe('Horse 1');
    expect(firstRoundHorses[1].text()).toBe('Horse 2');

    const secondRoundHorses = wrapper.findAll('.race-round:nth-of-type(2) .horse');
    expect(secondRoundHorses.length).toBe(2);
    expect(secondRoundHorses[0].text()).toBe('Horse 3');
    expect(secondRoundHorses[1].text()).toBe('Horse 4');
  });

  it('shows a message when no race schedule is available', async () => {
    await gameStore.$patch({ raceSchedule: [] });

    expect(wrapper.text()).toContain('No race schedule available. Generate the schedule first.');
  });
});
