import type { ISidebar } from "@/types/sidebar.type";

export const sidebarData: ISidebar[] = [
  // {
  //   id: "Dashboard",
  //   title: "Dashboard",
  //   icon: "pieChart",
  //   link: "/",
  // },
  {
    id: "featured_category_management",
    title: "Feature Management",
    icon: "atom",
    link: "/feature-management",
  },
  {
    id: "domain_management",
    title: "Category Management",
    icon: "cog",
    link: "/category-management",
  },
  {
    id: "referral_and_gifts",
    title: "Referral Management",
    icon: "badgePercent",
    link: "/referral-management",
  },
  {
    id: "admin_user_management",
    title: "Admin User Management",
    icon: "userAdmin",
    link: "/admin-user-management",
  },
  {
    id: "roles_management",
    title: "Role Management",
    icon: "users",
    link: "/role-management",
  },
  {
    id: "course_management",
    title: "Course Management",
    icon: "packageCheck",
    link: "/course-management",
  },
  {
    id: "application_user_management",
    title: "App User Management",
    icon: "user",
    link: "/app-user-management",
  },
  {
    id: "insight_management",
    title: "Insight Management",
    icon: "radar",
    link: "/insight-management",
  },
  {
    id: "banners_management",
    title: "Banner Management",
    icon: "appWindow",
    link: "/banner-management",
  },
  {
    id: "subscription_management",
    title: "Subscription Management",
    icon: "layers",
    link: "/subscription-management",
  },
  {
    id: "payment_management",
    title: "Payment Management",
    icon: "dollar",
    link: "/payment-management",
  },
  {
    id: "static_content_management",
    title: "Static Management",
    icon: "fileText",
    link: "/static-management",
  },
];
