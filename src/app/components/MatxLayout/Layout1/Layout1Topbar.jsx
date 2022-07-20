import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'
import useSettings from 'app/hooks/useSettings'
import { styled, useTheme, Box } from '@mui/system'
import { Span } from '../../../components/Typography'
import { MatxMenu } from 'app/components'
import { themeShadows } from 'app/components/MatxTheme/themeColors'
import StopIcon from '@mui/icons-material/Stop'
import SaveIcon from '@mui/icons-material/Save'
import DoneIcon from '@mui/icons-material/Done'
import {
    Icon,
    IconButton,
    MenuItem,
    Avatar,
    useMediaQuery,
    Hidden,
    Typography,
    Modal,
} from '@mui/material'
import Button from '@mui/material/Button'
import { topBarHeight } from 'app/utils/constant'
import SlidingPanel from 'react-sliding-side-panel'
import './Layout.css'
import RoboMainSelection from './RoboMainSelection'
import { useNavigate } from 'react-router-dom'
import {
    ArrowDownward,
    ArrowDownwardSharp,
    ArrowDropDown,
    GiteOutlined,
    PlayArrow,
    Usb,
} from '@mui/icons-material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import OpenProjectFlowModal from 'app/components/Modal/OpenFlowModal/OpenProjectFlowModal'
import OpenVersionModal from 'app/components/Modal/OpenVersionModal/OpenVersionModal'
import Loader from 'app/components/Loadable/Loader'

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.text.primary,
}))

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

    // pt: 2,
    // px: 4,
    // pb: 3,
}

const PlayMesagesstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    // overflow: 'scroll',
    padding: '2rem',
}
const TopbarRoot = styled('div')(({ theme }) => ({
    // top: 50,
    zIndex: 96,
    position: 'fixed',
    width: '100%',
    transition: 'all 0.3s ease',
    // boxShadow: themeShadows[8],
    height: topBarHeight,
    borderBottom: '1px solid #ccc',
}))

const TopbarContainer = styled(Box)(({ theme }) => ({
    // padding: '8px',
    // paddingLeft: 18,
    backgroundColor: 'red',
    // paddingRight: 20,
    height: '100%',
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'space-between',
    background: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
        // paddingLeft: 16,
        // paddingRight: 16,
    },
    [theme.breakpoints.down('xs')]: {
        // paddingLeft: 14,
        // paddingRight: 16,
    },
}))

const UserMenu = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: 24,
    padding: 4,
    '& span': {
        margin: '0 8px',
    },
}))

const StyledItem = styled(MenuItem)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    minWidth: 185,
    '& a': {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
    },
    '& span': {
        marginRight: '10px',
        color: theme.palette.text.primary,
    },
}))

const IconBox = styled('div')(({ theme }) => ({
    display: 'inherit',
    [theme.breakpoints.down('md')]: {
        display: 'none !important',
    },
}))

