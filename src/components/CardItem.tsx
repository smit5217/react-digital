import React from 'react';
import { Card } from '../../features/cards/cardTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import {
  toggleShowCardNumber,
  toggleLock,
  toggleArchive,
  toggleDefault,
  toggleGPay,
} from '../features/cards/cardSlice';

interface CardItemProps {
  card: Card;
}

const CardItem: React.FC<CardItemProps> = ({ card }) => {
  const dispatch = useDispatch<AppDispatch>();
  const showFullCardNumberForId = useSelector(
    (state: RootState) => state.cards.showFullCardNumberForId
  );

  const isCardNumberVisible = showFullCardNumberForId === card.id;
  const displayNumber = isCardNumberVisible
    ? card.cardNumber
    : `**** **** **** ${card.cardNumber.slice(-4)}`;

  const handleShowNumber = () => dispatch(toggleShowCardNumber(card.id));
  const handleLock = () => dispatch(toggleLock(card.id));
  const handleArchive = () => dispatch(toggleArchive(card.id));

  const handleDefault = () => {
    try {
      dispatch(toggleDefault(card.id));
    } catch (err: any) {
      alert(err.message); // or toast
    }
  };

  const handleGPay = () => dispatch(toggleGPay(card.id));

  const isDisabled = card.isLocked || card.isArchived;

  return (
    <div
      className={`p-4 w-80 rounded shadow-md ${isDisabled ? 'bg-gray-300' : 'bg-white'}`}
    >
      <h3 className="text-xl font-bold mb-2">{card.name}</h3>
      <div className="text-gray-600 mb-2">{card.bankName}</div>
      <div className="mb-2">
        <span className="font-semibold">Card Number:</span> {displayNumber}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Valid Till:</span> {card.validTill}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Default Card:</span> {card.isDefault ? 'Yes' : 'No'}
      </div>
      <div className="mb-2">
        <span className="font-semibold">GPay Enabled:</span> {card.isAddedToGPay ? 'Yes' : 'No'}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={handleShowNumber}
          disabled={isDisabled}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          {isCardNumberVisible ? 'Hide Card Number' : 'Show Card Number'}
        </button>
        <button
          onClick={handleLock}
          className="px-3 py-1 bg-red-600 text-white rounded"
        >
          {card.isLocked ? 'Unlock Card' : 'Lock Card'}
        </button>
        <button
          onClick={handleArchive}
          className="px-3 py-1 bg-yellow-600 text-white rounded"
        >
          {card.isArchived ? 'Unarchive' : 'Archive'}
        </button>
        <button
          onClick={handleDefault}
          disabled={card.isDefault && !isDisabled}
          className={`px-3 py-1 ${card.isDefault ? 'bg-gray-500' : 'bg-green-600'} text-white rounded`}
        >
          {card.isDefault ? 'Remove Default' : 'Set as Default'}
        </button>
        <button
          onClick={handleGPay}
          disabled={isDisabled}
          className="px-3 py-1 bg-purple-600 text-white rounded"
        >
          {card.isAddedToGPay ? 'Remove from GPay' : 'Add to GPay'}
        </button>
      </div>
    </div>
  );
};

export default CardItem;
