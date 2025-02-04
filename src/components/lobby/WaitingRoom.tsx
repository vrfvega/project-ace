import { Player } from "@/types/socket";
import PlayerAvatar from "./PlayerAvatar";
import PlayerCounter from "./PlayerCounter";
import RoomCode from "./RoomCode";

interface WaitngRoomProps {
  players: Player[];
  code: string;
}

const WaitingRoom = ({ players, code }: WaitngRoomProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center gap-8">
          <RoomCode code={code} />

          <div className="grid grid-cols-2 gap-8 w-full">
            {players.map((player: Player) => (
              <PlayerAvatar key={player.name} name={player.name} />
            ))}
            <PlayerAvatar name="Waiting..." isPlaceholder />
          </div>

          <div className="flex items-center gap-4">
            <button className="px-8 py-3 bg-blue-100 text-blue-700 rounded-full font-medium hover:bg-blue-200 transition-colors">
              Start Game
            </button>
            <PlayerCounter current={players.length} total={4} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;
