/* eslint-disable react-refresh/only-export-components */
import { PageLoader } from "@/components/loader/page-loader";
import AccessLayout from "@/layout/access-layout";
import AuthLayout from "@/layout/auth-layout";
import MainLayout from "@/layout/main-layout";
import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorScreen from "./error/error-screen";

const AdminUserManagementScreen = lazy(
  () => import("./admin-user-management/admin-user-management-screen"),
);
const AppUserManagementScreen = lazy(
  () => import("./app-user-management/app-user-management-screen"),
);
const ForgotPasswordScreen = lazy(
  () => import("./auth/forgot-password-screen"),
);
const BannerManagementScreen = lazy(
  () => import("./banner-management/banner-management-screen"),
);

// Course Management
const CourseManagementScreen = lazy(
  () => import("./course-management/course-management-screen"),
);
const CourseManagementAddScreen = lazy(
  () => import("./course-management/course-management-add-screen"),
);
const CourseManagementAssessmentScreen = lazy(
  () => import("./course-management/course-management-assessment-screen"),
);
const CourseManagementAnnouncementScreen = lazy(
  () => import("./course-management/course-management-announcement-screen"),
);
const CourseManagementCurriculumScreen = lazy(
  () => import("./course-management/course-management-curriculum-screen"),
);
const CourseManagementEditScreen = lazy(
  () => import("./course-management/course-management-edit-screen"),
);
const CourseManagementResourceScreen = lazy(
  () => import("./course-management/course-management-resource-screen"),
);
const CourseManagementViewScreen = lazy(
  () => import("./course-management/course-management-view-screen"),
);

