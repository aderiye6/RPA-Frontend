import Layout1Topbar from 'app/components/MatxLayout/Layout1/Layout1Topbar'

import { MatxSuspense } from 'app/components'

import Scrollbar from 'react-perfect-scrollbar'
import useSettings from 'app/hooks/useSettings'
import { styled, Box, useTheme } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import { ThemeProvider, useMediaQuery } from '@mui/material'

import './UserConsole.css'


export default function UserConsole() {
    const { settings, updateSettings } = useSettings()
    const { layout1Settings, secondarySidebar } = settings
    const topbarTheme = settings.themes[layout1Settings.topbar.theme]
    const {
        leftSidebar: { mode: sidenavMode, show: showSidenav },
    } = layout1Settings

    const theme = useTheme()
    const isMdScreen = useMediaQuery(theme.breakpoints.down('md'))

    const ref = useRef({ isMdScreen, settings })
    const layoutClasses = `theme-${theme.palette.type}`

    useEffect(() => {
        let { settings } = ref.current
        let sidebarMode = settings.layout1Settings.leftSidebar.mode
        if (settings.layout1Settings.leftSidebar.show) {
            let mode = isMdScreen ? 'close' : sidebarMode
            updateSettings({ layout1Settings: { leftSidebar: { mode } } })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMdScreen])
    return (
        <div className="user_console_wrapper">
            {layout1Settings.topbar.show && layout1Settings.topbar.fixed && (
                <ThemeProvider theme={topbarTheme}>
                    <Layout1Topbar fixed={true} className="elevation-z8" />
                </ThemeProvider>
            )}
            No Application Found
            <div className="user_console_body">No Application Found</div>
        </div>
    )
}
