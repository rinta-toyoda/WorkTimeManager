import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PiHamburgerThin } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";

export default function SortableTodoItem({
  id,
  title,
  onCheck,
  onTrash,
  onEditTitle,
}: {
  id: string;
  title: string;
  onCheck: () => void;
  onTrash: () => void;
  onEditTitle: (editedTitle: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [isComposing, setIsComposing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    if (editedTitle !== title && onEditTitle) {
      onEditTitle(editedTitle);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="w-[370px] sm:w-[580px] h-[100px] border-black border-[1px] rounded-lg shadow-md bg-white cursor-auto content-center"
    >
      <div className="py-4 px-3 text-black font-serif text-sm md:text-md flex items-center justify-between">
        <div {...listeners} className="cursor-grab pr-4">
          <PiHamburgerThin size={35} />
        </div>
        {isEditing ? (
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleSave}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isComposing) handleSave();
            }}
            autoFocus
            className="border border-gray-300 rounded px-2 py-1 text-black w-full mr-2"
          />
        ) : (
          <span className="flex-grow">{title}</span>
        )}
        <div className="flex-shrink-0 grid grid-cols-3 gap-0.5">
          {isEditing ? (
            <button
              className="hover:bg-gray-100 text-[10px] rounded-md cursor-pointer"
              onClick={handleSave}
            >
              DONE
            </button>
          ) : (
            <div
              onClick={() => setIsEditing(true)}
              className="hover:bg-gray-100 p-2 rounded-md cursor-pointer"
            >
              <FaRegEdit />
            </div>
          )}

          <div
            onClick={onTrash}
            className="hover:bg-gray-100 p-2 rounded-md cursor-pointer "
          >
            <CiTrash />
          </div>
          <div
            onClick={onCheck}
            className="hover:bg-gray-100 p-2 rounded-md cursor-pointer"
          >
            <FaCheck />
          </div>
        </div>
      </div>
    </div>
  );
}
