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

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const portfolios = await getPortfolios(session.user.id);

  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      {/* <Navbar>
        <DropdownUser image={session.user.image}>
          <UserData name={session.user.name} email={session.user.email} />
        </DropdownUser>
      </Navbar>
      <Sidebar>
        <SidebarLinks portfolios={portfolios} />
      </Sidebar>
      {children}
      <BottomNavigation /> */}
      {children}
    </section>
  );
}
