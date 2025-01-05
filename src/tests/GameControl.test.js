import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import GameControls from '../components/GameControls.vue';
import { useGameStore } from '../stores/game';
import '@testing-library/jest-dom';

describe('GameControls Button Tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders all buttons correctly', () => {
    const wrapper = mount(GameControls);
    const buttons = wrapper.findAll('button');
    
    expect(buttons).toHaveLength(5);
    expect(buttons[0].text()).toBe('Generate Horses');
    expect(buttons[1].text()).toBe('Generate Schedule');
    expect(buttons[2].text()).toBe('Start Race');
    expect(buttons[3].text()).toBe('Continue Race');
    expect(buttons[4].text()).toBe('Reset Game');
  });

  it('disables Generate Schedule button when no horses are present', () => {
    const wrapper = mount(GameControls);
    const scheduleBtn = wrapper.findAll('button')[1];
    
    expect(scheduleBtn.attributes('disabled')).toBeDefined();
  });

  it('disables Start Race button when no race schedule exists', () => {
    const wrapper = mount(GameControls);
    const startBtn = wrapper.findAll('button')[2];
    
    expect(startBtn.attributes('disabled')).toBeDefined();
  });

  it('updates pause button text based on race state', async () => {
    const wrapper = mount(GameControls);
    const store = useGameStore();
    const pauseBtn = wrapper.findAll('button')[3];
    
    expect(pauseBtn.text()).toBe('Continue Race');
    
    store.isRacing = true;
    await wrapper.vm.$nextTick();
    expect(pauseBtn.text()).toBe('Pause Race');
    
    store.isRacing = false;
    await wrapper.vm.$nextTick();
    expect(pauseBtn.text()).toBe('Continue Race');
  });

});