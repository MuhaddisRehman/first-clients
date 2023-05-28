import { TodoItem } from "@/components/TodoItem";
import { prisma } from "@/db";
import Link from "next/link";

const getTodos = () => {
  return prisma.todo.findMany();
};
async function toggleTodo(id: string, complete: boolean) {
  "use server";
  await prisma.todo.update({ where: { id }, data: { complete } });
}
export default async function Home() {
  // await prisma.todo.create({ data: { title: "test", complete: false } });
  const todos = await getTodos();
  return (
    <>
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none transition-all"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />;
        })}
      </ul>
    </>
  );
}
