import AddToDo from "@/page-component/AddTodo";

function TodoPage() {
  return (
    <section className="flex flex-col items-center min-h-screen py-2">
      <h1 className="text-7xl">ToDo List</h1>
      <AddToDo />
    </section>
  );
}
export default TodoPage;
