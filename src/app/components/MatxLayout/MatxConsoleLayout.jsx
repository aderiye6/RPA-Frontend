import React from 'react'
import { MaxConsoleLayouts } from './index'
import { MatxSuspense } from 'app/components'
import useSettings from 'app/hooks/useSettings'

const MatxConsoleLayout = (props) => {
    const { settings } = useSettings()
    const Layout = MaxConsoleLayouts[settings.activeLayout]

    return (
        <MatxSuspense>
            <Layout {...props} />
        </MatxSuspense>
    )
}

export default MatxConsoleLayout
