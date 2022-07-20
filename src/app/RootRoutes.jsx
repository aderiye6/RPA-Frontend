import React from 'react'
import { Redirect } from 'react-router-dom'
import consoleRoutes from './components/MatxLayout/Layout1/ConsoleRoutes'
import dashboardRoutes from './views/dashboard/DashboardRoutes'
import flowDesignerActionRoutes from './views/FlowDesignerActions/flowDesignerActionRoutes'

const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/dashboard/default" />,
    },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...dashboardRoutes,
    ...redirectRoute,
    ...errorRoute,
    ...consoleRoutes,
    ...flowDesignerActionRoutes
]

export default routes
