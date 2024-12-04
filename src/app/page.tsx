"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import Meld from "./components/meld";
import Card from "./components/card";
import { CardData } from "./types/cards";

// Define interface for melds object
interface MeldsState {
  [key: string]: CardData[];
}

export default function Home() {
  const [melds, setMelds] = useState<MeldsState>({
    "meld-1": [
      { rank: "Queen", suit: "Diamonds", isFaceUp: true },
      { rank: "Queen", suit: "Spades", isFaceUp: true },
      { rank: "Queen", suit: "Hearts", isFaceUp: true },
    ],
    "meld-2": [
      { rank: "Queen", suit: "Clubs", isFaceUp: true },
      { rank: "Jack", suit: "Clubs", isFaceUp: true },
      { rank: 10, suit: "Clubs", isFaceUp: true },
      { rank: 9, suit: "Clubs", isFaceUp: true },
    ],
  });

  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<CardData | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const [meldId, cardIndex] = active.id.toString().split("-card-");
    setActiveId(active.id.toString());
    setActiveCard(melds[meldId][parseInt(cardIndex)]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      setActiveCard(null);
      return;
    }

    const [sourceMeldId, sourceCardIndex] = active.id
      .toString()
      .split("-card-");
    const [targetMeldId, targetCardIndex] = over.id.toString().split("-card-");

    if (sourceMeldId === targetMeldId && sourceCardIndex === targetCardIndex) {
      setActiveId(null);
      setActiveCard(null);
      return;
    }

    setMelds((prevMelds: MeldsState) => {
      const newMelds: MeldsState = { ...prevMelds };
      const sourceMeld = [...newMelds[sourceMeldId]];
      const [movedCard] = sourceMeld.splice(parseInt(sourceCardIndex), 1);

      if (sourceMeldId === targetMeldId) {
        // Simply insert the card at the target position without reordering
        sourceMeld.splice(parseInt(targetCardIndex), 0, movedCard);
        newMelds[sourceMeldId] = sourceMeld;
      } else {
        // Moving card between melds - insert at the target position
        const targetMeld = [...newMelds[targetMeldId]];
        if (parseInt(targetCardIndex) >= targetMeld.length) {
          // If dropping at the end, push to array
          targetMeld.push(movedCard);
        } else {
          // Otherwise insert at the specific position
          targetMeld.splice(parseInt(targetCardIndex), 0, movedCard);
        }
        newMelds[sourceMeldId] = sourceMeld;
        newMelds[targetMeldId] = targetMeld;
      }

      return newMelds;
    });

    setActiveId(null);
    setActiveCard(null);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="w-full h-full flex justify-center items-center gap-8">
        {Object.entries(melds).map(([meldId, cards]) => (
          <Meld key={meldId} id={meldId} cards={cards} />
        ))}
      </div>

      <DragOverlay>
        {activeId && activeCard && (
          <Card
            rank={activeCard.rank}
            suit={activeCard.suit}
            isFaceUp={activeCard.isFaceUp}
            color={
              ["Spades", "Clubs"].includes(activeCard.suit) ? "Black" : "Red"
            }
          />
        )}
      </DragOverlay>
    </DndContext>
  );
}