const Layout1Topbar = (props) => {
    const {
        isConsole,
        onRestore,
        onSave,
        flowName,
        curentFlowData,
        updateFlowDataSetter,
        newChanges,
        newChangesSetter,
        setshowConsoleTab,
        showConsoleTab,
    } = props
    // newChanges={newChanges}
    // newChangesSetter={newChangesSetter}
    const navigate = useNavigate()
    const theme = useTheme()
    const [openPanel, setOpenPanel] = useState(false)
    const [quickbetDrawerText, setquickbetDrawerText] =
        useState('OPEN QUICK BET')
    const [showConsole, setshowConsole] = useState(false)
    const { settings, updateSettings } = useSettings()
    const { logout, user } = useAuth()
    const isMdScreen = useMediaQuery(theme.breakpoints.down('md'))
    const [showProjectModal, setshowProjectModal] = useState(false)
    const [showVersionModal, setshowVersionModal] = useState(false)
    const [savingFlowChanges, setsavingFlowChanges] = useState(false)
    const [showPlayMessage, setshowPlayMessage] = useState(false)

    const updateSidebarMode = (sidebarSettings) => {
        updateSettings({
            layout1Settings: {
                leftSidebar: {
                    ...sidebarSettings,
                },
            },
        })
    }

    useEffect(() => {}, [savingFlowChanges])

    const openConsoleSetter = (value) => {
        setshowConsole(value)
    }

    const saveFlowDataChanges = async () => {
        console.log('djdjkd')
        setsavingFlowChanges(true)

        await onSave()
        setsavingFlowChanges(false)
    }

    const handleSidebarToggle = () => {
        setshowConsole(!showConsole)
        setOpenPanel(!openPanel)
        // let { layout1Settings } = settings
        // let mode
        // if (isMdScreen) {
        //     mode =
        //         layout1Settings.leftSidebar.mode === 'close'
        //             ? 'mobile'
        //             : 'close'
        // } else {
        //     mode =
        //         layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full'
        // }
        // updateSidebarMode({ mode })
    }

    const OpenRobotModalSetter = (value) => {
        setshowProjectModal(value)
    }
    const OpenVersionModalSetter = (value) => {
        setshowVersionModal(value)
    }

    // setshowVersionModal

    return (
        <>
            {showConsole && (
                <RoboMainSelection openConsoleSetter={openConsoleSetter} />
            )}
            <TopbarRoot>
                <TopbarContainer>
                    <Box display="flex">
                        <Box
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginLeft: '1rem',
                                marginRight: '.5rem',
                            }}
                        >
                            {' '}
                            <StyledIconButton onClick={handleSidebarToggle}>
                                <Icon>menu</Icon>
                            </StyledIconButton>
                        </Box>
                        <Box
                            className="topBar_flow_designer_logo"
                            onClick={() => navigate('/flow_designer/default')}
                            display="flex"
                            style={{
                                cursor: 'pointer',
                                width: '200px',
                                height: '100%',
                                backgroundColor: '#f5f6f7',
                            }}
                        >
                            <div style={{ width: '40px', heigth: '100px' }}>
                                <img
                                    style={{ width: '100%', heigth: '100%' }}
                                    src="/logo.png"
                                />{' '}
                            </div>
                            <div>Flow Designer</div>
                        </Box>
                        {isConsole && (
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    // alignItems: 'center',
                                    backgroundColor: '#ffffff',
                                    // borderRight: '1px solid #ccc',
                                    padding: '0 1rem',
                                    color: 'rgb(27, 147, 208)',
                                    cursor: 'pointer',
                                    minWidth: '',
                                }}
                            >
                                <Box
                                    onClick={() => setshowProjectModal(true)}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        backgroundColor: '#ffffff',
                                        borderRight: '1px solid #ccc',
                                        padding: '0 1rem',
                                        color: 'rgb(27, 147, 208)',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <div>{flowName}</div> <ArrowDropDown />
                                </Box>
                                <Box
                                    onClick={() => setshowVersionModal(true)}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        backgroundColor: '#ffffff',
                                        borderRight: '1px solid #ccc',
                                        padding: '0 1rem',
                                        color: 'rgb(27, 147, 208)',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <Usb /> <div>master</div>
                                </Box>
                            </div>
                        )}
                    </Box>

                    {isConsole && (
                        <Box
                            style={{
                                cursor: 'pointer',
                                color: 'rgb(27, 147, 208)',
                                width: '100px',
                                fontSize: '38px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <div onClick={() => setshowPlayMessage(true)}>
                                <PlayArrow style={{ fontSize: '2rem' }} />
                            </div>

                            <StopIcon style={{ fontSize: '2rem' }} />
                        </Box>
                    )}

                    <Box display="flex" alignItems="center">
                        {isConsole && (
                            <>
                                <Box
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        backgroundColor: '#ffffff',
                                        borderRight: '1px solid #ccc',
                                        padding: '0 1rem',
                                        color: 'rgb(27, 147, 208)',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {newChanges ? (
                                        <>
                                            <div
                                                onClick={() =>
                                                    saveFlowDataChanges()
                                                }
                                            >
                                                <SaveIcon />{' '}
                                            </div>{' '}
                                        </>
                                    ) : (
                                        <>
                                            {savingFlowChanges ? (
                                                <>
                                                    <Loader />
                                                </>
                                            ) : (
                                                <>
                                                    <DoneIcon />
                                                </>
                                            )}{' '}
                                        </>
                                    )}
                                </Box>
                                <div
                                    style={{
                                        height: '25px',
                                        width: '30px',
                                        border: '1px solid rgb(27, 147, 208)',
                                    }}
                                    onClick={() =>
                                        setshowConsoleTab(!showConsoleTab)
                                    }
                                >
                                    <div
                                        style={{
                                            backgroundColor: '#ffffff',
                                            height: '15px',
                                            width: '100%',
                                        }}
                                    ></div>
                                    <div
                                        style={{
                                            backgroundColor:
                                                'rgb(27, 147, 208)',
                                            height: '8px',
                                            width: '100%',
                                        }}
                                    ></div>
                                </div>
                                {/* <Box
                                    onClick={onRestore}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        backgroundColor: '#ffffff',
                                        borderRight: '1px solid #ccc',
                                        padding: '0 1rem',
                                        color: 'rgb(27, 147, 208)',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <div>Restore</div> 
                                </Box> */}
                            </>
                        )}

                        <MatxMenu
                            menuButton={
                                <UserMenu>
                                    <img src="/fluent_more-circle-32-filled.png" />
                                </UserMenu>
                            }
                        >
                            <StyledItem>
                                <Link to="/">
                                    <Icon> home </Icon>
                                    <Span> Home </Span>
                                </Link>
                            </StyledItem>
                            <StyledItem onClick={logout}>
                                <Icon> power_settings_new </Icon>
                                <Span> Logout </Span>
                            </StyledItem>
                        </MatxMenu>
                    </Box>
                </TopbarContainer>
            </TopbarRoot>
            <Modal
                open={showProjectModal}
                onClose={() => setshowProjectModal(false)}
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
                            <OpenProjectFlowModal
                                showOpenProject={true}
                                CreateRobotModalSetter={OpenRobotModalSetter}
                            />
                        </Box>
                    </Typography>
                </Box>
            </Modal>
            <Modal
                open={showVersionModal}
                onClose={() => setshowVersionModal(false)}
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
                            <OpenVersionModal
                                updateFlowDataSetter={updateFlowDataSetter}
                                curentFlowData={curentFlowData}
                                OpenVersionModalSetter={OpenVersionModalSetter}
                            />
                        </Box>
                    </Typography>
                </Box>
            </Modal>
            <Modal
                open={showPlayMessage}
                onClose={() => setshowPlayMessage(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={PlayMesagesstyle}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        <Box>
                            <Box>Select Robot</Box>
                            <Box>
                                Currently no robot is connected to Run this
                                flow. Please connect a robot from your Desktop.{' '}
                            </Box>
                            <Box>
                                If you haven't installed Robomotion for your
                                desktop yet
                            </Box>
                        </Box>
                        <Box className="">
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: '2rem',
                                }}
                            >
                                <Button
                                    style={{ color: 'blue' }}
                                    onClick={() => setshowPlayMessage(false)}
                                    variant="outlined"
                                >
                                    CANCEL
                                </Button>
                                <Button
                                    style={{ color: 'blue' }}
                                    variant="outlined"
                                >
                                    RUN
                                </Button>
                            </div>
                        </Box>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default React.memo(Layout1Topbar)
