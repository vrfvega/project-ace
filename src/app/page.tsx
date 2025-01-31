"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import LobbyCard from "@/components/lobby/LobbyCard";
import JoinLobbyDialog from "@/components/lobby/JoinLobbyCard";

const Index = () => {
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateLobby = () => {
    console.log("Creating lobby...");
    toast({
      title: "Creando Lobby...",
      description: "Seras redireccionado momentaneamente.",
    });
    //send request to create lobby
  };

  return (
    <div className="min-h-screen w-full bg-emerald-900 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)] flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-400 mb-4">
          Desmoche
        </h1>
        <p className="text-emerald-100 text-lg">
          Crea un nuevo lobby o unete a uno existente
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        <LobbyCard type="create" onClick={handleCreateLobby} />
        <LobbyCard type="join" onClick={() => setJoinDialogOpen(true)} />
      </div>

      <JoinLobbyDialog
        open={joinDialogOpen}
        onOpenChange={setJoinDialogOpen}
      />
    </div>
  );
};

export default Index;
