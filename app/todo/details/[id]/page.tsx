"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
};

export default function DetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      const todos: Todo[] = JSON.parse(savedTodos);
      const found = todos.find((t) => t.id === id);
      setTodo(found || null);
    }
  }, [id]);

  if (!todo) {
    return (
      <section className="flex flex-col items-center min-h-screen py-10">
        <p className="text-red-500">Task not found</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center min-h-screen py-10 space-y-4">
      <p>
        <strong>Task:</strong> {todo.text}
      </p>
      <p>
        <strong>Status:</strong> {todo.completed ? "Completed" : "Pending"}
      </p>
      <p>
        <strong>Completed At:</strong>{" "}
        {todo.completedAt
          ? new Date(todo.completedAt).toLocaleString()
          : "Not completed yet"}
      </p>
    </section>
  );
}
