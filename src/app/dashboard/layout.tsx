import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen bg-white">
      <DashboardSidebar />
      <section className="flex-1 lg:ml-64 pt-16 lg:pt-0 overflow-auto">
        <DashboardHeader/>
        <div className="p-4 md:p-6">
          {children}
        </div>
      </section>
    </main>
  );
}
