import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type React from "react";
import type { Rank, Suit } from "../types/cards";

interface CardProps {
	rank: Rank;
	suit: Suit;
	color: "Black" | "Red";
	isFaceUp: boolean;
	id: string;
}

const Card: React.FC<CardProps> = ({ rank, suit, color, isFaceUp, id }) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: id,
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0 : 1,
		position: "relative" as const,
		zIndex: isDragging ? 999 : 1,
		touchAction: "none",
		aspectRatio: "280 / 394",
	};

	const suitSymbols: Record<string, string> = {
		Spades: "♠",
		Clubs: "♣",
		Diamonds: "♦",
		Hearts: "♥",
	};

	const displayRank = typeof rank === "number" ? rank.toString() : rank[0];
	const displaySuit = suitSymbols[suit];
	const cardContent = isFaceUp ? (
		<>
			<g filter="url(#filter0_d_0_342)">
				<rect x="0" y="0" width="280" height="394" rx="20" fill="#F2F2F2" />
				<rect
					x="0.5"
					y="0.5"
					width="279"
					height="393"
					rx="19.5"
					stroke="#D2D2D2"
				/>
			</g>
			<text
				x="26"
				y="81"
				fontSize="64"
				fontWeight="bold"
				fill={color}
				textAnchor="start"
			>
				{displayRank}
			</text>
			<text x="24" y="166" fontSize="90" fill={color} textAnchor="start">
				{displaySuit}
			</text>
			<defs>
				<filter
					id="filter0_d_0_350"
					x="0"
					y="0"
					width="280"
					height="394"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="5" />
					<feGaussianBlur stdDeviation="17" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_0_350"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_0_350"
						result="shape"
					/>
				</filter>
			</defs>
		</>
	) : (
		<>
			<defs>
				<linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#b0e0e6" />
					<stop offset="100%" stopColor="#8abac9" />
				</linearGradient>
			</defs>
			<rect
				x="0"
				y="0"
				width="280"
				height="394"
				rx="20"
				fill="url(#gradient)"
			/>
			<rect
				x="10"
				y="10"
				width="260"
				height="374"
				rx="15"
				stroke="#c9eaf0"
				strokeWidth="8"
				fill="none"
			/>
		</>
	);

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			aria-label={`${rank} of ${suit}`}
		>
			<svg
				viewBox="0 0 280 394"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="w-full h-auto"
				preserveAspectRatio="xMidYMid meet"
			>
				<title>{`${rank} of ${suit}`}</title>
				{cardContent}
			</svg>
		</div>
	);
};

export default Card;
