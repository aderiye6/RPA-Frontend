import {
    ArrowDropDownCircleTwoTone,
    CloseRounded,
    SearchOutlined,
} from '@mui/icons-material'
import { Input, Select } from 'antd'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import './OpenFlowModal.css'
import 'antd/dist/antd.css'
import { Option } from 'antd/lib/mentions'
import axios from 'axios'
import { Button, IconButton, TextField, Typography } from '@mui/material'
import OpenProjectTab from 'app/components/tab/OpenProjectTab'
import CreateFlowModal from '../CreateFlowModal/CreateFlowModal'
// import { Option } from 'antd/lib/mentions'

export default function OpenProjectFlowModal(props) {
    const { CreateRobotModalSetter, showOpenProject } = props
    const [flowName, setflowName] = useState()
    const [showCreateProject, setshowCreateProject] = useState()
    const [first, setfirst] = useState()
    const [refetch, setrefetch] = useState(false)
    const [message, setmessage] = useState()

    // const createFlow = async () => {
    //     console.log(flowName)

    //     const response = await axios.post(
    //         'https://kophy-rpa.herokuapp.com/api/v1/flow/',
    //         {
    //             name: flowName,
    //         }
    //     )

    //     console.log(response)
    // }

    const CreateProjectFlowSetter = (value)=>{
        setshowCreateProject(value)

    }

    const refetchSetter = (value)=>{
        setrefetch(value)

    }

    // const isConsoleProject=false
    return (
        <>
            {showCreateProject && (
                <CreateFlowModal
                    CreateRobotModalSetter={CreateProjectFlowSetter}
                    refetchSetter={refetchSetter}
                    isConsoleProject={true}
                    setmessage={setmessage}
                />
            )}
            <Box>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <Box
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                        className=""
                    >
                        <Box>
                            <div className="modal__title">Projects</div>
                        </Box>
                        {showOpenProject && (
                            <>
                                <Box>
                                
                                    <Button
                                    style={{padding:'.5re .5rem', backgroundColor:'blue', padding:'.2rem .2rem', color:'white', cursor:'pointer'}}
                                        onClick={() =>
                                            setshowCreateProject(true)
                                        }
                                        variant="contained"
                                        color="secondary"
                                        
                                        // type="submit"
                                    >
                                        New Project
                                        {/* <div
                                            style={{ backgroundColor: 'blue' }}
                                            className="modal__title"
                                        ></div> */}
                                    </Button>
                                </Box>
                            </>
                        )}
                        {/* <Box
                            onClick={() => {
                                CreateRobotModalSetter(false)
                                console.log('clicked')
                            }}
                            style={{ color: 'red', cursor: 'pointer' }}
                        >
                            <img src="/charm_cross.png" />
                        </Box> */}
                    </Box>
                    <div style={{color:'green', display:'flex', justifyContent:'center'}}>{message}</div>
                    <Box>
                        {' '}
                        <TextField
                            width="100%"
                            id="standard-bare"
                            variant="outlined"
                            defaultValue="Search project"
                            InputProps={{
                                style: {
                                    height: '35px',
                                    width: '400%',
                                    paddingLeft: '0px',
                                    margin: '2rem 0',
                                },
                                startAdornment: (
                                    <IconButton>
                                        <SearchOutlined />
                                    </IconButton>
                                ),
                            }}
                        />
                    </Box>
                   
                    <Box>
                        <OpenProjectTab isConsoleProject={true} refetch={refetch} refetchSetter={refetchSetter} />
                    </Box>
                    <div>
                        <Box className="create_robot_div">
                            <Box
                                style={{ marginRight: '1rem' }}
                                className="create_robot_btn"
                            >
                                Open
                            </Box>
                            <Box
                                className="create_robot_btn"
                                onClick={() => {
                                    CreateRobotModalSetter(false)
                                    console.log('clicked')
                                }}
                            >
                                Cancel
                            </Box>
                        </Box>
                    </div>
                </Typography>
            </Box>
        </>
    )
}
