import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import './RoboMainSelection.css'
import { useNavigate } from 'react-router-dom'


export default function RoboMainSelection({ openConsoleSetter }) {

    const navigate = useNavigate()
    const dashIcons = useRef(null)

    const checkOutBoundary = ()=>{
        openConsoleSetter(false)
    }

    const openConsole = ()=>{
        const flowData_ID = localStorage.getItem("flow_id")
        if(flowData_ID){
            navigate(`/console/robo_console/${flowData_ID}`)
        }else{
            navigate('/flow_designer/default')
        }
    }
    
    return (
        <div>
            <div className="console_layout">
                <div className="console_sidebar">
                <div style={{ width: '200px', heigth: '100px' }}>
                                <img
                                    style={{ width: '100%', heigth: '100%' }}
                                    src="/robomotion.png"
                                />{' '}
                </div>
                    <div style={{marginTop:'3rem'}} className='main_selection_menu_div' onClick={() => openConsoleSetter(false)}>
                    <div style={{color:'#1890ff', cursor:'pointer'}} onClick={()=> openConsole()}>Flow Designer</div>
                        {/* <Link to="/console/flow_designer"></Link> */}
                    </div>
                    <div className='main_selection_menu_div' onClick={() => openConsoleSetter(false)}>
                      
                        <Link to="/dashboard/default">Admin Console</Link>
                    </div>
                    <div style={{borderBottom:'1px solid #ccc'}} className='main_selection_menu_div' onClick={() => openConsoleSetter(false)}>
                        <Link to="/user/console">User Console</Link>
                    </div>
                </div>
                <div className="console_main_view" ref={dashIcons}  onClick={checkOutBoundary}>
                    {/* <Routes>
                        <Route
                            path="console/workspace"
                            element={<WorkSpace />}
                        />
                        <Route
                            path="console/flow_designer"
                            element={<FlowDesigner />}
                        />
                        <Route
                            path="console/robo_project"
                            element={<RoboProject />}
                        />
                    </Routes> */}
                </div>
            </div>
        </div>
    )
}
