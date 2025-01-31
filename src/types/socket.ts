export interface CardData {
  suit: string;
  rank: string;
  value: number;
  color: string;
  string: string;
}

export interface ServerHand {
  cards: CardData[];
  remaining_cards: number;
  is_empty: boolean;
}

export interface ServerPlayer {
  name: string;
  hand: ServerHand;
  melds: any[];
  is_ready: boolean;
  total_card_count: number;
}

export interface Player {
  name: string;
  hand?: CardData[];
  isReady: boolean;
}

export interface GameSession {
  id: string;
  host: string;
  players: { [key: string]: ServerPlayer };
  state: string;
  phase: string;
  deck: ServerHand;
  dealer: ServerPlayer;
  current_player_index: number;
  current_turn_player: ServerPlayer;
  turn_order: ServerPlayer[];
  card_exchanges: Record<string, any>;
  discard_pile: CardData[];
  pick_priority_queue: ServerPlayer[];
  is_empty: boolean;
}

export interface GameState {
  players: Player[];
  currentTurn: string;
  phase: string;
  state: string;
  turnOrder?: string[];
  cardDrawn?: CardData;
  discardPile?: CardData[];
}

export interface Message {
  type: "system" | "error" | "game";
  text: string;
}

export interface BaseResponse {
  event: string;
  message: string;
}

export interface SessionResponse extends BaseResponse {
  data: {
    session: GameSession;
  };
}

export interface PlayerReadyResponse extends BaseResponse {
  data: {
    player: {
      is_ready: boolean;
    };
  };
}

export type ServerResponse = SessionResponse | PlayerReadyResponse;
