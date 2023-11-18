import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserNav } from "@/components/user-nav";
import { Suspense } from "react";
import Loading from "./loading";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <section>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-xl font-bold tracking-widest">
              Stock Investments
            </h1>
            <div className="ml-auto flex items-center space-x-4">
              <UserNav
                image={session.user.image}
                email={session.user.email}
                firstName={session.user.firstName}
                lastName={session.user.lastName}
              />
            </div>
          </div>
        </div>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </section>
  );
}
