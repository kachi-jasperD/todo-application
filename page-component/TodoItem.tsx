"use client";

import { useState } from "react";
import Link from "next/link";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
};

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);

  const handleSave = () => {
    if (editValue.trim() !== "") {
      onEdit(todo.id, editValue);
      setIsEditing(false);
    }
  };

  return (
    <li className="flex items-center gap-3 border rounded p-2 bg-white">
      {/* Checkbox for completion */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-5 w-5"
      />

      {/* Text / Edit field */}
      {isEditing ? (
        <input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="border p-1 flex-1"
        />
      ) : (
        <Link href={`/todo/details/${todo.id}`} className="flex-1">
          <span
            className={`cursor-pointer ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.text}
          </span>
        </Link>
      )}

      {/* Buttons */}
      {isEditing ? (
        <button
          onClick={handleSave}
          className="px-2 py-1 bg-green-500 text-white rounded"
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="px-2 py-1 bg-yellow-400 text-white rounded"
        >
          Edit
        </button>
      )}

      <button
        onClick={() => onDelete(todo.id)}
        className="px-2 py-1 bg-red-500 text-white rounded"
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
