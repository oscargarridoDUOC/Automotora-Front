import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, isAdmin }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
            </div>
        );
    }

    if (isAdmin) {
        if (!user) {
            return <Navigate to="/login" replace />;
        }

        const rolId = typeof user.rol === 'object' ? user.rol?.id : user.rol;
        if (rolId !== 1 && rolId !== 2) {
            return <Navigate to="/" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
