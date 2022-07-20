import React from 'react'
import { MaxFlowActionsLayouts } from './index'
import { MatxSuspense } from 'app/components'
import useSettings from 'app/hooks/useSettings'

const MaxFlowActionsLayout = (props) => {
    const { settings } = useSettings()
    const Layout = MaxFlowActionsLayouts[settings.activeLayout]

    return (
        <MatxSuspense>
            <Layout {...props} />
        </MatxSuspense>
    )
}

export default MaxFlowActionsLayout
