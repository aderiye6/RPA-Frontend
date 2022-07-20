import AuthGuard from 'app/auth/AuthGuard'
import NotFound from 'app/views/sessions/NotFound'
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes'
import sessionRoutes from 'app/views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import { Navigate } from 'react-router-dom'
import consoleRoutes from 'app/components/MatxLayout/Layout1/ConsoleRoutes'
import MatxConsoleLayout from '../components/MatxLayout/MatxConsoleLayout'
import flowDesignerActionRoutes from 'app/views/FlowDesignerActions/flowDesignerActionRoutes'
import MaxFlowActionsLayout from 'app/components/MatxLayout/MaxFlowActionsLayout'

export const AllPages = () => {
    const all_routes = [
        {
            element: (
                <AuthGuard>
                    <MatxLayout />
                </AuthGuard>
            ),
            children: [...dashboardRoutes],
        },
        {
            element: (
                <AuthGuard>
                    <MatxConsoleLayout />
                </AuthGuard>
            ),
            children: [...consoleRoutes],
        },
        {
            element: (
                <AuthGuard>
                    < MaxFlowActionsLayout />
                </AuthGuard>
            ),
            children: [...flowDesignerActionRoutes],
        },
        
        ...sessionRoutes,
        {
            path: '/',
            element: <Navigate to="dashboard/default" />,
        },
        {
            path: '/flows',
            element: <Navigate to="dashboard/flows" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]

    return all_routes
}
