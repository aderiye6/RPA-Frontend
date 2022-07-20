import React, { useState, useEffect, useRef } from 'react'
import './FlowDesignerActions.css'
import SlidingPanel from 'react-sliding-side-panel'
import { Link, Route, Routes } from 'react-router-dom'
import WorkSpace from 'app/views/WorkSpace/WorkSpace'
import FlowDesigner from 'app/views/FlowDesigner/FlowDesigner'
import RoboProject from 'app/views/RoboProject/RoboProject'
import { ThemeProvider, useTheme } from '@emotion/react'
import useSettings from 'app/hooks/useSettings'
import Layout1Topbar from 'app/components/MatxLayout/Layout1/Layout1Topbar'
import { sidenavCompactWidth, sideNavWidth } from 'app/utils/constant'
import { useMediaQuery } from '@mui/material'
import Tutorials from '../Tutorials/Tutorials'
import Templates from '../Templates/Templates'
import { useNavigate } from 'react-router-dom'

export default function FlowDesignerActions(props) {
    const navigate = useNavigate()
    const { openConsoleSetter } = props
    const [openPanel, setOpenPanel] = useState(false)
    const { settings, updateSettings } = useSettings()

    const { layout1Settings } = settings
    const topbarTheme = settings.themes[layout1Settings.topbar.theme]
    const {
        leftSidebar: { mode: sidenavMode, show: showSidenav },
    } = layout1Settings

    const [quickbetDrawerText, setquickbetDrawerText] =
        useState('OPEN QUICK BET')
    const [showConsole, setshowConsole] = useState(false)
    const [activeMenu, setactiveMenu] = useState({})

    const getSidenavWidth = () => {
        switch (sidenavMode) {
            case 'full':
                return sideNavWidth
            case 'compact':
                return sidenavCompactWidth
            default:
                return '0px'
        }
    }

    const sidenavWidth = getSidenavWidth()
    const theme = useTheme()
    const isMdScreen = useMediaQuery(theme.breakpoints.down('md'))
    const ref = useRef({ isMdScreen, settings })
    const layoutClasses = `theme-${theme.palette.type}`

    useEffect(() => {
        // getConsoleFuunction()
        let { settings } = ref.current
        let sidebarMode = settings.layout1Settings.leftSidebar.mode
        if (settings.layout1Settings.leftSidebar.show) {
            let mode = isMdScreen ? 'close' : sidebarMode
            updateSettings({ layout1Settings: { leftSidebar: { mode } } })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMdScreen])
    return (
        <>
            {layout1Settings.topbar.show && layout1Settings.topbar.fixed && (
                // <Layout1Topbar fixed={true} />
                <ThemeProvider theme={topbarTheme}>
                    <Layout1Topbar fixed={true} className="elevation-z8" />
                </ThemeProvider>
            )}
            <div className="flow_design_dashboard">
                <div
                    onClick={() => {
                        openConsoleSetter(false)
                    }}
                >
                    Close
                </div>
                <>
                    <div className="flow_design_layout">
                        <div className="flow_design_sidebar">
                            <div
                                onClick={() => {
                                    navigate('/flow_designer/default')
                                    // setactiveMenu(!activeMenu)
                                    setactiveMenu((prevState) => ({
                                        ...prevState,
                                        project: !setactiveMenu.project,
                                        template: false,
                                        tutorial: false,
                                    }))
                                }}
                                className={
                                    activeMenu.project
                                        ? 'flow_design_menu_active'
                                        : 'flow_design_menu'
                                }
                            >
                                <Link to="/flow_designer/default">
                                    Projects
                                </Link>{' '}
                            </div>
                            <div
                                onClick={() => {
                                    navigate('/flow_designer/templates')
                                    setactiveMenu((prevState) => ({
                                        ...prevState,
                                        template: !setactiveMenu.template,
                                        project: false,
                                        tutorial: false,
                                    }))
                                }}
                                className={
                                    activeMenu.template
                                        ? 'flow_design_menu_active'
                                        : 'flow_design_menu'
                                }
                            >
                                <Link to="/flow_designer/templates">
                                    Templates
                                </Link>{' '}
                            </div>
                            <div
                                onClick={() => {
                                    navigate('/flow_designer/tutorials')
                                    setactiveMenu((prevState) => ({
                                        ...prevState,
                                        tutorial: !setactiveMenu.tutorial,
                                        project: false,
                                        template: false,
                                    }))
                                }}
                                className={
                                    activeMenu.tutorial
                                        ? 'flow_design_menu_active'
                                        : 'flow_design_menu'
                                }
                            >
                                <Link to="/flow_designer/tutorials">
                                    Tutorials
                                </Link>{' '}
                            </div>
                        </div>
                        <div className="flow_design_main_view">
                            {/* <RoboProject /> */}
                            <Routes>
                                <Route
                                    path="flow_designer/default"
                                    element={<RoboProject />}
                                />
                                <Route
                                    path="/flow_designer/templates"
                                    element={<Templates />}
                                />
                                <Route
                                    path="/flow_designer/tutorials"
                                    element={<Tutorials />}
                                />
                            </Routes>
                        </div>
                    </div>
                </>
            </div>
        </>
    )
}
