import { Button } from "@/components/ui/button";
import { Circle, MoveRight, User } from "lucide-react";
import type React from "react";

interface PlayerInfoProps {
	name?: string;
	cardCount?: number;
	isCurrentTurn?: boolean;
	elo?: number;
	className?: string;
	isCurrentPlayer?: boolean;
}

export const PlayerInfo: React.FC<PlayerInfoProps> = ({
	name = "interlinked",
	cardCount = 10,
	elo = 1000,
	isCurrentTurn = true,
	isCurrentPlayer = true,
}) => (
	<div className="w-full flex items-center gap-4 p-3 bg-gray-800 rounded-lg shadow-md">
		{/* Player Avatar */}
		<div className="w-10 h-10 bg-gray-700 rounded-md flex items-center justify-center">
			<User className="w-5 h-5 text-gray-300" />
		</div>

		{/* Player Name and Card Count */}
		<div className="flex flex-col">
			<span className="text-sm font-bold text-gray-300">
				{name} <span className="font-thin">({elo})</span>
			</span>
			<div className="flex items-center gap-1">
				<svg
					width="16"
					height="16"
					viewBox="0 0 32 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="text-gray-400"
				>
					<title>{name}</title>
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
				<span className="text-xs font-bold text-gray-300">+{cardCount}</span>
			</div>
		</div>

		{/* Turn Indicator */}
		{isCurrentTurn && (
			<div className="flex flex-row gap-2 items-center w-auto h-auto ml-auto">
				<div className="relative">
					<div className="absolute inset-0 bg-amber-500 rounded-full blur-md opacity-50 animate-pulse" />
					<Circle
						size={12}
						fill="#F59E0B"
						className="relative text-amber-500 animate-pulse"
					/>
				</div>
			</div>
		)}

		{/* End Turn Button */}
		{isCurrentPlayer && (
			<Button
				title="End Turn"
				className="transition-all duration-300 font-medium py-2 px-3 rounded bg-gray-700 hover:bg-gray-600 text-gray-300 ml-auto"
			>
				<MoveRight className="w-5 h-5" />
			</Button>
		)}
	</div>
);

export default PlayerInfo;
