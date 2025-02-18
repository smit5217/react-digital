import { createSlice, PayloadAction } from '@reduxjs/toolkit';
   import { Card, CardType } from './cardTypes';
   import { v4 as uuid } from 'uuid';

   interface CardState {
     cards: Card[];
     showFullCardNumberForId?: string; // track which card's number is shown
   }

   const initialState: CardState = {
     cards: [],
     showFullCardNumberForId: undefined,
   };

   const cardSlice = createSlice({
     name: 'cards',
     initialState,
     reducers: {
       addCard: (state, action: PayloadAction<Omit<Card, 'id'>>) => {
         // Check if there's already a default card of the same type
         if (
           action.payload.isDefault &&
           state.cards.some(
             (c) => c.cardType === action.payload.cardType && c.isDefault
           )
         ) {
           throw new Error('The selected card type already has a default card.');
         }

         state.cards.push({
           ...action.payload,
           id: uuid(), // generate unique ID
         });
       },
       toggleShowCardNumber: (state, action: PayloadAction<string>) => {
         // If the same card is clicked, hide it; otherwise show new card
         state.showFullCardNumberForId =
           state.showFullCardNumberForId === action.payload
             ? undefined
             : action.payload;
       },
       toggleLock: (state, action: PayloadAction<string>) => {
         const card = state.cards.find((c) => c.id === action.payload);
         if (card) {
           card.isLocked = !card.isLocked;
         }
       },
       toggleArchive: (state, action: PayloadAction<string>) => {
         const card = state.cards.find((c) => c.id === action.payload);
         if (card) {
           card.isArchived = !card.isArchived;
         }
       },
       toggleDefault: (state, action: PayloadAction<string>) => {
         const card = state.cards.find((c) => c.id === action.payload);
         if (!card) return;
         // If the user is trying to set default but there's already one in the same cardType
         if (!card.isDefault) {
           const hasDefault = state.cards.find(
             (c) => c.cardType === card.cardType && c.isDefault
           );
           if (hasDefault) {
             throw new Error('The selected card type already has a default card.');
           }
         }
         card.isDefault = !card.isDefault;
       },
       toggleGPay: (state, action: PayloadAction<string>) => {
         const card = state.cards.find((c) => c.id === action.payload);
         if (card) {
           card.isAddedToGPay = !card.isAddedToGPay;
         }
       },
     },
   });

   export const {
     addCard,
     toggleShowCardNumber,
     toggleLock,
     toggleArchive,
     toggleDefault,
     toggleGPay,
   } = cardSlice.actions;

   export default cardSlice.reducer;
