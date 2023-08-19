import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import BottomNavigation from "@/components/bottom.navigation";
import { DropdownUser } from "@/components/dropdown.user";
import { UserData } from "@/components/dropdown.user.data";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getPortfolios } from "@/lib/portfolio";
import { SidebarLinks } from "@/components/sidebar.links";
import { Search } from "@/components/search";
import PortfolioSwitcher from "@/components/portfolio-switcher";
import { UserNav } from "@/components/user-nav";
import { MainNav } from "@/components/main-nav";
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

  //console.log("Session: ", session);

  const portfolios = await getPortfolios(session.user.id);

  return (
    <section>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <PortfolioSwitcher portfolios={portfolios} />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
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
