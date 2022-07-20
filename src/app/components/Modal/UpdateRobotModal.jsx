import { OfflineBolt } from '@mui/icons-material'
import { Box, Button, Input, InputAdornment, TextField } from '@mui/material'
import { notification } from 'antd'
import { updateRobot } from 'app/AppServices/apiService/Services'
import React, {useState} from 'react'
import './UpdateRobotModal.css'

export default function UpdateRobotModal(props) {
    const { UpdateRobotModalSetter, robotID , getRobotData} = props
    const [robotName, setrobotName] = useState()


    const updateRobotName = async()=>{

        const data = {
            robot_name: robotName
        }
        
        try{
            const res = await updateRobot(data, robotID )
            getRobotData()
            notification.success({
                message:'success',
                description: res?.data?.msg || "renamed"
            })

            UpdateRobotModalSetter(false)

        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className="modal_body">
            <div className="modal_content">
                <Box className="create_robot_top_bar">
                    {' '}
                    <Box>
                      
                        <div className='modal__title'>Update Robot</div>
                    </Box>
                    <Box
                        onClick={() => {
                            UpdateRobotModalSetter(false)
                            console.log('clicked')
                        }}
                        style={{ color: 'red', cursor: 'pointer' }}
                    >
                        <img src="/charm_cross.png" />
                    </Box>
                </Box>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { mt: 2, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        onChange={(e)=> setrobotName(e.target.value)}
                    />
                   
                </Box>
                {/* <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { mt: 2, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-basic"
                        label="Labels"
                        variant="outlined"
                        InputProps={{
                          endAdornment: 
                            <div className='add_new_rob'> <img src='/carbon_add.png'/>New</div>
                        }}
                     
                    />
                </Box> */}
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { mt: 2, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    {' '}
                    <Button

                    onClick={()=> updateRobotName()}
                        style={{
                            backgroundColor: '#369FFF',
                            color: 'white',
                            width: '100%',
                        }}
                        invariant="primary"
                        fullWidth
                    >
                        Apply
                    </Button>
                </Box>
            </div>
        </div>
    )
}
