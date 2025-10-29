import { Users, FileText, Settings, ClipboardList, FileCheck } from "lucide-react";

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
      label: "Assigned Applications",
      Icon: ClipboardList,
      path: "/committee",
    },

    { label: "Evaluated Applications", Icon: FileCheck, path: "/committee/evaluated" },
  ],
};
