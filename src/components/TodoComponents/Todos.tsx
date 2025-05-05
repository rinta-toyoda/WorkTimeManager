import SortableTodoItem from "./SortableTodoItem.tsx";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import NewTodo from "./NewTodo.tsx";
import { AnimatePresence } from "framer-motion";

const initialTodos = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos") as string)
  : [];

type todoType = {
  id: string;
  title: string;
}[];

export default function Todos() {
  const [items, setItems] = useState(initialTodos);
  const [isCreatingNewTodo, setIsCreatingNewTodo] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));
  const handleCheck = (id: string) => {
    setItems((prev: todoType) => prev.filter((item) => item.id !== id));
  };

  const handleTrash = (id: string) => {
    setItems((prev: todoType) => prev.filter((item) => item.id !== id));
  };

  const handleEditTitle = (id: string, newTitle: string) => {
    setItems((prev: todoType) =>
      prev.map((item) =>
        item.id === id ? { ...item, title: newTitle } : item,
      ),
    );
  };

  const handleAddNewTodo = (title: string) => {
    setIsCreatingNewTodo(false);

    if (!title) return;
    setItems((prev: todoType) => [
      ...prev,
      { id: Date.now().toString(), title },
    ]);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify([...items]));
  }, [items]);

  return (
    <>
      <div className="sm:w-[80%] w-[350px] mx-auto">
        <AnimatePresence>
          {isCreatingNewTodo && <NewTodo onDone={handleAddNewTodo} />}
        </AnimatePresence>
        <div className="flex content-center justify-between text-3xl font-bold font-serif pt-10">
          Todo List{" "}
          <CiSquarePlus size={50} onClick={() => setIsCreatingNewTodo(true)} />
        </div>
        <hr className="border-black mx-auto pb-10" />
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={({ active, over }) => {
          if (active.id !== over?.id) {
            const oldIndex = items.findIndex(
              (item: { id: string; title: string }) => item.id === active.id,
            );
            const newIndex = items.findIndex(
              (item: { id: string; title: string }) => item.id === over?.id,
            );
            setItems(arrayMove(items, oldIndex, newIndex));
          }
        }}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 gap-x-12 max-w-6xl mx-auto place-items-center">
            {items.map((item: { id: string; title: string }) => (
              <SortableTodoItem
                key={item.id}
                id={item.id}
                title={item.title}
                onCheck={() => handleCheck(item.id)}
                onTrash={() => handleTrash(item.id)}
                onEditTitle={(newTitle: string) =>
                  handleEditTitle(item.id, newTitle)
                }
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
}
