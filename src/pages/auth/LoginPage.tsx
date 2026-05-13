import { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Input, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import type { AxiosError } from 'axios';
import backgroundImg from '../../assets/background.jpg';
import { login } from '../../services/auth';

type LoginFormValues = {
  username: string;
  password: string;
  remember?: boolean;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const result = await login({
        email: values.username,
        password: values.password,
      });

      if (result.success) {
        message.success('Đăng nhập thành công!');
        navigate('/');
        return;
      }

      message.error(result.message || 'Đăng nhập thất bại');
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      const msg = err.response?.data?.message || 'Lỗi kết nối';
      const lower = msg.toLowerCase();

      if (lower.includes('not found') || lower.includes('không tồn tại') || lower.includes('tài khoản')) {
        message.error('Tài khoản chưa tồn tại');
        return;
      }

      if (lower.includes('password') || lower.includes('mật khẩu') || lower.includes('invalid credential')) {
        message.error('Sai mật khẩu');
        return;
      }

      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen">
      <div
        className="hidden md:flex flex-1 flex-col justify-end p-10 relative"
        style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#004ac6]/90 30%, from-[#004ac6]/30 to-transparent" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-xs border border-white/20 bg-white/10 text-[#a8d8ea]">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#a8d8ea" strokeWidth="1.5">
              <path d="M8 2L3 4.5V9c0 2.8 2.2 4.8 5 5.5 2.8-.7 5-2.7 5-5.5V4.5L8 2z" />
            </svg>
            Học tiếng Anh hiệu quả
          </div>
          <h1
            className="text-white text-3xl font-semibold leading-snug mb-3"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Nâng cao kỹ năng nghe tiếng Anh
          </h1>
          <p className="text-sm leading-relaxed text-white/60">
            Luyện nghe với bài học chất lượng cao, phù hợp mọi trình độ.
          </p>
        </div>
      </div>

      <div className="w-full md:w-[480px] bg-white flex flex-col justify-center px-8 py-10">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
              <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
              <path d="M12 8v8M8 12h8" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-medium text-on-surface">Language Learning</div>
            <div className="text-xs text-on-surface-variant">Nền tảng học tiếng Anh</div>
          </div>
        </div>

        <h2 className="text-xl font-medium text-on-surface mb-1">Đăng nhập</h2>
        <p className="text-sm text-on-surface-variant mb-6">Chào mừng trở lại, vui lòng đăng nhập</p>

        <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" size="middle" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="middle" />
          </Form.Item>

          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              </Form.Item>
              <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                Quên mật khẩu?
              </Link>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button
              block
              htmlType="submit"
              loading={loading}
              className="!bg-primary !border-primary !text-white !font-medium"
            >
              Đăng nhập
            </Button>
            <div className="text-center mt-3 text-xs text-on-surface-variant">
              hoặc{' '}
              <Link to="/register" className="text-primary hover:underline">
                Đăng ký
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
