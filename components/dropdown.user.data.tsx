import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function UserData() {
  const session = await getServerSession(authOptions);

  return (
    <div className="px-4 py-3" role="none">
      <p className="text-sm text-gray-900 dark:text-white" role="none">
        {session?.user?.name}
      </p>
      <p
        className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
        role="none"
      >
        {session?.user?.email}
      </p>
    </div>
  );
}
