"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import DraggableCard from "./draggable-card";
import { CardData } from "../types/cards";


interface Props {
  id: string;
  cards: CardData[];
}

const Meld: React.FC<Props> = ({ id, cards }) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div 
      ref={setNodeRef}
      className="relative w-full h-[462px] flex justify-center items-center"
    >
      {cards.map((card, index) => (
        <div
          key={`${id}-card-${index}`}
          className="absolute"
          style={{
            left: `${index * 56}px`,
            zIndex: cards.length + index,
          }}
        >
          <DraggableCard 
            card={card} 
            id={`${id}-card-${index}`}
          />
        </div>
      ))}
    </div>
  );
};

export default Meld;