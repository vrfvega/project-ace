import React from "react";
import { User, Circle } from "lucide-react";

interface PlayerInfoProps {
  name?: string;
  cardCount?: number;
  isCurrentTurn?: boolean;
  elo?: number;
  className?: string;
}

export const OpponentInfo: React.FC<PlayerInfoProps> = ({
  name = "Keion",
  cardCount = 10,
  elo = 400,
  isCurrentTurn,
}) => (
  <div className="w-full inline-flex items-center gap-4 p-2 bg-neutral-900">
    {/* Player Avatar */}
    <div className="w-6 h-6 bg-neutral-700 rounded-md flex items-center justify-center">
      <User className="w-4 h-4 text-text" />
    </div>

    {/* Player Name and Card Count */}
    <div className="flex flex-col">
      <span className="text-md font-bold text-text">
        {name} <span className="font-thin">({elo})</span>
      </span>
    </div>

    <div className="flex items-center gap-1">
      <svg
        width="16"
        height="16"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-text"
      >
        <g clipPath="url(#clip0_4_18)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.7963 0.732947C16.2279 0.580738 15.6438 0.917992 15.4914 1.4863L10.3057 20.83C10.1532 21.3985 10.4906 21.9829 11.0592 22.1352L24.5737 25.7546C25.1421 25.9068 25.7262 25.5696 25.8786 25.0013L31.0645 5.65749C31.2168 5.08899 30.8794 4.5046 30.3109 4.35233L16.7963 0.732947ZM7.62347 20.1109L11.1699 6.8823L0.79027 9.6621C0.221724 9.81436 -0.11568 10.3988 0.0367289 10.9673L5.22251 30.311C5.37486 30.8792 5.95901 31.2167 6.52733 31.0643L20.0419 27.445C20.0595 27.4403 20.077 27.4352 20.0941 27.4297L10.3408 24.8176C8.29059 24.2684 7.07387 22.161 7.62347 20.1109Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_4_18">
            <rect width="31.1011" height="31.1011" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <span className="text-sm font-bold text-text">+{cardCount}</span>
    </div>

    {/* Turn Indicator */}
    {isCurrentTurn && (
      <div className="flex flex-row gap-4 items-center w-auto h-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-amber-500 rounded-full blur-xl opacity-50 animate-pulse duration-1000" />
          <Circle
            size={10}
            fill="#F59E0B"
            className="relative text-amber-500 animate-pulse duration-1000"
          />
        </div>
      </div>
    )}
  </div>
);

export default OpponentInfo;
