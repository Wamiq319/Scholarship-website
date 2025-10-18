  import { Users, FileText, Settings, ClipboardList } from "lucide-react";

  export const SidebarMenus = {
    ADMIN: [
      { label: "Scholarships", icon: FileText, path: "/admin" },
      { label: "Manage Students", icon: Users, path: "/admin/students" },
    ],
    STUDENT: [
      {
        label: "Available Scholarships",
        icon: FileText,
        path: "/student",
      },
      {
        label: "My Applications",
        icon: ClipboardList,
        path: "/student/applications",
      },
      { label: "Profile", icon: Users, path: "/student/profile" },
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
      { label: "Settings", icon: Settings, path: "/committee/settings" },
    ],
  };
