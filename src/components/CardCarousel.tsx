import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import CardItem from '../components/CardItem';
import { CardType } from '../features/cards/cardTypes';

interface CardCarouselProps {
  cardType: CardType;
}

const CardCarousel: React.FC<CardCarouselProps> = ({ cardType }) => {
  const { cards } = useSelector((state: RootState) => state.cards);
  const filteredCards = cards.filter((card) => card.cardType === cardType);

  const [activeIndex, setActiveIndex] = useState(0);

  if (!filteredCards.length) {
    return <div>No {cardType} cards found.</div>;
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? filteredCards.length - 1 : prev - 1
    );
  };

  const activeCard = filteredCards[activeIndex];

  return (
    <div className="flex flex-col items-center">
      <CardItem card={activeCard} />

      <div className="mt-4 flex space-x-2">
        <button onClick={handlePrev} className="px-3 py-1 bg-gray-200 rounded">
          Prev
        </button>
        <button onClick={handleNext} className="px-3 py-1 bg-gray-200 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default CardCarousel;
