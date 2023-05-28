import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createTodo(data: FormData) {
  "use server";
  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length < 0) {
    throw new Error("Invalid Title");
  }
  await prisma.todo.create({ data: { title: title, complete: false } });
  redirect("/");
}

function Page() {
  return (
    <>
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl">New</h1>
      </header>
      <form action={createTodo} className="flex gap-2 flex-col">
        <input
          type="text"
          name="title"
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded bg-transparent outline-none transition-all"
        />
        <div className="flex gap-1 justify-end">
          <Link
            href=".."
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none transition-all"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}

export default Page;
