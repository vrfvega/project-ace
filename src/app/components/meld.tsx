import React from "react";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

interface MeldProps {
  id: string;
  cardIds: string[];
  children?: React.ReactNode;
}

const Meld: React.FC<MeldProps> = ({ id, cardIds, children }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <SortableContext items={cardIds} strategy={horizontalListSortingStrategy}>
      <div
        ref={setNodeRef}
        className={`
          relative
          p-4
          min-h-[25vh]
          min-w-[20vw]
          rounded-lg
          border-2
          border-dashed
          border-gray-400
          flex
          items-center
          transition-colors
          ${isOver ? "bg-blue-100" : "bg-white"}
        `}
      >
        <div className="flex -space-x-24">
          {React.Children.map(children, (child) => (
            <div className="transform transition-transform duration-200 hover:-translate-y-4">
              {child}
            </div>
          ))}
        </div>
      </div>
    </SortableContext>
  );
};

export default Meld;
