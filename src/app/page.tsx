"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  pointerWithin,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { nanoid } from "nanoid";
import Meld from "./components/meld";
import Card from "./components/card";
import { CardData } from "./types/cards";

const getColor = (suit: string) =>
  ["Hearts", "Diamonds"].includes(suit) ? "Red" : "Black";

export default function Home() {
  const [availableCards, setAvailableCards] = useState<CardData[]>([]);
  const [melds, setMelds] = useState<{ [key: string]: CardData[] }>({
    meld1: [],
    meld2: [],
  });
  const [activeCard, setActiveCard] = useState<CardData | null>(null);

  useEffect(() => {
    setAvailableCards([
      { id: nanoid(), rank: "Ace", suit: "Spades", isFaceUp: true },
      { id: nanoid(), rank: "Ace", suit: "Clubs", isFaceUp: true },
      { id: nanoid(), rank: "Ace", suit: "Diamonds", isFaceUp: true },
      { id: nanoid(), rank: "Ace", suit: "Hearts", isFaceUp: true },
      { id: nanoid(), rank: 2, suit: "Hearts", isFaceUp: true },
      { id: nanoid(), rank: 3, suit: "Hearts", isFaceUp: true },
      { id: nanoid(), rank: 4, suit: "Hearts", isFaceUp: true },
    ]);
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const allCards = [...availableCards, ...Object.values(melds).flat()];
    const draggedCard = allCards.find((card) => card.id === active.id);
    if (draggedCard) {
      setActiveCard(draggedCard);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over) return;

    // Dragging from available cards to a meld
    if (
      (over.id === "meld1" || over.id === "meld2") &&
      availableCards.some((card) => card.id === active.id)
    ) {
      const draggedCard = availableCards.find((card) => card.id === active.id);
      if (draggedCard) {
        setAvailableCards((prev) =>
          prev.filter((card) => card.id !== active.id)
        );
        setMelds((prev) => ({
          ...prev,
          [over.id]: [...prev[over.id], draggedCard],
        }));
      }
      return;
    }

    // Dragging between melds
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sourceMeldId = Object.entries(melds).find(([_, cards]) =>
      cards.some((card) => card.id === active.id)
    )?.[0];

    if (sourceMeldId && (over.id === "meld1" || over.id === "meld2")) {
      const draggedCard = melds[sourceMeldId].find(
        (card) => card.id === active.id
      );
      if (draggedCard && sourceMeldId !== over.id) {
        setMelds((prev) => ({
          ...prev,
          [sourceMeldId]: prev[sourceMeldId].filter(
            (card) => card.id !== active.id
          ),
          [over.id]: [...prev[over.id], draggedCard],
        }));
      }
      return;
    }

    // Reordering within a meld
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const meldId = Object.entries(melds).find(([_, cards]) =>
      cards.some((card) => card.id === over.id)
    )?.[0];

    if (meldId && active.id !== over.id) {
      const oldIndex = melds[meldId].findIndex((card) => card.id === active.id);
      const newIndex = melds[meldId].findIndex((card) => card.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        setMelds((prev) => ({
          ...prev,
          [meldId]: arrayMove(prev[meldId], oldIndex, newIndex),
        }));
      }
    }
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={pointerWithin}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* Available Cards */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {availableCards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              rank={card.rank}
              suit={card.suit}
              color={getColor(card.suit)}
              isFaceUp={card.isFaceUp}
            />
          ))}
        </div>

        {/* Melds */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <Meld id="meld1" cardIds={melds.meld1.map((card) => card.id)}>
            {melds.meld1.map((card) => (
              <Card
                key={card.id}
                id={card.id}
                rank={card.rank}
                suit={card.suit}
                color={getColor(card.suit)}
                isFaceUp={card.isFaceUp}
              />
            ))}
          </Meld>

          <Meld id="meld2" cardIds={melds.meld2.map((card) => card.id)}>
            {melds.meld2.map((card) => (
              <Card
                key={card.id}
                id={card.id}
                rank={card.rank}
                suit={card.suit}
                color={getColor(card.suit)}
                isFaceUp={card.isFaceUp}
              />
            ))}
          </Meld>
        </div>
      </div>

      <DragOverlay>
        {activeCard ? (
          <Card
            id={activeCard.id}
            rank={activeCard.rank}
            suit={activeCard.suit}
            color={getColor(activeCard.suit)}
            isFaceUp={activeCard.isFaceUp}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
