
import { NavLink, useLocation } from "react-router-dom";
import { Home, Upload, Clock, Heart, HeartPulse } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Upload Image", url: "/upload", icon: Upload },
  { title: "History", url: "/history", icon: Clock },
  { title: "About", url: "/about", icon: HeartPulse },
];

export function DashboardSidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-medical-blue text-primary font-medium"
      : "hover:bg-muted/50 transition-colors";

  return (
    <Sidebar
      className={`border-r ${collapsed ? "w-14" : "w-64"}`}
      collapsible
    >
      <div className={`mb-4 p-4 flex items-center justify-center border-b ${collapsed ? 'px-2' : ''}`}>
        {collapsed ? (
          <Heart className="h-6 w-6 text-medical-abnormal" />
        ) : (
          <div className="flex flex-col items-center">
            <Heart className="h-8 w-8 text-medical-abnormal" />
            <h1 className="mt-2 text-base font-semibold">CHD Classifier</h1>
          </div>
        )}
      </div>

      <SidebarContent>
        <SidebarGroup defaultOpen>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="mr-2 h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <div className="mt-auto p-3">
        <SidebarTrigger className="w-full flex justify-center" />
      </div>
    </Sidebar>
  );
}
