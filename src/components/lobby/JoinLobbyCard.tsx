import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface JoinLobbyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const JoinLobbyDialog = ({ open, onOpenChange }: JoinLobbyDialogProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Joining table...");
    // Handle join lobby logic here
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-emerald-900 border-amber-600/20">
        <DialogHeader>
          <DialogTitle className="text-amber-400">Join Table</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Enter table code"
            className="bg-emerald-800/50 border-amber-600/20 text-white placeholder:text-emerald-100/50"
          />
          <Button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
          >
            Take a Seat
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JoinLobbyDialog;
