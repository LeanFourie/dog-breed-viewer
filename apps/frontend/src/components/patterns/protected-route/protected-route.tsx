import { AuthContext } from '../../../providers'
import { type PropsWithChildren, useContext } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }: PropsWithChildren<{}>) => {
    const auth = useContext(AuthContext)

    if (auth?.isLoading) {
        // Show a loading state while checking auth
        return <div>Loading...</div>
    }

    if (!auth?.user) {
        // Redirect to login if not authenticated
        return <Navigate to="/auth/login" replace />
    }

    return children
}

export { ProtectedRoute }
