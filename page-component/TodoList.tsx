
"use client";

import { useState } from "react";
import TodoItem from "./TodoItem";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
};

interface Props {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

function TodoList({ todos, onToggle, onDelete, onEdit }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 5;

  const totalPages = Math.ceil(todos.length / todosPerPage);
  const startIndex = (currentPage - 1) * todosPerPage;
  const currentTodos = todos.slice(startIndex, startIndex + todosPerPage);

  if (todos.length === 0) {
    return <p className="mt-4 text-gray-500">No tasks yet.</p>;
  }

  return (
    <div className="mt-4 space-y-4">
      {/* List of todos for the current page */}
      <ul className="space-y-2">
        {currentTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>

      {/* Pagination controls */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TodoList;

