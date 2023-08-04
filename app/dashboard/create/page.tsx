import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div>
          <h1>Create Portfolio</h1>
          <form action="/api/dashboard/portfolio" method="post">
            <label htmlFor="name">Portfolio Name</label>
            <input type="text" id="name" name="name" required />

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
