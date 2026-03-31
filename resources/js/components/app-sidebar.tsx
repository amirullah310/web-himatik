"use client";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Link, usePage } from "@inertiajs/react";
import {
  Album,
  BookOpenText,
  Building2,
  CalendarRange,
  ClipboardList,
  FileText,
  Folder,
  Layers,
  LayoutGrid,
  User2,
  UserCog,
} from "lucide-react";
import AppSidebarBranding from "./app-sidebar-branding";

// 🗂️ Daftar menu utama (sinkron dengan permission seeder)
const mainNavItems = [
  {
    title: "Platform",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutGrid, permission: "dashboard" },
      { title: "Roles", href: "/roles", icon: UserCog, permission: "roles" },
      { title: "Permissions", href: "/permissions", icon: ClipboardList, permission: "permissions" },
    ],
  },
  {
    title: "Kepengurusan",
    items: [
      { title: "Periode", href: "/periods", icon: CalendarRange, permission: "periods" },
      { title: "Division", href: "/divisions", icon: Layers, permission: "divisions" },
      { title: "Members", href: "/members", icon: User2, permission: "members" },
      { title: "Structure", href: "/structures", icon: Building2, permission: "structures" },
      // kalau mau tampilkan structure member juga
      { title: "Structure Members", href: "/structure-members", icon: User2, permission: "structure-members" },
      // { title: "Division Plans", href: "/division-plans", icon: ClipboardList, permission: "division-plans" },
    ],
  },
  {
    title: "Media",
    items: [
      // { title: "Gallery", href: "/gallery-album", icon: Album, permission: "gallery-album" },
      {
        title: "Blog",
        href: "/articles",
        icon: BookOpenText,
        permission: "articles", // induknya pakai articles
        children: [
          { title: "Category", href: "/category-articles", icon: Folder, permission: "category-articles" },
          { title: "Articles", href: "/articles", icon: FileText, permission: "articles" },
        ],
      },
    ],
  },
];

export function AppSidebar() {
  const { url, props } = usePage();
  const permissions: string[] = props.auth?.permissions || [];

  // ✅ fungsi helper untuk cek permission
  const can = (permission?: string) =>
    !permission || permissions.includes(permission);

  // 🔥 Buka semua group secara default
  const defaultOpenGroups = mainNavItems.map((_, i) => `group-${i}`);

  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      className="border-r bg-gradient-to-b from-background/80 to-background/50 backdrop-blur-xl"
    >
      {/* Branding */}
      <AppSidebarBranding />

      {/* Navigation */}
      <SidebarContent className="px-3 py-4">
        <Accordion
          type="multiple"
          defaultValue={defaultOpenGroups}
          className="w-full space-y-3"
        >
          {mainNavItems.map((group, i) => {
            // filter item berdasarkan permission
            const visibleItems = group.items.filter((item) => can(item.permission));

            if (visibleItems.length === 0) return null; // jangan render group kosong

            return (
              <AccordionItem key={i} value={`group-${i}`} className="border-none">
                <AccordionTrigger className="text-xs uppercase tracking-wider text-muted-foreground hover:no-underline">
                  {group.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="mt-2 space-y-1">
                    {visibleItems.map((item, j) => {
                      const isActive = url.startsWith(item.href);

                      // sub menu di-filter juga
                      const childItems = item.children?.filter((child) =>
                        can(child.permission)
                      );

                      return (
                        <li key={j}>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                              "hover:bg-accent/80 hover:text-accent-foreground",
                              isActive && "bg-accent text-accent-foreground shadow-sm"
                            )}
                          >
                            <item.icon
                              className={cn(
                                "h-4 w-4 transition-colors",
                                isActive
                                  ? "text-accent-foreground"
                                  : "text-muted-foreground"
                              )}
                            />
                            <span>{item.title}</span>
                          </Link>

                          {/* Sub menu */}
                          {childItems && childItems.length > 0 && (
                            <ul className="ml-6 mt-1 space-y-1 border-l border-border/40 pl-3">
                              {childItems.map((child, k) => {
                                const isChildActive = url.startsWith(child.href);
                                return (
                                  <li key={k}>
                                    <Link
                                      href={child.href}
                                      className={cn(
                                        "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors",
                                        "hover:bg-muted/60 hover:text-foreground",
                                        isChildActive &&
                                          "bg-accent text-accent-foreground shadow-sm"
                                      )}
                                    >
                                      <child.icon
                                        className={cn(
                                          "h-4 w-4",
                                          isChildActive
                                            ? "text-accent-foreground"
                                            : "text-muted-foreground"
                                        )}
                                      />
                                      <span>{child.title}</span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t px-2 py-4">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
