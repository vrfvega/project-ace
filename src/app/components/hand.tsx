"use client";

import React, { useState } from "react";
import Card from "./card";
import { CardData } from "../types/cards";

interface HandProps {
  cards: CardData[];
}

const Hand: React.FC<HandProps> = ({ cards: initialCards }) => {
  const [cards, setCards] = useState<CardData[]>(initialCards);

  const flipCard = (index: number) => {
    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, isFaceUp: !card.isFaceUp } : card
      )
    );
  };

  return (
    <div className="relative w-full h-[462px] flex justify-center items-center">
      {cards.map((card, index) => (
        <div
          key={index}
          onClick={() => flipCard(index)}
          className="absolute"
          style={{
            left: `${index * 56}px`, // Offset cards horizontally
            zIndex: cards.length + index, // Ensure earlier cards are on top
          }}
        >
          <div className="transform transition-transform duration-300 hover:-translate-y-4">
            <Card
              rank={card.rank}
              suit={card.suit}
              isFaceUp={card.isFaceUp}
              color={["Spades", "Clubs"].includes(card.suit) ? "Black" : "Red"}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hand;
