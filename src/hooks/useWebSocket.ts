'use client'

import { useState, useCallback, useEffect, useRef } from "react";
import { GameState, Message, CardData, GameSession } from "@/types/socket";

interface BaseResponse {
  event: string;
  message: string;
}

interface SessionResponse extends BaseResponse {
  data: {
    discard_pile: CardData[];
    card_drawn: CardData;
    session: GameSession;
  };
}

interface PlayerReadyResponse extends BaseResponse {
  data: {
    player: {
      name: string;
      is_ready: boolean;
    };
  };
}

type ServerResponse = SessionResponse | PlayerReadyResponse;

interface WebSocketHookResult {
  connected: boolean;
  messages: Message[];
  gameState: GameState;
  playerHand: CardData[];
  connect: (gameId: string, playerName: string) => void;
  sendMessage: (event: string, data?: any) => void;
  host: string;
}

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';

export function useWebSocket(): WebSocketHookResult {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [playerHand, setPlayerHand] = useState<CardData[]>([]);
  const [host, setHost] = useState<string>("");
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    currentTurn: "",
    phase: "waiting",
    state: "lobby",
  });

  const playerNameRef = useRef<string>("");

  const isSessionResponse = (data: any): data is SessionResponse => {
    return "data" in data && "session" in data.data;
  };

  const isDataResponse = (data: any): data is SessionResponse => {
    return "data" in data;
  };

  const handleWebSocketMessage = useCallback((event: MessageEvent) => {
    const data: ServerResponse = JSON.parse(event.data);
    console.log("Received message:", data);

    if (data.message) {
      setMessages((prev) => [
        ...prev,
        {
          type: data.event === "error" ? "error" : "system",
          text: data.message,
        },
      ]);
    }

    if (data.event.includes("_exception")) {
      console.log("Not so fast!");
      return null;
    }

    switch (data.event) {
      case "player_joined": {
        if (isSessionResponse(data)) {
          const session = data.data.session;
          const playersList = Object.values(session.players).map((player) => ({
            name: player.name,
            isReady: player.is_ready,
            hand: player.hand.cards.length > 0 ? player.hand.cards : undefined,
          }));

          setHost(session.host);
          setGameState((prev) => ({
            ...prev,
            players: playersList,
            phase: session.phase,
            state: session.state,
          }));
        }
        break;
      }

      case "player_ready": {
        if ("data" in data && "player" in data.data) {
          const playerData = data.data.player;
          setGameState((prev) => ({
            ...prev,
            players: prev.players.map((p) =>
              p.name === playerData.name
                ? { ...p, isReady: playerData.is_ready }
                : p
            ),
          }));
        }
        break;
      }

      case "player_not_ready": {
        if ("data" in data && "player" in data.data) {
          const playerData = data.data.player;
          setGameState((prev) => ({
            ...prev,
            players: prev.players.map((p) =>
              p.name === playerNameRef.current
                ? { ...p, isReady: playerData.is_ready }
                : p
            ),
          }));
        }
        break;
      }

      case "game_started": {
        if (isSessionResponse(data)) {
          const session = data.data.session;
          const players = Object.values(session.players).map((player) => ({
            name: player.name,
            isReady: player.is_ready,
            hand: player.hand.cards,
          }));

          const currentPlayer = session.players[playerNameRef.current];
          if (currentPlayer?.hand?.cards) {
            setPlayerHand(currentPlayer.hand.cards);
          }

          setGameState((prev) => ({
            ...prev,
            players,
            phase: session.phase,
            state: session.state,
            currentTurn: session.current_turn_player.name,
          }));
        }
        break;
      }

      case "card_exchange_complete":
      case "no_automatic_win":
      case "card_drawn_from_deck":
      case "card_discarded":
      case "card_picked_from_discard":
      case "turn_complete":
      case "player_left": {
        if (isSessionResponse(data)) {
          const session = data.data.session;
          const players = Object.values(session.players).map((player) => ({
            name: player.name,
            isReady: player.is_ready,
            hand: player.hand.cards,
          }));

          const currentPlayer = session.players[playerNameRef.current];
          if (currentPlayer?.hand?.cards) {
            setPlayerHand(currentPlayer.hand.cards);
          }

          setGameState((prev) => ({
            ...prev,
            players,
            phase: session.phase,
            state: session.state,
            currentTurn: session.current_turn_player?.name || prev.currentTurn,
            discardPile: session.discard_pile,
            cardDrawn: data.data.card_drawn,
          }));
        }
        break;
      }
    }
  }, []);

  const connect = useCallback(
    (gameId: string, playerName: string) => {
      if (typeof window === 'undefined') return;
      if (!gameId || !playerName) return;

      playerNameRef.current = playerName;

      const ws = new WebSocket(`ws://localhost:8080/game/${gameId}/${playerName}`);

      ws.onopen = () => {
        setConnected(true);
        setMessages((prev) => [
          ...prev,
          { type: "system", text: "Connected to game server" },
        ]);
      };

      ws.onmessage = handleWebSocketMessage;

      ws.onclose = () => {
        setConnected(false);
        setMessages((prev) => [
          ...prev,
          { type: "system", text: "Disconnected from game server" },
        ]);
        setGameState((prev) => ({
          ...prev,
          players: [],
          phase: "waiting",
          state: "lobby",
        }));
        setPlayerHand([]);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setMessages((prev) => [
          ...prev,
          { type: "error", text: "Connection error occurred" },
        ]);
      };

      setSocket(ws);
    },
    [handleWebSocketMessage]
  );

  const sendMessage = useCallback(
    (event: string, data = {}) => {
      if (socket?.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ event, ...data }));
      } else {
        console.warn("WebSocket is not connected");
      }
    },
    [socket]
  );

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  return {
    connected,
    messages,
    gameState,
    playerHand,
    connect,
    sendMessage,
    host,
  };
}