const DashboardScreen = lazy(() => import("./dashboard/dashboard-screen"));
const CategoryManagementScreen = lazy(
  () => import("./category-management/category-management-screen"),
);
const FeatureManagementScreen = lazy(
  () => import("./feature-management/feature-management-screen"),
);
// Insight Management
const InsightManagementScreen = lazy(
  () => import("./insight-management/insight-management-screen"),
);
const InsightManagementAddScreen = lazy(
  () => import("./insight-management/insight-management-add-screen"),
);
const InsightManagementEditScreen = lazy(
  () => import("./insight-management/insight-management-edit-screen"),
);
const InsightManagementViewScreen = lazy(
  () => import("./insight-management/insight-management-view-screen"),
);
// Payment Management
const PaymentManagementScreen = lazy(
  () => import("./payment-management/payment-management-screen"),
);
const ReferralManagementScreen = lazy(
  () => import("./referral-management/referral-management-screen"),
);
const LoginScreen = lazy(() => import("./auth/login-screen"));
const SubscriptionManagementScreen = lazy(
  () => import("./subscription-management/subscription-management-screen"),
);
const StaticManagementScreen = lazy(
  () => import("./static-management/static-management-screen"),
);
// Role Management
const RoleManagementScreen = lazy(
  () => import("./role-management/role-management-screen"),
);
const RoleManagementAddScreen = lazy(
  () => import("./role-management/role-management-add-screen"),
);
const RoleManagementEditScreen = lazy(
  () => import("./role-management/role-management-edit-screen"),
);
const RoleManagementViewScreen = lazy(
  () => import("./role-management/role-management-view-screen"),
);

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<PageLoader />}>
            <LoginScreen />
          </Suspense>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ForgotPasswordScreen />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorScreen />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <DashboardScreen />
          </Suspense>
        ),
      },
      {
        path: "feature-management",
        element: (
          <AccessLayout access="featured_category_management" type="view">
            <Suspense fallback={<PageLoader />}>
              <FeatureManagementScreen />
            </Suspense>
          </AccessLayout>
        ),
      },
      {
        path: "category-management",
        element: (
          <AccessLayout access="domain_management" type="view">
            <Suspense fallback={<PageLoader />}>
              <CategoryManagementScreen />
            </Suspense>
          </AccessLayout>
        ),
      },
      {
        path: "referral-management",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ReferralManagementScreen />
          </Suspense>
        ),
      },
      {
        path: "admin-user-management",
        element: (
          <AccessLayout access="admin_user_management" type="view">
            <Suspense fallback={<PageLoader />}>
              <AdminUserManagementScreen />
            </Suspense>
          </AccessLayout>
        ),
      },
      {
        path: "role-management",
        element: (
          <AccessLayout access="roles_management" type="view">
            <Suspense fallback={<PageLoader />}>
              <RoleManagementScreen />
            </Suspense>
          </AccessLayout>
        ),
      },
      {
        path: "role-management/add",
        element: (
          <AccessLayout access="roles_management" type="add">
            <Suspense fallback={<PageLoader />}>
              <RoleManagementAddScreen />
            </Suspense>
          </AccessLayout>
        ),
      },
      {
        path: "role-management/:id/edit",
        element: (
          <AccessLayout access="roles_management" type="update">
            <Suspense fallback={<PageLoader />}>
              <RoleManagementEditScreen />
            </Suspense>
          </AccessLayout>
        ),
      },
      {
        path: "role-management/:id/view",
        element: (
          <AccessLayout access="roles_management" type="view">
            <Suspense fallback={<PageLoader />}>
              <RoleManagementViewScreen />
            </Suspense>
          </AccessLayout>
        ),
      },
      {
        path: "course-management",
        element: (
          <AccessLayout access="course_management" type="view">
            <Suspense fallback={<PageLoader />}>
              <CourseManagementScreen />
            </Suspense>
          </AccessLayout>
        ),
      },
      {
        path: "course-management/add",
        element: (
          <AccessLayout access="course_management" type="add">
            <Suspense fallback={<PageLoader />}>
              <CourseManagementAddScreen />
            </Suspense>
          </AccessLayout>
        ),
      },
      {
        path: "course-management/:id/assessment",
        element: (
          <AccessLayout access="course_management" type="course_assessment">
            <Suspense fallback={<PageLoader />}>
              <CourseManagementAssessmentScreen />
            </Suspense>
          </AccessLayout>
        ),
      },
      {
        path: "course-management/:id/curriculum",
        element: (
          <AccessLayout access="course_management" type="curriculum">
            <Suspense fallback={<PageLoader />}>
              <CourseManagementCurriculumScreen />
            </Suspense>
          </AccessLayout>
        ),
      },
      {
        path: "course-management/:id/edit",
        element: (
          <AccessLayout access="course_management" type="update">
            <Suspense fallback={<PageLoader />}>
              <CourseManagementEditScreen />
            </Suspense>
          </AccessLayout>
        ),
      },
      {
        path: "course-management/:id/resource",
        element: (
          <AccessLayout access="course_management" type="resources">
            <Suspense fallback={<PageLoader />}>
              <CourseManagementResourceScreen />
            </Suspense>
          </AccessLayout>
        ),
      },
      {
        path: "course-management/:id/announcement",
        element: (
          <AccessLayout access="course_management" type="annoucements">
            <Suspense fallback={<PageLoader />}>
              <CourseManagementAnnouncementScreen />
            </Suspense>
          </AccessLayout>
        ),
      },
      {
        path: "course-management/:id/view",
        element: (
          <AccessLayout access="course_management" type="view">
            <Suspense fallback={<PageLoader />}>
              <CourseManagementViewScreen />
            </Suspense>
          </AccessLayout>
        ),
      },
      {
        path: "app-user-management",
        element: (
          <AccessLayout access="application_user_management" type="view">
            <Suspense fallback={<PageLoader />}>
              <AppUserManagementScreen />
            </Suspense>
          </AccessLayout>
        ),
      },
      {
        path: "insight-management",
        element: (
          <AccessLayout access="insight_management" type="view">
            <Suspense fallback={<PageLoader />}>
              <InsightManagementScreen />
            </Suspense>
          </AccessLayout>
        ),
      },
      {
        path: "insight-management/add",
        element: (
          <AccessLayout access="insight_management" type="add">
            <Suspense fallback={<PageLoader />}>
              <InsightManagementAddScreen />
            </Suspense>
          </AccessLayout>
        ),
      },
      {
        path: "insight-management/:id/edit",
        element: (
          <AccessLayout access="insight_management" type="update">
            <Suspense fallback={<PageLoader />}>
              <InsightManagementEditScreen />
            </Suspense>
          </AccessLayout>
        ),
      },
      {
        path: "insight-management/:id/view",
        element: (
          <AccessLayout access="insight_management" type="view">
            <Suspense fallback={<PageLoader />}>
              <InsightManagementViewScreen />
            </Suspense>
          </AccessLayout>
        ),
      },
      {
        path: "banner-management",
        element: (
          <AccessLayout access="banners_management" type="view">
            <Suspense fallback={<PageLoader />}>
              <BannerManagementScreen />
            </Suspense>
          </AccessLayout>
        ),
      },
      {
        path: "subscription-management",
        element: (
          <AccessLayout access="subscription_management" type="view">
            <Suspense fallback={<PageLoader />}>
              <SubscriptionManagementScreen />
            </Suspense>
          </AccessLayout>
        ),
      },
      {
        path: "payment-management",
        element: (
          <AccessLayout access="payment_management" type="view">
            <Suspense fallback={<PageLoader />}>
              <PaymentManagementScreen />
            </Suspense>
          </AccessLayout>
        ),
      },
      {
        path: "static-management",
        element: (
          <Suspense fallback={<PageLoader />}>
            <StaticManagementScreen />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
