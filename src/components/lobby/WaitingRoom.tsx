import { Player } from "@/types/socket";
import PlayerAvatar from "./PlayerAvatar";
import PlayerCounter from "./PlayerCounter";
import RoomCode from "./RoomCode";
import { CheckSquare, XSquare, Play } from "lucide-react";
import { Button } from "../ui/button";
interface WaitingRoomProps {
  players: Player[];
  code: string;
  isHost?: boolean;
  currentPlayerName?: string;
  onReady?: (playerId: string) => void;
  onStartGame?: () => void;
}
const WaitingRoom = ({
  players,
  code,
  isHost = false,
  currentPlayerName,
  onReady,
  onStartGame,
}: WaitingRoomProps) => {
  const currentPlayer = players.find((p) => p.name === currentPlayerName);
  const allPlayersReady = players.every((player) => player.isReady);

  console.log("Rendering WaitingRoom with players:", players);
  console.log("Current player:", currentPlayer);
  console.log("Is host:", isHost);
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-emerald-900 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)]">
      <div className="bg-emerald-800/90 backdrop-blur-sm rounded-3xl shadow-lg border border-amber-600/20 p-8 w-full max-w-md">
        <div className="flex flex-col items-center gap-8">
          <RoomCode code={code} />
          <div className="grid grid-cols-2 gap-8 w-full">
            {players.map((player: Player) => (
              <div
                key={player.name}
                className="flex flex-col items-center gap-2"
              >
                <PlayerAvatar name={player.name} />
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 text-sm font-medium">
                    {player.name}
                  </span>
                  {player.isReady ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <XSquare className="w-4 h-4 text-red-400" />
                  )}
                </div>
                {currentPlayerName === player.name && !player.isReady && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 bg-emerald-700/50 border-amber-600/20 text-amber-400 hover:bg-emerald-600/50"
                    onClick={() => onReady?.(player.name)}
                  >
                    Ready
                  </Button>
                )}
              </div>
            ))}
            {players.length < 4 && (
              <div className="flex flex-col items-center gap-2">
                <PlayerAvatar name="Waiting..." isPlaceholder />
                <span className="text-emerald-300/50 text-sm">Waiting...</span>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center gap-4">
            <PlayerCounter current={players.length} total={4} />
            {isHost && (
              <Button
                className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white gap-2"
                disabled={!allPlayersReady || players.length < 2}
                onClick={onStartGame}
              >
                <Play className="w-4 h-4" />
                Start Game
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default WaitingRoom;
