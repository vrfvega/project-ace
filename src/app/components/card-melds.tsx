"use client";

import {
	DndContext,
	type DragEndEvent,
	DragOverlay,
	type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { nanoid } from "nanoid";
import { useState } from "react";
import type { CardData } from "../types/cards";
import Card from "./card";
import Meld from "./meld";

type Melds = Record<string, CardData[]>;

interface CardMeldsProps {
	initialMelds?: Melds;
	className?: string;
	onMeldsChange?: (melds: Melds) => void;
}

const defaultInitialMelds: Melds = {
	meld1: [
		{ id: nanoid(), rank: "Ace", suit: "Spades", isFaceUp: true },
		{ id: nanoid(), rank: "Ace", suit: "Hearts", isFaceUp: true },
		{ id: nanoid(), rank: "Ace", suit: "Diamonds", isFaceUp: true },
		{ id: nanoid(), rank: "Ace", suit: "Clubs", isFaceUp: true },
	],
	meld2: [
		{ id: nanoid(), rank: 2, suit: "Hearts", isFaceUp: true },
		{ id: nanoid(), rank: 3, suit: "Hearts", isFaceUp: true },
		{ id: nanoid(), rank: 4, suit: "Hearts", isFaceUp: true },
	],
	meld3: [
		{ id: nanoid(), rank: 7, suit: "Clubs", isFaceUp: true },
		{ id: nanoid(), rank: 8, suit: "Clubs", isFaceUp: true },
		{ id: nanoid(), rank: 9, suit: "Clubs", isFaceUp: true },
	],
};

const getColor = (suit: string) =>
	["Hearts", "Diamonds"].includes(suit) ? "Red" : "Black";

export default function CardMelds({
	initialMelds = defaultInitialMelds,
	className = "",
	onMeldsChange,
}: CardMeldsProps) {
	const [melds, setMelds] = useState<Melds>(initialMelds);
	const [activeCard, setActiveCard] = useState<CardData | null>(null);

	const findMeldByCardId = (cardId: string) =>
		Object.entries(melds).find(([, cards]) =>
			cards.some((c) => c.id === cardId),
		)?.[0];

	const handleDragStart = (event: DragStartEvent) => {
		const activeId = String(event.active.id);
		const draggedCard = Object.values(melds)
			.flat()
			.find((card) => card.id === activeId);
		if (draggedCard) setActiveCard(draggedCard);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		setActiveCard(null);
		if (!event.over) return;

		const activeId = String(event.active.id);
		const overId = String(event.over.id);

		const sourceMeldId = findMeldByCardId(activeId);
		const targetMeldId = findMeldByCardId(overId);

		if (!targetMeldId || !sourceMeldId) return;

		if (sourceMeldId === targetMeldId) {
			const meldCards = melds[targetMeldId];
			const oldIndex = meldCards.findIndex((card) => card.id === activeId);
			const newIndex = meldCards.findIndex((card) => card.id === overId);
			if (oldIndex !== -1 && newIndex !== -1) {
				setMelds((prev) => {
					const newMelds = {
						...prev,
						[targetMeldId]: arrayMove(prev[targetMeldId], oldIndex, newIndex),
					};
					onMeldsChange?.(newMelds);
					return newMelds;
				});
			}
		} else {
			const draggedCard = melds[sourceMeldId].find((c) => c.id === activeId);
			if (!draggedCard) return;
			const targetIndex = melds[targetMeldId].findIndex((c) => c.id === overId);
			setMelds((prev) => {
				const newMelds = {
					...prev,
					[sourceMeldId]: prev[sourceMeldId].filter((c) => c.id !== activeId),
					[targetMeldId]: [
						...prev[targetMeldId].slice(0, targetIndex + 1),
						draggedCard,
						...prev[targetMeldId].slice(targetIndex + 1),
					],
				};
				onMeldsChange?.(newMelds);
				return newMelds;
			});
		}
	};

	return (
		<DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
			<div className={`${className}`}>
				{Object.entries(melds).map(([meldId, cards]) => (
					<Meld key={meldId} id={meldId} cardIds={cards.map((c) => c.id)}>
						{cards.map((card) => (
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
				))}
			</div>
			<DragOverlay>
				{activeCard && (
					<Card
						id={activeCard.id}
						rank={activeCard.rank}
						suit={activeCard.suit}
						color={getColor(activeCard.suit)}
						isFaceUp={activeCard.isFaceUp}
					/>
				)}
			</DragOverlay>
		</DndContext>
	);
}
