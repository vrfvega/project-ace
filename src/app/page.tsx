"use client";

import SidebarControlLayout from "@/app/components/sidebar-control-layout";
import TurnScore from "@/app/components/turn-score";
import PlayerInfo from "./components/player-info";

export default function Home() {
	return (
		<div className="flex h-screen w-full">
			{/* Smaller section (1/3) */}
			<div className="w-1/4 bg-gray-700 p-4 flex flex-col gap-4">
				{/* Player Info */}
				<PlayerInfo/>

				{/* Turn Score */}
					<TurnScore score={1200}/>

				{/* Sidebar Controls */}
					<SidebarControlLayout/>
			</div>

			{/* Larger section (2/3) */}
			<div className="w-3/4 bg-accent">
				{/* Content for the larger section */}
			</div>
		</div>
	);
}
