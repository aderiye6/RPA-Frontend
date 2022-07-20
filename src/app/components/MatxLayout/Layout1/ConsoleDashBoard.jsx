import React, { useState } from 'react'
import './Layout.css'
import SlidingPanel from 'react-sliding-side-panel'
import { Link, Route, Routes } from 'react-router-dom'
import WorkSpace from 'app/views/WorkSpace/WorkSpace'
import FlowDesigner from 'app/views/FlowDesigner/FlowDesigner'
import RoboProject from 'app/views/RoboProject/RoboProject'

export default function ConsoleDashBoard(props) {
    const { openConsoleSetter } = props
    return (
        <>
            <div className="console_dashboard">
                <div onClick={() => openConsoleSetter(false)}>Close</div>
                <>
                    <div className="console_layout">
                    
                        <div className="console_sidebar">
                        <div><Link to='/console/robo_project' >Projects</Link> </div>
                            <div ><Link to='/console/workspace' >Templates</Link> </div>
                            <div><Link to='/console/flow_designer' >Tutorial</Link> </div>
                           
                        </div>
                        <div className="console_main_view">
                            <Routes>
                                <Route path="console/workspace" element={<WorkSpace />} />
                                <Route path="console/flow_designer" element={<FlowDesigner />} />
                                <Route path="console/robo_project" element={<RoboProject />} />
                            </Routes>
                        </div>
                    </div>
                </>
            </div>
        </>
    )
}
