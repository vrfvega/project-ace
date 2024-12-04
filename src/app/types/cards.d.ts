export type Rank = "King" | "Queen" | "Jack" | "Ace" | number;
export type Suit = "Spades" | "Clubs" | "Diamonds" | "Hearts";

export interface CardData {
  rank: Rank;
  suit: Suit;
  isFaceUp: boolean;
}

export interface MeldData {
  id: string;
  cards: CardData[];
}