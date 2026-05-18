import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h1 className="font-headline text-2xl font-bold text-center mb-6">Quên mật khẩu</h1>
        <form className="flex flex-col gap-4">
          <input type="email" placeholder="Nhập email của bạn" className="p-3 border rounded-lg" />
          <button className="btn-primary py-3">Gửi link đặt lại mật khẩu</button>
        </form>
        <div className="mt-4 flex items-center justify-between text-sm">
          <Link to="/login" className="text-primary hover:underline">Về đăng nhập</Link>
          <Link to="/register" className="text-primary hover:underline">Tạo tài khoản</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;