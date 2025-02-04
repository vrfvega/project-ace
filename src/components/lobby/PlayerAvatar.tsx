import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface PlayerAvatarProps {
  name: string;
  isPlaceholder?: boolean;
}

const PlayerAvatar = ({ name, isPlaceholder = false }: PlayerAvatarProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Avatar
        className={cn(
          "w-20 h-20",
          isPlaceholder ? "bg-gray-200" : "bg-white shadow-md",
        )}
      >
        {!isPlaceholder && (
          <AvatarFallback className="text-xl">{name.charAt(0)}</AvatarFallback>
        )}
      </Avatar>
    </div>
  );
};

export default PlayerAvatar;
