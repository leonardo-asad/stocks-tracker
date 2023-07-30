import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import BottomNavigation from "@/components/bottom.navigation";
import { DropdownUser } from "@/components/dropdown.user";
import { UserData } from "@/components/dropdown.user.data";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <Navbar>
        <DropdownUser>
          <UserData />
        </DropdownUser>
      </Navbar>
      <Sidebar />
      {children}
      <BottomNavigation />
    </section>
  );
}
