import { Result, Button } from "antd";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error: unknown = useRouteError();
    console.log(error);
    let message = "Đã có lỗi xảy ra";
    if (error instanceof Error) {
        message = error.message;
    }
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Result
                status="500"
                title="Oops!"
                subTitle={message}
                extra={<Button type="primary" onClick={() => window.location.reload()}>Thử lại</Button>}
            />
        </div>
    );
}
export default ErrorPage;