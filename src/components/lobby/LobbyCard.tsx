import React from "react";
import { Card } from "@/components/ui/card";
import { Plus, LogIn } from "lucide-react";

interface LobbyCardProps {
  type: "create" | "join";
  onClick: () => void;
}

const LobbyCard = ({ type, onClick }: LobbyCardProps) => {
  const isCreate = type === "create";

  return (
    <Card
      className="w-64 h-72 flex flex-col items-center justify-center gap-4 cursor-pointer 
                 bg-emerald-800/40 backdrop-blur-sm border-amber-600/20
                 hover:bg-emerald-800/60 transition-all duration-200
                 group shadow-xl"
      onClick={onClick}
    >
      <div className="p-4 rounded-full bg-amber-600/20 group-hover:bg-amber-600/30 transition-colors">
        {isCreate ? (
          <Plus className="w-8 h-8 text-amber-400" />
        ) : (
          <LogIn className="w-8 h-8 text-amber-400" />
        )}
      </div>
      <h3 className="text-xl font-semibold text-amber-400">
        {isCreate ? "Crear Lobby" : "Unirse a un lobby"}
      </h3>
      <p className="text-sm text-emerald-100/80 text-center px-4">
        {isCreate
          ? "Crea un nuevo lobby"
          : "Ingresa el codigo de un lobby existente"}
      </p>
    </Card>
  );
};

export default LobbyCard;
