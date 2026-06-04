"use client";
import {
  Archive,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Terminal,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
// Import hooks and methods from your Better-Auth config
import { useSession, signOut } from "@/lib/auth/client";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch real-time authentication state
  const { data: sessionData, isPending } = useSession();
  const userData = sessionData?.user;

  // Navigation schema for the workspace configuration
  const navItems = [
    {
      name: "Dev Logs",
      href: "/dashboard/dev-logs",
      icon: LayoutDashboard,
    },
    {
      name: "Archived Logs",
      href: "/dashboard/archive-logs",
      icon: Archive,
    },
    {
      name: "Settings",
      href: "/dashboard/system-setting",
      icon: Settings,
    },
  ];

  // Securely trigger termination of session context
  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login");
        },
      },
    });
  };

  return (
    <>
      {/* Mobile Header Global Navigation Node */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">DevLog</h1>
          <p className="text-xs text-gray-500">Workspace Dashboard</p>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-gray-50 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Backdrop Mask Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Permanent Layout Workspace Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
        aria-label="Main navigation"
      >
        {/* Core System Branding & Hardware Identifiers */}
        <div className="flex items-center gap-2.5 border-b border-gray-200 px-4 py-4">
          <div className="p-1.5 bg-zinc-900 border border-zinc-800 flex-shrink-0">
            <Terminal size={18} className="stroke-[2.5] text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold select-none text-gray-900">
              DevLog
            </h1>
            <span className="text-[9px] font-bold block leading-none text-gray-500">
              Host node: TTY_01
            </span>
          </div>
        </div>

        {/* Primary Operational Tree View Controls */}
        <nav className="flex-1 p-4" aria-label="Primary navigation">
          <ul className="space-y-2" role="list">
            {navItems.map((item) => {
              // Accurate match handling matching absolute nested branches
              const isActive = pathname.startsWith(item.href);
              return (
                <li key={item.href} role="listitem">
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                      isActive
                        ? "bg-black text-white font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <item.icon size={20} aria-hidden="true" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Interactive Identity Management Segment */}
        <footer className="p-4 border-t border-gray-200 flex flex-col gap-2 bg-gray-50/50">
          {isPending ? (
            /* Component State Hydration Skeleton Placeholder */
            <div className="flex items-center gap-3 px-4 py-2 animate-pulse">
              <div className="w-8 h-8 bg-gray-200 rounded-full shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="h-3 w-20 bg-gray-200" />
                <div className="h-2 w-28 bg-gray-200" />
              </div>
            </div>
          ) : (
            /* Authenticated Context Identity Badge (Useful for mobile responsive drawers) */
            <div className="flex items-center gap-3 px-4 py-2 mb-1">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-gray-300">
                {userData?.image ? (
                  <img
                    src={userData.image}
                    alt={userData.name || "Profile"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={16} className="text-gray-600" />
                )}
              </div>
              <div className="text-xs truncate max-w-[140px]">
                <p className="font-semibold text-gray-900 truncate">
                  {userData?.name || "Developer"}
                </p>
                <p className="text-gray-500 text-[10px] truncate">
                  {userData?.email || "dev@example.com"}
                </p>
              </div>
            </div>
          )}

          {/* Explicit Authentication Exit Sequence Dispatcher */}
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} aria-hidden="true" />
            <span>Logout</span>
          </button>
        </footer>
      </aside>
    </>
  );
};

export default DashboardSidebar;