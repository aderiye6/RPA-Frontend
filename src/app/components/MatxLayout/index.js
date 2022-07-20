import React from 'react'


import RoboConsole from 'app/views/RoboConsole/RoboConsole'

export const MatxLayouts = {
    layout1: React.lazy(() => import('./Layout1/Layout1')),
}

// export const MaxConsoleLayouts = {
//     layout1: React.lazy(() => import('./Layout1/ConsoleLayout')),
// }

export const MaxConsoleLayouts = {
    layout1: React.lazy(() => import('app/views/RoboConsole/RoboConsole')),
}


export const MaxFlowActionsLayouts = {
    layout1: React.lazy(() => import('app/views/FlowDesignerActions/FlowDesignerActions')),
}

