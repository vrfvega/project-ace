import React from "react";
import { Rank, Suit } from "../types/cards";

interface CardProps {
  rank: Rank;
  suit: Suit;
  color: "Black" | "Red";
  isFaceUp: boolean;
}

const Card: React.FC<CardProps> = ({ rank, suit, color, isFaceUp }) => {
  const suitSymbols: Record<string, string> = {
    Spades: "♠",
    Clubs: "♣",
    Diamonds: "♦",
    Hearts: "♥",
  };

  const displayRank = typeof rank === "number" ? rank.toString() : rank[0];
  const displaySuit = suitSymbols[suit];

  return (
    <svg
      width="348"
      height="462"
      viewBox="0 0 348 462"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[20vw] max-w-[150px] min-w-[100px]"
    >
      {isFaceUp ? (
        <>
          {/* Card Background */}
          <g filter="url(#filter0_d_0_342)">
            <rect
              x="34"
              y="29"
              width="280"
              height="394"
              rx="20"
              fill="#F2F2F2"
            />
            <rect
              x="34.5"
              y="29.5"
              width="279"
              height="393"
              rx="19.5"
              stroke="#D2D2D2"
            />
          </g>

          {/* Top-left Details */}
          <text
            x="60"
            y="110"
            fontSize="64"
            fontWeight="bold"
            fill={color.toLowerCase()}
            textAnchor="start"
          >
            {displayRank}
          </text>
          <text
            x="58"
            y="195"
            fontSize="90"
            fill={color.toLowerCase()}
            textAnchor="start"
          >
            {displaySuit}
          </text>
          <defs>
            <filter
              id="filter0_d_0_350"
              x="0"
              y="0"
              width="348"
              height="462"
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
          {/* Outer Gradient Background */}
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#b0e0e6" /> {/* Powder blue light */}
              <stop offset="100%" stopColor="#8abac9" />{" "}
              {/* Powder blue dark */}
            </linearGradient>
          </defs>
          <rect
            x="34"
            y="29"
            width="280"
            height="394"
            rx="20"
            fill="url(#gradient)"
          />

          {/* Inner Border with Padding */}
          <rect
            x="44"
            y="39"
            width="260"
            height="374"
            rx="15"
            stroke="#c9eaf0"
            strokeWidth="8"
            fill="none"
          />

          {/* Optional Shadow Effect */}
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="6"
              floodColor="rgba(0, 0, 0, 0.2)"
            />
          </filter>
        </>
      )}
    </svg>
  );
};

export default Card;
