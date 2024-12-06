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

const MeldBuilder: React.FC<MeldProps> = ({ id, cardIds, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="h-full px-4">
      <div
        ref={setNodeRef}
        className={`
        relative
        h-full
        w-2/3
        rounded-lg
        border-2
        border-dashed
        border-accent
        items-center
        justify-center
        transition-colors
        bg-neutral-900
      `}
      >
        {cardIds.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            Drag cards here to create a meld
          </div>
        ) : (
          <SortableContext
            items={cardIds}
            strategy={horizontalListSortingStrategy}
          >
            <div className="flex items-center -space-x-10">
              {React.Children.map(children, (child) => (
                <div className="w-[5.4rem] transition-all duration-300 transform hover:-translate-y-4 pointer-events-auto">
                  {child}
                </div>
              ))}
            </div>
          </SortableContext>
        )}
      </div>
    </div>
  );
};

export default MeldBuilder;
