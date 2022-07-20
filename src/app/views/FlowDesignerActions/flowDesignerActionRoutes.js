import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'
import Templates from '../Templates/Templates'
import Tutorials from '../Tutorials/Tutorials'


const FlowDesignerActions = Loadable(lazy(() => import('./FlowDesignerActions')))

const flowDesignerActionRoutes = [
    {
        path: '/flow_designer/default',
        element: <FlowDesignerActions />,
        auth: authRoles.admin,
    },
    {
        path: '/flow_designer/templates',
        element: <Templates />,
    },
    {
        path: '/flow_designer/tutorials',
        element: <Tutorials />,
    },

    
]

export default flowDesignerActionRoutes
