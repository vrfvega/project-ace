"use client";

import { useWebSocket } from "@/hooks/useWebSocket";
import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import WaitingRoom from "@/components/lobby/WaitingRoom";

export default function LobbyPage() {
  const { id } = useParams();
  const { connect, connected, gameState } = useWebSocket();
  const connectionAttempted = useRef(false);

  useEffect(() => {
    if (!connectionAttempted.current && id) {
      const cookies = document.cookie.split("; ");
      const playerName = cookies
        .find((c) => c.startsWith("playerName="))
        ?.split("=")[1];
      if (playerName) {
        connectionAttempted.current = true;
        connect(id as string, playerName);
      }
    }
  }, [id, connect]);

  if (!connected) {
    return <div>Connecting to lobby...</div>;
  }

  return <WaitingRoom players={gameState.players} />;
}
