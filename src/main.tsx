import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import './index.css';
import App from './App';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import AdminDashboardPage from './pages/dashboard/AdminDashboardPage';
import AdminUsersPage from './pages/dashboard/AdminUsersPage';
import UserDashboardPage from './pages/dashboard/UserDashboardPage';
import DashboardLayout from './components/layout/DashboardLayout';
import VocabularyPage from './pages/vocabulary/VocabularyPage';
import GrammarPage from './pages/grammar/GrammarPage';
import ListeningPage from './pages/listening/ListeningPage';
import LessonDetailPage from './pages/listening/LessonDetailPage';
import DictationPage from './pages/listening/DictationPage';
import QuizPage from './pages/quiz/QuizPage';
import ProgressPage from './pages/ProgressPage';
import StreaksPage from './pages/streak/StreaksPage';
import LeaderboardPage from './pages/learderboard/LeaderboardPage';
import ProfilePage from './pages/profile/ProfilePage';
import NotificationsPage from './pages/notifications/NotificationsPage';
import NotFoundPage from './pages/error/NotFound';
import ErrorPage from './pages/error/ErrorPage';
import SupportPage from './pages/support/SupportPage';
import ContactPage from './pages/contact/ContactPage';
import FAQPage from './pages/faq/FAQPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleRoute from './components/auth/RoleRoute';
import GuestRoute from './components/auth/GuestRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'courses',
        element: <CoursesPage />,
      },
      {
        path: 'support',
        element: <SupportPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'faq',
        element: <FAQPage />,
      },
    ],
  },
  {
    element: <GuestRoute />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: 'vocabulary', element: <VocabularyPage /> },
          { path: 'grammar', element: <GrammarPage /> },
          { path: 'listening', element: <ListeningPage /> },
          { path: 'listening/dictation/:id', element: <DictationPage /> },
          { path: 'listening/:id', element: <LessonDetailPage /> },
          { path: 'quiz', element: <QuizPage /> },
          { path: 'progress', element: <ProgressPage /> },
          { path: 'streaks', element: <StreaksPage /> },
          { path: 'leaderboard', element: <LeaderboardPage /> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'notifications', element: <NotificationsPage /> },
          { path: 'dashboard', element: <UserDashboardPage /> },
          { path: 'dashboard/user', element: <UserDashboardPage /> },
        ],
      },
      {
        element: <RoleRoute roles={['Admin']} />,
        children: [
          { path: 'dashboard/admin', element: <AdminDashboardPage /> },
          { path: 'dashboard/admin/users', element: <AdminUsersPage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
], { basename: import.meta.env.BASE_URL });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyleProvider layer>
      <ConfigProvider>
        <RouterProvider router={router} />
      </ConfigProvider>
    </StyleProvider>
  </StrictMode>,
);
