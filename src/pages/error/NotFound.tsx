import { Link } from "react-router-dom";
import { Button, Result } from 'antd';
const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Result
                status="404"
                title="404"
                subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
                extra={
                    <Button type="primary">
                        <Link to="/">Về trang chủ</Link>
                    </Button>
                }
            />
        </div>
    )
}
export default NotFoundPage;