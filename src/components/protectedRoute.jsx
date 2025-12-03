import { Navigate, Outlet } from "react-router-dom";
import { useActiveRoutes } from "../ActiveRoutesContext";

const ProtectedRoute = () => {
    const { loginRoute } = useActiveRoutes();

    const token = localStorage.getItem("token");

    return token ? <Outlet /> : <Navigate to={loginRoute} replace />;
};

export default ProtectedRoute;
