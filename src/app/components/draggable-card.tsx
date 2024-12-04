"use client";

import React, { CSSProperties } from "react";
import { useDraggable } from "@dnd-kit/core";
import Card from "./card";
import { CardData } from "../types/cards";

interface Props {
  card: CardData;
  id: string;
}

const DraggableCard: React.FC<Props> = ({ card, id }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
      data: card,
    });

  const style: CSSProperties | undefined = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
        position: "relative",
        zIndex: isDragging ? 1000 : undefined,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="touch-none"
      {...listeners}
      {...attributes}
    >
      <div className="transform transition-transform duration-300 hover:-translate-y-4 cursor-grab active:cursor-grabbing">
        <Card
          rank={card.rank}
          suit={card.suit}
          isFaceUp={card.isFaceUp}
          color={["Spades", "Clubs"].includes(card.suit) ? "Black" : "Red"}
        />
      </div>
    </div>
  );
};

export default DraggableCard;
