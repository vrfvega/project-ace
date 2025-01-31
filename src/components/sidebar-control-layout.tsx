import { Button } from "@/components/ui/button";

const SidebarControlLayout = () => {
	return (
		<div className="flex flex-col h-full">
			<div className="flex flex-row items-start gap-4">
				{/* Buttons Section */}
				<div className="flex flex-col w-1/3 h-full gap-4">
					<Button className="text-white font-bold flex-1 rounded-xl flex items-center justify-center text-lg">
						<span>Turn Info</span>
					</Button>
					<Button className="text-white font-bold flex-1 rounded-xl flex items-center justify-center text-lg">
						<span>Options</span>
					</Button>
				</div>

				{/* Grid Section */}
				<div className="grid grid-cols-2 grid-rows-3 gap-4 w-2/3">
					{/* Cards */}
					<div className="flex bg-gray-800 rounded-xl col-span-1 row-span-1 justify-center items-center p-6">
						<div className="text-center">
							<p className="text-gray-400 font-semibold text-lg">Cards</p>
							<p className="text-blue-400 text-3xl font-extrabold">5</p>
						</div>
					</div>

					{/* Discards */}
					<div className="flex bg-gray-800 rounded-lg col-span-1 row-span-1 justify-center items-center p-6">
						<div className="text-center">
							<p className="text-gray-400 font-semibold text-lg">Discards</p>
							<p className="text-red-400 text-3xl font-extrabold">1</p>
						</div>
					</div>

					{/* Money */}
					<div className="flex bg-gray-800 rounded-lg col-span-2 row-span-1 justify-center items-center p-6">
						<p className="text-yellow-400 text-4xl font-extrabold">$18</p>
					</div>

					{/* Melds */}
					<div className="flex bg-gray-800 rounded-lg col-span-1 row-span-1 justify-center items-center p-6">
						<div className="text-center">
							<p className="text-gray-400 font-semibold text-lg">Melds</p>
							<p className="text-orange-400 text-3xl font-extrabold">1</p>
						</div>
					</div>

					{/* Round */}
					<div className="flex bg-gray-800 rounded-lg col-span-1 row-span-1 justify-center items-center p-6">
						<div className="text-center">
							<p className="text-gray-400 font-semibold text-lg">Round</p>
							<p className="text-purple-400 text-3xl font-extrabold">1</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SidebarControlLayout;
