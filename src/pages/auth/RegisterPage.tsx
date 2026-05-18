import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Select, message } from 'antd';
import backgroundImg from '../../assets/background.jpg';
import { register } from '../../services/auth';

const ROLES = [
  { value: 'Beginner', label: 'Người mới bắt đầu' },
  { value: 'Intermediate', label: 'Trung cấp' },
  { value: 'Advanced', label: 'Nâng cao' },
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { TenDangNhap: string; Email: string; VaiTro: string; MatKhau: string }) => {
    setLoading(true);
    try {
      const result = await register({
        fullName: values.TenDangNhap,
        email: values.Email,
        password: values.MatKhau,
      });

      if (result.success) {
        message.success('Đăng ký thành công');
        navigate('/login');
        return;
      }

      message.error(result.message || 'Đăng ký thất bại');
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Không thể đăng ký');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen">
    <div
      className="hidden md:flex flex-1 flex-col justify-end p-10 relative"
      style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#004ac6]/90 30%, from-[#004ac6]/30 to-transparent" />
      <div className="relative z-10">
        <h1 className="text-white text-3xl font-semibold leading-snug mb-3" style={{ fontFamily: 'var(--font-headline)' }}>
          Tham gia cùng<br />chúng tôi
        </h1>
        <p className="text-sm leading-relaxed text-white/60">
          Học tiếng Anh với đội ngũ giáo viên<br />chuyên nghiệp và nội dung chất lượng.
        </p>
      </div>
    </div>

    <div className="w-full md:w-[480px] bg-white flex flex-col justify-center px-8 py-10">
      <h2 className="text-xl font-medium text-on-surface mb-1">Tạo tài khoản</h2>
      <p className="text-sm text-on-surface-variant mb-6">Điền đầy đủ thông tin để đăng ký</p>

      <Form layout="vertical" requiredMark={false} onFinish={onFinish}>
        <Form.Item name="TenDangNhap" label="Tên đăng nhập" rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}>
          <Input placeholder="vd: nguyen_van_a" />
        </Form.Item>

        <Form.Item
          name="Email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input placeholder="vd: example@email.com" type="email" />
        </Form.Item>

        <Form.Item name="VaiTro" label="Trình độ" rules={[{ required: true, message: "Vui lòng chọn trình độ" }]}>
          <Select placeholder="Chọn trình độ" options={ROLES} />
        </Form.Item>

        <Form.Item name="MatKhau" label="Mật khẩu" rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }, { min: 6, message: "Tối thiểu 6 ký tự" }]}>
          <Input.Password placeholder="Tối thiểu 6 ký tự" />
        </Form.Item>

        <Form.Item
          name="XacNhan"
          label="Xác nhận mật khẩu"
          dependencies={["MatKhau"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("MatKhau") === value) return Promise.resolve();
                return Promise.reject(new Error("Mật khẩu không khớp"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu" />
        </Form.Item>

        <Form.Item>
          <Button
            block
            htmlType="submit"
            loading={loading}
            className="!bg-primary !border-primary !text-white !font-medium"
          >
            Đăng ký
          </Button>
          <div className="text-center mt-3 text-xs text-on-surface-variant">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-primary hover:underline">Đăng nhập</Link>
          </div>
        </Form.Item>
        <div className="mt-4 flex items-center justify-between text-xs text-on-surface-variant">
          <Link to="/" className="hover:text-primary hover:underline">Về trang chủ</Link>
          <Link to="/listening" className="hover:text-primary hover:underline">Xem Listening</Link>
        </div>
      </Form>
    </div>
  </div>
  );
};

export default RegisterPage;