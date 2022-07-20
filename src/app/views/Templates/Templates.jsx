// import { ThemeProvider } from '@emotion/react'
// import Layout1Topbar from 'app/components/MatxLayout/Layout1/Layout1Topbar'
import React, { useState, useEffect, useRef } from 'react'
import {  useTheme } from '@emotion/react'
import useSettings from 'app/hooks/useSettings'

import { useMediaQuery } from '@mui/material'
import './Templates.css'

export default function Templates() {

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
        <div className="templates_wrapper">
            Templates
        </div>
    )
}
