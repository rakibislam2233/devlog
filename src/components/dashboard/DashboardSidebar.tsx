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
import { usePathname } from "next/navigation";
import { useState } from "react";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">DevLog</h1>
          <p className="text-xs text-gray-500">Workspace Dashboard</p>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2  hover:bg-gray-50 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
        aria-label="Main navigation"
      >
        {/* Logo/Brand */}
        <div className="flex items-center gap-2.5 border-b border-gray-200 px-4 py-4">
          <div className="p-1.5 bg-zinc-900 border border-zinc-800 -none flex-shrink-0">
            <Terminal size={18} className="stroke-[2.5] text-white" />
          </div>
          <div>
            <h1 className="text-sm tracking-wider font-bold select-none uppercase text-gray-900">
              DEVLOG
            </h1>
            <span className="text-[9px] font-bold block leading-none text-gray-500">
              HOST_NODE: TTY_01
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4" aria-label="Primary navigation">
          <ul className="space-y-2" role="list">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href} role="listitem">
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors  ${
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

        {/*Logout */}
        <footer className="p-4 border-t border-gray-200">
          <Link
            href="/auth/login"
            className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50  transition-colors"
          >
            <LogOut size={20} aria-hidden="true" />
            <span>Logout</span>
          </Link>
        </footer>
      </aside>
    </>
  );
};

export default DashboardSidebar;
