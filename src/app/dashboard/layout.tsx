import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto lg:ml-0 pt-16 lg:pt-0">
        <DashboardHeader/>
        {children}
      </main>
    </div>
  );
}
