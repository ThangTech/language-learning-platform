import { Link } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';

interface ForgotPasswordFormValues {
  email: string;
}

const ForgotPasswordPage = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (_values: ForgotPasswordFormValues) => {
    message.success('Đã gửi link đặt lại mật khẩu.');
    form.resetFields();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h1 className="font-headline text-2xl font-bold text-center mb-6">Quên mật khẩu</h1>
        <Form form={form} layout="vertical" requiredMark={false} onFinish={handleSubmit}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' },
            ]}
          >
            <Input type="email" placeholder="Nhập email của bạn" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Gửi link đặt lại mật khẩu
          </Button>
        </Form>
        <div className="mt-4 flex items-center justify-between text-sm">
          <Link to="/login" className="text-primary hover:underline">Về đăng nhập</Link>
          <Link to="/register" className="text-primary hover:underline">Tạo tài khoản</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
