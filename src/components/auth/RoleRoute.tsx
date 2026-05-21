import { Navigate, Outlet } from 'react-router-dom';
import { getToken, getUser } from '../../services/auth';

interface RoleRouteProps {
  roles: string[];
}

const RoleRoute = ({ roles }: RoleRouteProps) => {
  const token = getToken();
  const user = getUser();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const role = user?.role?.toLowerCase();
  const allow = roles.some((item) => item.toLowerCase() === role);

  if (!allow) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
