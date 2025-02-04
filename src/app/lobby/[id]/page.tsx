"use client";

import { useWebSocket } from "@/hooks/useWebSocket";
import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import WaitingRoom from "@/components/lobby/WaitingRoom";

export default function LobbyPage() {
  const { id } = useParams();
  const { connect, connected, gameState, sendMessage } = useWebSocket();
  const connectionAttempted = useRef(false);
  const cookies = document.cookie.split("; ");
  const playerName = cookies
    .find((c) => c.startsWith("playerName="))
    ?.split("=")[1];
  const isHost =
    cookies.find((c) => c.startsWith("host="))?.split("=")[1] === "true";

  useEffect(() => {
    if (!connectionAttempted.current && id) {
      if (playerName) {
        connectionAttempted.current = true;
        connect(id as string, playerName);
      }
    }
  }, [id, connect, playerName]);

  if (!connected) {
    return <div>Connecting to lobby...</div>;
  }

  return (
    <WaitingRoom
      players={gameState.players}
      code={id as string}
      isHost={isHost}
      currentPlayerName={playerName}
      onReady={() => sendMessage("toggle_ready")}
    />
  );
}
