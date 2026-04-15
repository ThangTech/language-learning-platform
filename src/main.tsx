import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import "./index.css";
import App from "./App";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import AdminDashboardPage from "./pages/dashboard/AdminDashboardPage";
import UserDashboardPage from "./pages/dashboard/UserDashboardPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import VocabularyPage from "./pages/vocabulary/VocabularyPage";
import GrammarPage from "./pages/grammar/GrammarPage";
import QuizPage from "./pages/quiz/QuizPage";
import ProgressPage from "./pages/ProgressPage";
import StreaksPage from "./pages/streak/StreaksPage";
import LeaderboardPage from "./pages/learderboard/LeaderboardPage";
import ProfilePage from "./pages/profile/ProfilePage";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import NotFoundPage from "./pages/error/NotFound";
import ErrorPage from "./pages/error/ErrorPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "courses",
        element: <CoursesPage />,
      },
      { path: "vocabulary", element: <VocabularyPage /> },
      { path: "grammar", element: <GrammarPage /> },
      { path: "quiz", element: <QuizPage /> },
      { path: "progress", element: <ProgressPage /> },
      { path: "streaks", element: <StreaksPage /> },
      {
        path: "leaderboard",
        element: <LeaderboardPage />,
      },
      { path: "profile", element: <ProfilePage /> },
      { path: "notifications", element: <NotificationsPage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <UserDashboardPage /> },
      { path: "user", element: <UserDashboardPage /> },
      {
        path: "admin",
        element: <AdminDashboardPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
], { basename: import.meta.env.BASE_URL });
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* StyleProvider layer: ép antd inject CSS vào @layer antd
        → Tailwind utilities sẽ thắng antd khi conflict */}
    <StyleProvider layer>
      <ConfigProvider>
        <RouterProvider router={router} />
      </ConfigProvider>
    </StyleProvider>
  </StrictMode>,
);
