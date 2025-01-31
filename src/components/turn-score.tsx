import React from "react";

const TurnScore = ({ score = 0 }) => {
	return (
		<div className="flex bg-gray-800 rounded-xl justify-between items-center px-6 py-4">
			{/* Left Section: Label */}
			<div className="text-left">
				<p className="text-gray-400 font-semibold text-sm">Turn</p>
				<p className="text-gray-400 font-semibold text-sm">Score</p>
			</div>

			{/* Right Section: Icon and Score */}
			<div className="flex items-center gap-2">
				{/* Score */}
				<p className="text-white text-2xl font-extrabold">
					{score.toLocaleString()}
				</p>
			</div>
		</div>
	);
};

export default TurnScore;
