import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable as useDndSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export interface SortableItem {
  id: string;
  [key: string]: any;
}

interface UseSortableListProps<T extends SortableItem> {
  items: T[];
  onReorder: (items: T[]) => void;
}

export function useSortableList<T extends SortableItem>({ items, onReorder }: UseSortableListProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      onReorder(newItems);
    }
  };

  return { sensors, handleDragEnd };
}

interface SortableItemWrapperProps {
  id: string;
  children: (props: { listeners: any; isDragging: boolean }) => React.ReactNode;
}

export function SortableItemWrapper({ id, children }: SortableItemWrapperProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useDndSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {children({ listeners, isDragging })}
    </div>
  );
}

interface SortableListProps<T extends SortableItem> {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T, listeners: any, isDragging: boolean) => React.ReactNode;
}

export function SortableList<T extends SortableItem>({ 
  items, 
  onReorder, 
  renderItem 
}: SortableListProps<T>) {
  const { sensors, handleDragEnd } = useSortableList({ items, onReorder });

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {items.map((item) => (
            <SortableItemWrapper key={item.id} id={item.id}>
              {({ listeners, isDragging }: any) => renderItem(item, listeners, isDragging)}
            </SortableItemWrapper>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export { DndContext, SortableContext, verticalListSortingStrategy, closestCenter };
