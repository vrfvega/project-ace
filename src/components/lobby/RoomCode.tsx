import { Copy } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface RoomCodeProps {
  code: string;
}

const RoomCode = ({ code }: RoomCodeProps) => {
  const { toast } = useToast();
  const [copying, setCopying] = useState(false);

  const copyCode = async () => {
    try {
      setCopying(true);
      await navigator.clipboard.writeText(code);
      toast({
        title: "Copied!",
        description: "Room code copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy room code",
        variant: "destructive",
      });
    } finally {
      setCopying(false);
    }
  };

  return (
    <div className="flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-sm">
      <span className="text-gray-500">waiting for other players...</span>
      <div className="flex items-center gap-1">
        <span className="font-mono text-gray-700">{code}</span>
        <button
          onClick={copyCode}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          disabled={copying}
        >
          <Copy className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default RoomCode;
