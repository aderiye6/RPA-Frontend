import { ArrowDropDownCircleTwoTone, CloseRounded } from '@mui/icons-material'
import { Input, notification, Select } from 'antd'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import './CreateFlowModal.css'
import 'antd/dist/antd.css'
import { Option } from 'antd/lib/mentions'
import axios from 'axios'
// import { Option } from 'antd/lib/mentions'

export default function CreateFlowModal(props) {
    const { CreateRobotModalSetter, update, refetchSetter, isConsoleProject, setmessage } = props
    const [flowName, setflowName] = useState()
    const [loading, setloading] = useState(false)

    const createFlow = async () => {
        // console.log(flowName)
        setloading(true)
        try{
            const response = await axios.post(
                'https://kophy-rpa.herokuapp.com/api/v1/flow/',
                {
                    name: flowName,
                }
            )
            setloading(false)
            if(isConsoleProject){
                refetchSetter(true)
                setmessage(response?.data?.msg)
            }
            CreateRobotModalSetter(false)

            notification.success({
                message: 'SUCCESS',
                description: response?.data?.msg || 'Flow Created',
            })
            
        }catch(err){
            setloading(false)
            notification.error({
                message: 'error',
                description: err?.response?.data?.msg || 'error',
            })

        }
      
    }
    return (
        <div className="modal_body">
            <div className="modal_content_flow">
                <Box className="create_robot_top_bar">
                    {' '}
                    <Box>
                        <div className="modal__title">{update? "Update Project": "Create Flow"}</div>
                    </Box>
                    <Box
                        onClick={() => {
                            CreateRobotModalSetter(false)
                            console.log('clicked')
                        }}
                        style={{ color: 'red', cursor: 'pointer' }}
                    >
                        <img src="/charm_cross.png" />
                    </Box>
                </Box>
                <Box className="create_robot_body">
                    <Box>
                        {' '}
                        <Input
                            size="large"
                            placeholder="Flow name *"
                            style={{ width: 220, height: 40 }}
                            onChange={(e) =>
                                // console.log(e)
                                setflowName(e.target.value)
                            }
                        />
                    </Box>
                </Box>
                <Box className="create_robot_div">
                    <Box className="create_robot_btn" onClick={createFlow}>
                        {!loading? "Create": "Loading..."}
                        
                    </Box>
                </Box>
            </div>
        </div>
    )
}
