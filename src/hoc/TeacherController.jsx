import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const TeacherController = ({ children }) => {
    const navigate = useNavigate();
    console.log(navigate());
    const { user } = useAuth();

    if(!user.role === 1 || !user.role === 2) return <Navigate to='/' />

    return children;
}

export default TeacherController;