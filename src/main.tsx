import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import "./index.css";
import App from "./App";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div className="p-8">Lỗi trang</div>,
    children: [
      { index: true, element: <div className="p-8">Home Page</div> },
      {
        path: "courses",
        element: <div className="p-8">Danh sách khóa học</div>,
      },
      { path: "vocabulary", element: <div className="p-8">Từ vựng</div> },
      { path: "grammar", element: <div className="p-8">Ngữ pháp</div> },
      { path: "quiz", element: <div className="p-8">Làm quiz</div> },
      { path: "progress", element: <div className="p-8">Tiến độ học tập</div> },
      { path: "streaks", element: <div className="p-8">Streaks</div> },
      {
        path: "leaderboard",
        element: <div className="p-8">Bảng xếp hạng</div>,
      },
      { path: "profile", element: <div className="p-8">Hồ sơ cá nhân</div> },
      { path: "notifications", element: <div className="p-8">Thông báo</div> },
    ],
  },
  {
    path: "/login",
    element: (
      <div className="min-h-screen flex items-center justify-center">
        Đăng nhập
      </div>
    ),
  },
  {
    path: "/register",
    element: (
      <div className="min-h-screen flex items-center justify-center">
        Đăng ký
      </div>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <div className="min-h-screen flex items-center justify-center">
        Quên mật khẩu
      </div>
    ),
  },
  {
    path: "/dashboard",
    element: <App />,
    children: [
      { index: true, element: <div className="p-8">Dashboard</div> },
      { path: "admin", element: <div className="p-8">Admin Dashboard</div> },
    ],
  },
  {
    path: "*",
    element: <div className="p-8">Không tìm thấy trang</div>,
  },
]);
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