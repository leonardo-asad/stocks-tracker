import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import BottomNavigation from "@/components/bottom.navigation";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <Navbar />
      <Sidebar />

      {children}
      <BottomNavigation />
    </section>
  );
}
