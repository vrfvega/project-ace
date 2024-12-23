import { useDroppable } from "@dnd-kit/core";
import {
	SortableContext,
	horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";

interface MeldProps {
	id: string;
	cardIds: string[];
	children?: React.ReactNode;
}

const Meld: React.FC<MeldProps> = ({ id, cardIds, children }) => {
	const { setNodeRef } = useDroppable({ id });

	return (
		<div ref={setNodeRef}>
			<SortableContext items={cardIds} strategy={horizontalListSortingStrategy}>
				<div className="flex items-center -space-x-10">
					{React.Children.map(children, (child) => (
						<div className="w-[5.4rem] transition-all duration-300 transform hover:-translate-y-4 pointer-events-auto">
							{child}
						</div>
					))}
				</div>
			</SortableContext>
		</div>
	);
};

export default Meld;
