import useAuth from 'app/hooks/useAuth'
import { flat } from 'app/utils/utils'
import React, { useState, useEffect, useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AllPages } from '../routes/routes'

const getUserRoleAuthStatus = (pathname, user, routes) => {
    if (!user) {
        return false
    }
    const matched = routes.find((r) => r.path === pathname)

    const authenticated = true
    return authenticated
}

const AuthGuard = ({ children }) => {
    const { isAuthenticated, user } = useAuth()

    const [previouseRoute, setPreviousRoute] = useState(null)
    const { pathname } = useLocation()
    const routes = flat(AllPages())

    const isUserRoleAuthenticated = getUserRoleAuthStatus(
        pathname,
        user,
        routes
    )

    let authenticated = isAuthenticated

    useEffect(() => {
        if (previouseRoute !== null) setPreviousRoute(pathname)
    }, [pathname, previouseRoute])

    if (authenticated) return <>{children}</>
    else {
        return (
            <Navigate
                to="/session/signin"
                state={{ redirectUrl: previouseRoute }}
            />
        )
    }
}

export default AuthGuard
