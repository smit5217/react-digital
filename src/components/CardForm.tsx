import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { addCard } from '../features/cards/cardSlice';
import { CardType } from '../features/cards/cardTypes';

interface CardFormProps {
  onClose: () => void;
}

const CardForm: React.FC<CardFormProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');
  const [bankName, setBankName] = useState('');
  const [cardType, setCardType] = useState<CardType>('Credit');
  const [cardNumber, setCardNumber] = useState('');
  const [validTill, setValidTill] = useState('');
  const [cvv, setCvv] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [isAddedToGPay, setIsAddedToGPay] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validations:
    if (!name.trim() || name.length > 35) {
      setError('Name is required (max 35 chars).');
      return;
    }
    if (!bankName.trim()) {
      setError('Bank Name is required.');
      return;
    }
    if (!cardNumber.match(/^\d{16}$/)) {
      setError('Card Number must be 16 digits.');
      return;
    }
    // Validate validTill as future date (MM/YYYY)
    if (!/^(0[1-9]|1[0-2])\/20\d{2}$/.test(validTill)) {
      setError('Valid Till must be in MM/YYYY format (future date).');
      return;
    }
    // Simple future check (year >= current year, month >= current month)
    // For real-world scenario, parse and compare properly
    const [month, year] = validTill.split('/');
    const cardYear = parseInt(year, 10);
    const cardMonth = parseInt(month, 10);
    const now = new Date();
    const thisMonth = now.getMonth() + 1;
    const thisYear = now.getFullYear();

    if (cardYear < thisYear || (cardYear === thisYear && cardMonth < thisMonth)) {
      setError('Valid Till date must be in the future.');
      return;
    }

    if (!cvv.match(/^\d{3,4}$/)) {
      setError('CVV must be 3 or 4 digits.');
      return;
    }

    // Attempt to add the card via Redux
    try {
      dispatch(
        addCard({
          name,
          bankName,
          cardType,
          cardNumber,
          validTill,
          cvv,
          isDefault,
          isLocked: false,
          isArchived: false,
          isAddedToGPay,
        })
      );
      // Show success toast if needed
      onClose();
    } catch (err: any) {
      // If there's an error from the slice (e.g., default card conflict)
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl mb-4">Add New Card</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}

        {/* Name */}
        <label className="block mb-2">
          Name
          <input
            className="border rounded w-full p-2"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={35}
            required
          />
        </label>

        {/* Bank Name */}
        <label className="block mb-2">
          Bank Name
          <input
            className="border rounded w-full p-2"
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            required
          />
        </label>

        {/* Card Type */}
        <label className="block mb-2">
          Card Type
          <select
            className="border rounded w-full p-2"
            value={cardType}
            onChange={(e) => setCardType(e.target.value as CardType)}
          >
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
          </select>
        </label>

        {/* Card Number */}
        <label className="block mb-2">
          Card Number
          <input
            className="border rounded w-full p-2"
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </label>

        {/* Valid Till */}
        <label className="block mb-2">
          Valid Till (MM/YYYY)
          <input
            className="border rounded w-full p-2"
            type="text"
            placeholder="MM/YYYY"
            value={validTill}
            onChange={(e) => setValidTill(e.target.value)}
            required
          />
        </label>

        {/* CVV */}
        <label className="block mb-2">
          CVV
          <input
            className="border rounded w-full p-2"
            type="password"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </label>

        {/* Set Default */}
        <label className="block mb-2">
          <input
            type="checkbox"
            checked={isDefault}
            onChange={(e) => setIsDefault(e.target.checked)}
          />
          <span className="ml-2">Set Card as Default</span>
        </label>

        {/* Add to GPay */}
        <label className="block mb-4">
          <input
            type="checkbox"
            checked={isAddedToGPay}
            onChange={(e) => setIsAddedToGPay(e.target.checked)}
          />
          <span className="ml-2">Add this card to GPay</span>
        </label>

        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardForm;
