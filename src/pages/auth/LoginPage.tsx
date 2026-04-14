const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h1 className="font-headline text-2xl font-bold text-center mb-6">Đăng nhập</h1>
        <form className="flex flex-col gap-4">
          <input type="email" placeholder="Email" className="p-3 border rounded-lg" />
          <input type="password" placeholder="Mật khẩu" className="p-3 border rounded-lg" />
          <button className="btn-primary py-3">Đăng nhập</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;