import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


function AdminController({ children }) {
    const location = useLocation();
    const { user } = useAuth();

    if(!user) {
        return <Navigate to='/' state={{from: location}} />
    }

    if(user.role !== 2) {
        return <Navigate to='' />
    }

    return children;
}

export default AdminController;