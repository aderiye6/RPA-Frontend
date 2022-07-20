import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import WorkSpace from 'app/views/WorkSpace/WorkSpace'
import FlowDesigner from 'app/views/FlowDesigner/FlowDesigner'
// import { authRoles } from '../../auth/authRoles'
import { authRoles } from 'app/auth/authRoles'
import RoboProject from 'app/views/RoboProject/RoboProject'
import ConsoleDashBoard from './ConsoleDashBoard'
import RoboMainSelection from './RoboMainSelection'
import UserConsole from 'app/views/UserConsole/UserConsole'
import RoboConsole from 'app/views/RoboConsole/RoboConsole'
// import Flows from './flows/Flows'
// import Robot from './robot/Robot.jsx'
// import Triggers from './triggers/Triggers'
// import Schedules from './schedules/Schedules'
// import Users from './user/Users'
// import Queues from './queues/Queues'
// import Jobs from './jobs/Jobs'
// import Lincenses from './lincenses/Lincenses'
// import Audit from './audit/Audit'
// import Respositories from './respositories/Respositories'
// import Billing from './billing/Billing'
// import Api from './api/Api'

// const Dashboard = Loadable(lazy(() => import('./Dashboard')))

const consoleRoutes = [
    {
        path: '/console/workspace',
        element: <WorkSpace />,
        auth: authRoles.admin,
    },
    {
        path: '/console/robo_console/:id',
        element: <RoboConsole />,
    },
    
    // {
    //     path: '/console/flow_designer',
    //     element: <FlowDesigner />,
    //     auth: authRoles.admin,
    // },
    {
        path: '/console/robo_project',
        element: <RoboProject />,
        auth: authRoles.admin,
    },
    // {
    //     path: '/console/dashboard',
    //     element: <ConsoleDashBoard />,
    //     auth: authRoles.admin,
    // },
    {
        path: '/console/selection',
        element: <RoboMainSelection />,
        auth: authRoles.admin,
    },
 
    {
        path: '/console/flow_designer',
        element: <FlowDesigner />,
    },
  
]

export default consoleRoutes
