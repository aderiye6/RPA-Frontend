import {
    AddBox,
    FolderOpen,
    OpenInBrowser,
    SearchOutlined,
} from '@mui/icons-material'
import { IconButton, Modal, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import CreateFlowModal from 'app/components/Modal/CreateFlowModal/CreateFlowModal'
import OpenFlowModal from 'app/components/Modal/OpenFlowModal/OpenProjectFlowModal'
import React, { useState } from 'react'
import './RoboProject.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1100,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    overflow: 'scroll',
    padding: '2rem',
}

export default function RoboProject() {
    const [showCreateFlow, setshowCreateFlow] = useState(false)
    const [showOpenFlowModal, setshowOpenFlowModal] = useState(false)

    const CreateRobotModalSetter = (value) => {
        setshowCreateFlow(value)
    }
    const OpenRobotModalSetter = (value) => {
        setshowOpenFlowModal(value)
    }
    return (
        <>
            {showCreateFlow && (
                <CreateFlowModal
                    CreateRobotModalSetter={CreateRobotModalSetter}
                />
            )}

            <div className="robo_project_container">
                <div className="robo_project_message">
                    <div className="robo_project_message_title">
                        Welcome to Robo
                    </div>
                    <div>
                        You can create a new Project from the Scratch, open an
                        existing project from your workspace, or import a
                        project from your local storage
                    </div>
                </div>

                <div className="robo_project_actions">
                    <div className="robo_actions">
                        <div
                            className="robo_action"
                            onClick={() => setshowCreateFlow(true)}
                        >
                            {' '}
                            <AddBox
                                style={{ color: '#325170', fontSize: '40px' }}
                            />{' '}
                        </div>
                        <div>New</div>
                    </div>

                    <div className="robo_actions">
                        <div
                            className="robo_action"
                            onClick={() => setshowOpenFlowModal(true)}
                        >
                            <FolderOpen
                                style={{ color: '#325170', fontSize: '40px' }}
                            />{' '}
                        </div>{' '}
                        <div>Open</div>
                    </div>

                    <div className="robo_actions">
                        <div className="robo_action">
                            <OpenInBrowser
                                style={{ color: '#325170', fontSize: '40px' }}
                            />
                        </div>
                        <div>Import</div>
                    </div>
                </div>
            </div>

            <Modal
                open={showOpenFlowModal}
                onClose={() => setshowOpenFlowModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        <Box
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                            className=""
                        >
                            <OpenFlowModal
                                CreateRobotModalSetter={OpenRobotModalSetter}
                            />
                        </Box>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}
