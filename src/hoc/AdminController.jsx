import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


function AdminController({ children }) {
    const location = useLocation();
    const { user, isAdmin } = useAuth();

    if(!user) {
        return <Navigate to='/' state={{from: location}} />
    }

    if(!isAdmin) {
        return <Navigate to='' />
    }

    return children;
}

export default AdminController;