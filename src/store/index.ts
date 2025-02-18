import { configureStore } from '@reduxjs/toolkit';
import cardReducer from '../features/cards/cardSlice';

export const store = configureStore({
  reducer: {
    cards: cardReducer,
  },
});

// Subscribe to store changes
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('cardsState', JSON.stringify(state.cards));
});

// On load, rehydrate
const savedCards = localStorage.getItem('cardsState');
if (savedCards) {
  // dispatch an action to rehydrate
}
