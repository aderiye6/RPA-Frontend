import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'
import Flows from './flows/Flows'
import Robot from './robot/Robot.jsx'
import Triggers from './triggers/Triggers'
import Schedules from './schedules/Schedules'
import Users from './user/Users'
import Queues from './queues/Queues'
import Jobs from './jobs/Jobs'
import Lincenses from './lincenses/Lincenses'
import Audit from './audit/Audit'
import Respositories from './respositories/Respositories'
import Billing from './billing/Billing'
import Api from './api/Api'

const Dashboard = Loadable(lazy(() => import('./Dashboard')))

const dashboardRoutes = [
    {
        path: '/dashboard/default',
        element: <Dashboard />,
        auth: authRoles.admin,
    },
    {
        path: '/dashboard/flows',
        element: <Flows />,
    },
    {
        path: '/dashboard/robot',
        element: <Robot />,
    },
    {
        path: '/dashboard/triggers',
        element: <Triggers />,
    },
    {
        path: '/dashboard/schedules',
        element: <Schedules />,
    },
    {
        path: '/dashboard/users',
        element: <Users />,
    },
    {
        path: '/dashboard/queues',
        element: <Queues />,
    },
    {
        path: '/dashboard/jobs',
        element: <Jobs />,
    },
    {
        path: '/dashboard/lincenses',
        element: <Lincenses />,
    },
    {
        path: '/dashboard/audit',
        element: <Audit />,
    },
    {
        path: '/dashboard/repositories',
        element: <Respositories />,
    },
    {
        path: '/dashboard/billing',
        element: <Billing />,
    },
    {
        path: '/dashboard/api',
        element: <Api />,
    },
]

export default dashboardRoutes
