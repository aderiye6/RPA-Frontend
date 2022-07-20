import { ArrowDropDownCircleTwoTone, CloseRounded } from '@mui/icons-material'
import { Input, notification, Select } from 'antd'
import { Box } from '@mui/system'
import React, {useState} from 'react'
import './CreateRobotModal.css'
import 'antd/dist/antd.css'
import { Option } from 'antd/lib/mentions'
import { addRobot } from 'app/AppServices/apiService/Services'
// import { Option } from 'antd/lib/mentions'

export default function CreateRobotModal(props) {
    const { CreateRobotModalSetter, getRobotData } = props
    const [robotType, setrobotType] = useState()
    const [robotName, setrobotName] = useState()
    const [loading, setloading] = useState(false)
    const [message, setmessage] = useState()

    const createRobotSubmit = async()=>{
        setloading(true)
        const data ={
            robot_name: robotName,
	        robot_type: robotType
        }
        try{
        const res = await addRobot(data)
        console.log(res)
        getRobotData()
        setloading(false)
        CreateRobotModalSetter(false)
        notification.success({
            message: 'success',
            description: res?.data?.msg || "created successfully"
        })

        }catch(err){
            setloading(false)
            setmessage(err?.response?.data?.msg)
            console.log(err.response, 'klslkdkls')

        }
       
    }
    return (
        <div className="modal_body">
            <div className="modal_content_robot ">
           
                <Box className="create_robot_top_bar">
                   
                    
                    <Box>
                        <div className='modal__title'>Create your own Robot</div>
                       
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
                <div style={{color:'red'}}>{message}</div>
                <Box className="create_robot_body">
                    <Box>
                        {' '}
                        <Input
                            size="large"
                            placeholder="Robot name *"
                            style={{ width: 220, height: 40 }}
                            onChange={(e)=> setrobotName(e.target.value)}
                        />
                    </Box>
                    <Box>
                    <select
                                                style={{
                                                    width: '100%',
                                                    height: '40px',
                                                    margin: '1rem 0',
                                                }}
                                                id="ddlStates"
                                                className="form-control select-class"
                                                onChange={(e) =>
                                                    setrobotType(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="0">
                                                    Select Robot Type
                                                </option>
                                                <option value="PRODUCTION">
                                                    PRODUCTION
                                                </option>
                                                <option value="DEVELOPMENT">
                                                    DEVELOPMENT
                                                </option>
                                                <option value="ON_DEMAND">
                                                    ON DEMAND
                                                </option>
                                             
                                            </select>
                                        
                        {/* <Select
                            suffixIcon={<img src="/chevron-down.png" />}
                            showSearch
                            style={{ width: 220, height: 40 }}
                            placeholder="Select ROBOT TYPE"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="PRODUCTION">PRODUCTION</Option>
                            <Option value="DEVELOPMENT">DEVELOPMENT</Option>
                            <Option value="ON_DEMAND">ON DEMANDD</Option>
                        </Select> */}
                    </Box>
                </Box>
                <Box className="create_robot_div">
                    <Box  onClick={createRobotSubmit} className="create_robot_btn">
                       {loading? "loading..": "Create"} 
                        </Box>
                </Box>
            </div>
        </div>
    )
}
