import {
  Users,
  FileText,
  ClipboardList,
  FileCheck,
  LayoutDashboard,
} from "lucide-react";

export const SidebarMenus = {
  ADMIN: [
    { label: "Scholarship Management", Icon: FileText, path: "/admin" },
    { label: "User Management", Icon: Users, path: "/admin/students" },
    {
      label: "Application Management",
      Icon: Users,
      path: "/admin/applicationmanagement",
    },
    {
      label: "Admin Dashboard",
      Icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
  ],
  STUDENT: [
    {
      label: "Available Scholarships",
      Icon: FileText,
      path: "/student",
    },
    {
      label: "My Applications",
      Icon: ClipboardList,
      path: "/student/applications",
    },
    { label: "Profile", Icon: Users, path: "/student/profile" },
    {
      label: "Student Dashboard",
      Icon: LayoutDashboard,
      path: "/student/dashboard",
    },
  ],
  COMMITTEE: [
    {
      label: "Assigned Applications",
      Icon: ClipboardList,
      path: "/committee",
    },

    {
      label: "Evaluated Applications",
      Icon: FileCheck,
      path: "/committee/evaluated",
    },
    {
      label: "Committee Dashboard",
      Icon: LayoutDashboard,
      path: "/committee/dashboard",
    },
  ],
};
