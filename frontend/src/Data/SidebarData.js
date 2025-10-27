import { Users, FileText, Settings, ClipboardList } from "lucide-react";

export const SidebarMenus = {
  ADMIN: [
    { label: "Scholarship Management", Icon: FileText, path: "/admin" },
    { label: "User Management", Icon: Users, path: "/admin/students" },
    {
      label: "Application Management",
      Icon: Users,
      path: "/admin/applicationmanagement",
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
  ],
  COMMITTEE: [
    {
      label: "Pending Reviews",
      icon: ClipboardList,
      path: "/committee",
    },
    {
      label: "Approved Applications",
      icon: FileText,
      path: "/committee/approved",
    },
    { label: "Settings", Icon: Settings, path: "/committee/settings" },
  ],
};
