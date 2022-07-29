/*global chrome*/
import Layout1Topbar from 'app/components/MatxLayout/Layout1/Layout1Topbar'
import { Colors } from './Colors'
import Scrollbar from 'react-perfect-scrollbar'
import useSettings from 'app/hooks/useSettings'
import { styled, Box, useTheme } from '@mui/system'
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
// import Popover from '@mui/material/Popover'
// import Button from '@material-ui/core/Button';
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography';
import { Button, Popover } from 'antd'
import { ColorPicker, useColor } from 'react-color-palette'
import 'react-color-palette/lib/css/styles.css'
import { Handle, Position } from 'react-flow-renderer'
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    useReactFlow,
} from 'react-flow-renderer'
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    IconButton,
    Modal,
    TextField,
    ThemeProvider,
    useMediaQuery,
} from '@mui/material'
import { InputLabel, MenuItem, Select } from '@material-ui/core'
import SidenavTheme from 'app/components/MatxTheme/SidenavTheme/SidenavTheme'
import SecondarySidebar from 'app/components/SecondarySidebar/SecondarySidebar'
import { sidenavCompactWidth } from 'app/utils/constant'
import { Outlet, useParams, useLocation } from 'react-router-dom'
import './RoboConsole.css'
import RoboConsoleTab from './RoboConsoleTab/RoboConsoleTab'
import {
    consoleFunctions,
    getFlows,
    retrieveFlowData,
    saveFlowData,
} from 'app/AppServices/apiService/Services'
// import { Button } from 'antd'
import {
    Add,
    KeyboardArrowDown,
    KeyboardArrowRight,
    PlusOne,
    SearchOutlined,
    Upload,
} from '@mui/icons-material'

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import { ActionTypes } from '@mui/base'
import { useBlocker, useNavigate } from 'react-router-dom'
import { Blocker } from 'history'
import FlowConsoleArea from './FlowConsoleArea'
import { MoreVertOutlined } from '@material-ui/icons'
import Loader from 'app/components/Loadable/Loader'

const flowKey = 'example-flow'

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}))

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}))

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 'max-content',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    display: 'flex',
    overflow: 'scroll',
    flexDirection: 'column',
    paddingBottom: '2rem',
}

const extensionStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 'max-content',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    display: 'flex',
    // overflow: 'scroll',
    flexDirection: 'column',
    padding: '3rem',
}

const options = [
    { name: 'option_1', key: 1 },
    { name: 'option_2', key: 2 },
    { name: 'option_3', key: 3 },
    { name: 'option_4', key: 4 },
]

//////////////DND/////////////////

const initialNodes = [
    {
        id: '1',
        // type: 'default',
        type: 'textUpdater',
        // data: { label: 'input node' },
        data: { label: 'Initial' },
        position: { x: 250, y: 5 },
    },
]

let id = 0
const getId = () => `dndnode_${id++}`
const handleStyle = { left: 10 }

////////left bar DND///////////

const onDragStart = (event, nodeType, label) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.setData('label', label)
    event.dataTransfer.effectAllowed = 'move'
}
////////////END DEN .////////////////////

export default function RoboConsole() {
    const classes = useStyles()
    const [formData, setformData] = useState({})
    const [color, setColor] = useColor('hex', '#12991212')
    const [showPalette, setshowPalette] = useState(false)
    const [currentWorkingFlow, setcurrentWorkingFlow] = useState()
    const [commonObject, setcommonObject] = useState({
        color: 'blue',
        name: 'default',
    })
    const { id } = useParams()
    const [currentFunctions, setcurrentFunctions] = useState([])
    const [checked, setChecked] = React.useState({})
    const [showConsoleTab, setshowConsoleTab] = useState(true)

    const [commonActions, setCommonActions] = useState([])

    const [subMenuFunctions, setsubMenuFunctions] = useState({
        browser: false,
    })
    const [menuFunctions, setmenuFunctions] = useState()
    const [menuFunctionsClone, setmenuFunctionsClone] = useState()
    const [isMenuActive, setIsMenuActive] = useState(false)
    const [curentFlowData, setcurentFlowData] = useState()
    const [newChanges, setnewChanges] = useState(false)
    const optionsContainers = useRef([])
    const inputContainers = useRef([])

    const [openColorModal, setopenColorModal] = useState(false)

    const [openBroswerExtension, setopenBroswerExtension] = useState(false)
    const { settings, updateSettings } = useSettings()
    const { layout1Settings, secondarySidebar } = settings
    const topbarTheme = settings.themes[layout1Settings.topbar.theme]
    const {
        leftSidebar: { mode: sidenavMode, show: showSidenav },
    } = layout1Settings

    const [isInputPropertyAvail, setisInputPropertyAvail] = useState(false)

    const [flowsData, setflowsData] = useState()

    const [dataDictAdded, setdataDictAdded] = useState(false)

    const textInput = React.useRef(null)

    // const history = useHistory();
    const navigate = useNavigate()

    const handleOpen = () => {
        setopenColorModal(true)
    }
    const handleClose = () => {
        setopenColorModal(false)
    }

    const ExtensionClose = () => {
        setopenBroswerExtension(false)
    }

    //////ACORDION

    const [expanded, setExpanded] = React.useState('panel1')

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false)
    }

    ///////END OF ACORDION

    /////////SIDEBAR

    const handleClickActive = (e, key) => {
        const activeElements = Array.from(
            document.getElementsByClassName('active')
        )
        activeElements.forEach((ele) => {
            if (ele.classList.contains('active')) {
                ele.classList.remove('active')
            }
        })
        e.target.classList.add('active')
    }

    useEffect(() => {
        getConsoleFuunction()
        getFlowData()
        let { settings } = ref.current
        let sidebarMode = settings.layout1Settings.leftSidebar.mode
        if (settings.layout1Settings.leftSidebar.show) {
            let mode = isMdScreen ? 'close' : sidebarMode
            updateSettings({ layout1Settings: { leftSidebar: { mode } } })
        }
    }, [])

    useEffect(() => {}, [commonObject])

    ///////////// POPOVER ////////////////////////
    // const [anchorEl, setAnchorEl] =
    //     (React.useState < HTMLButtonElement) | (null > null)
    const [anchorEl, setAnchorEl] = useState(null)

    const handlePopOverClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handlePopOverClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const popid = open ? 'simple-popover' : undefined

    //////////////DND /////////////////////////////////////
    const reactFlowWrapper = useRef(null)
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const [reactFlowInstance, setReactFlowInstance] = useState(null)
    const [selectedNodeID, setselectedNodeID] = useState()
    const { setViewport } = useReactFlow()



    const inspectElementExtension = () => {
        setopenBroswerExtension(true)

        // The ID of the extension we want to talk to.
        var editorExtensionId = 'abcdefghijklmnoabcdefhijklmnoabc'
        console.log(chrome,window, 'chromechromechrome')
        console.log(window.chrome.runtime, 'sssjs')
        window.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" }, "*");
        window.postMessage({ source: "dataaccessgateway-agent", payload: "requestInfo" }, "*");
        // if(chrome && chrome.runtime && chrome.runtime.sendMessage) {
        //     chrome.runtime.sendMessage(
        //       "abcdefghijklmnoabcdefhijklmnoabc",
        //       {greeting: "yes"},
        //       function (response) {
        //         console.log(response, 'dkldls')
        //         if (!response.success) console.log('error')
        //     }
        //     );
        //   }

        // Make a simple request:

        // chrome.runtime.sendMessage(
        //     editorExtensionId,
        //     { openUrlInEditor: 'open' },
        //     function (response) {
        //         console.log(response, 'dkldls')
        //         if (!response.success) console.log('error')
        //     }
        // )
    }

    const content = (
        <div className="elementOverCont">
            <div
                className="elementOver"
                onClick={() => inspectElementExtension()}
            >
                Inspect Element
            </div>
            <div className="elementOver">Hide Preview</div>
        </div>
    )

    function TextUpdaterNode({ data }) {
        // console.log(data, 'helppppppppppppp')
        const handlePopOverClick = useCallback((evt) => {
            console.log(evt, 'jimmmm')
            setAnchorEl(true)
        }, [])

        return (
            <>
                {/* <Handle type="target" position={Position.Left} /> */}
                {data?.label === 'Click Element' && (
                    <>
                        {' '}
                        <Handle type="target" position={Position.Top} />
                        <div className="robo_flow_node">
                            <div>
                                <label htmlFor="text">{data?.label}</label>
                            </div>
                            <Popover content={content} title="">
                                <div type="">
                                    <MoreVertOutlined />
                                </div>
                            </Popover>
                            {/* <Button
                                aria-describedby={popid}
                                variant="contained"
                                color="primary"
                                onClick={handlePopOverClick}
                            >
                                Open Popover
                            </Button>
                            <Popover
                                id={popid}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <Typography className={classes.typography}>
                                    The content of the Popover.
                                </Typography>
                            </Popover> */}
                        </div>
                        <Handle
                            type="source"
                            position={Position.Bottom}
                            id="a"
                        />
                    </>
                )}

                {data?.label !== 'Click Element' && (
                    <>
                        <Handle type="target" position={Position.Top} />
                        <div className="robo_flow_node">
                            <div>
                                <label htmlFor="text">{data?.label}</label>
                            </div>
                            {/* <div onClick={onClick}>
                                <MoreVertOutlined />{' '}
                            </div> */}
                        </div>
                        <Handle
                            type="source"
                            position={Position.Bottom}
                            id="a"
                        />
                    </>
                )}

                {/* <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} /> */}
            </>
        )
    }

    const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), [])

    useEffect(() => {
        if (optionsContainers.current.length !== 0) {
            optionsContainers?.current.map((optionsContainer) => {
                optionsContainer?.click()
            })
        }
        if (inputContainers.current.length !== 0) {
            inputContainers?.current.map((inputContainer) => {
                inputContainer?.click()
            })
        }
    }, [currentFunctions])

    const onConnect = useCallback((params, source, target) => {
        // handle the click event
        setnewChanges(true)

        setEdges((eds) => addEdge(params, eds))
    }, [])

    const onSave = useCallback(async () => {
        if (reactFlowInstance) {
            const data = {
                nodes: reactFlowInstance.toObject()?.nodes,
                link: reactFlowInstance.toObject()?.edges,
            }
            const flowData_ID = localStorage.getItem('flow_data_id')

            const res = await saveFlowData(data, id, flowData_ID)
            setnewChanges(false)
            const flow = reactFlowInstance.toObject()
            localStorage.setItem(flowKey, JSON.stringify(flow))
        }
    }, [reactFlowInstance])

    const onRestore = useCallback(async () => {
        const restoreFlow = async () => {
            const response = await retrieveFlowData(id)
            const flows = JSON.parse(localStorage.getItem(flowKey))

            const flow = {
                edges: response?.data?.data[0]?.link,
                nodes: response?.data?.data[0]?.nodes,
            }

            if (flow) {
                // const { x = 0, y = 0, zoom = 1 } = flow.viewport
                setNodes(flow.nodes || [])
                setEdges(flow.edges || [])
                // setViewport({ x, y, zoom })
            }
        }

        restoreFlow()
    }, [setNodes, setViewport])

    const onNodeClick = useCallback(
        async (event, node) => {
            if (textInput?.current) {
                textInput.current.value = null
            }

            // handle the click event
            setnewChanges(true)
            setselectedNodeID(node?.id)

            //Update NAme
            setcommonObject((prevState) => ({
                ...prevState,
                name: node?.data?.label,
            }))

            setcurrentFunctions(
                commonObject?.[`${node?.data?.label?.replace(' ', '_')}`]
            )

            //Load Functions from the server, this is needed when the saved page is reloaded.
            const response = await consoleFunctions()
            response?.data?.data?.map((menuFunction) => (
                <>
                    {menuFunction?.function_list.map((funct) => {
                        if (funct.function_name === node?.data?.label) {
                            setcurrentFunctions((prevState) => ({
                                ...prevState,
                                funct,
                            }))
                        }
                    })}
                </>
            ))

            commonActions?.map((action) => {
                if (
                    action?.action?.name ===
                    `${node?.data?.label?.replace(' ', '_')}`
                ) {
                    const returnValue = { ...action }

                    returnValue.action.selected = true
                    action = returnValue
                } else {
                    const returnValue = { ...action }
                    returnValue.action.selected = false
                    action = returnValue
                }

                return action
            })
        },
        [commonObject]
    )

    const onDragOver = useCallback((event) => {
        event.preventDefault()
        setnewChanges(true)
        event.dataTransfer.dropEffect = 'move'
    }, [])

    const onNodeDragStart = useCallback((event, node) => {
        setnewChanges(true)
    })

    const onDropCapture = useCallback((event, node) => {
        setnewChanges(true)
    })

    const onDragEnd = useCallback((event, node) => {
        setnewChanges(true)
    })

    const onNodeDragStop = useCallback((event, node) => {
        setnewChanges(true)
    })

    const onDrop = useCallback(
        (event, node) => {
            event.preventDefault()
            setnewChanges(true)

            const reactFlowBounds =
                reactFlowWrapper.current.getBoundingClientRect()
            const type = event.dataTransfer.getData('application/reactflow')
            const label = event.dataTransfer.getData('label')

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            })
            const newNode = {
                id: getId(),
                type: 'textUpdater',
                position,
                data: {
                    label: `${label}`,
                    options: {},
                },
            }

            setNodes((nds) => nds.concat(newNode))
        },
        [reactFlowInstance]
    )

    const yPos = useRef(0)
    const addNode = useCallback((label) => {
        yPos.current += 50
        setNodes((nodes) => {
            return [
                ...nodes,
                {
                    id: Math.random(),
                    position: { x: 100, y: yPos.current },
                    data: { label: label },
                },
            ]
        })
    }, [])

    ///////////////////////dnd END/////////////////////

    const theme = useTheme()
    const isMdScreen = useMediaQuery(theme.breakpoints.down('md'))

    const ref = useRef({ isMdScreen, settings })
    const layoutClasses = `theme-${theme.palette.type}`

    const getConsoleFuunction = async () => {
        const response = await consoleFunctions()

        setmenuFunctions(response?.data?.data)
        setmenuFunctionsClone(response?.data?.data)
    }

    const handleClick = () => {
        setIsMenuActive((current) => !current)
    }

    const updateFlowDataSetter = async () => {
        const response = await retrieveFlowData(id)

        setcurentFlowData(response?.data?.data)
    }

    const getFlowData = async () => {
        try {
            const res = await getFlows()
            // setloading(false)
            setflowsData(
                res?.data?.data.filter(
                    (flow) => flow?.shared_type === 'Private'
                )
            )

            const response = await retrieveFlowData(id)
            onRestore()
            setcurentFlowData(response?.data?.data)
            localStorage.setItem('flow_id', id)
            localStorage.setItem('flow_data_id', response?.data?.data[0]?.id)

            setcurrentWorkingFlow(
                res?.data?.data?.filter((flow) => flow.id === id)[0]
            )
        } catch (err) {
            console.log(err)
        }
    }

    const onConfirmRefresh = function (event) {
        event.preventDefault()
        return (event.returnValue = 'Are you sure you want to leave the page?')
    }

    const initBeforeUnLoad = (showExitPrompt) => {
        window.onbeforeunload = (event) => {
            if (showExitPrompt) {
                const e = event || window.event
                e.preventDefault()
                if (e) {
                    e.returnValue = ''
                }
                return ''
            }
        }
    }
    useEffect(() => {
        window.onbeforeunload = () =>
            "If you leave this page, you'll also leave the call"
        getFlowData(true)
        initBeforeUnLoad()
        window.addEventListener('onbeforeunload ', onConfirmRefresh, {
            capture: true,
        })
        window.onbeforeunload = (event) => {
            const e = event || window.event
            // Cancel the event
            e.preventDefault()
            if (e) {
                e.returnValue = '' // Legacy method for cross browser support
            }
            return '' // Legacy method for cross browser support
        }
    }, [])

    const onInputChange = (e, name) => {
        setnewChanges(true)
        setformData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
        var inputName = [e.target.name.replace(/_/g, '').toLowerCase()]

        const data = {
            input: { [e.target.name.replace(' ', '_')]: e.target.value },
        }

        const result = nodes?.forEach(function (c_node) {
            if (c_node.id === selectedNodeID) {
                const returnValue = { ...c_node }
                returnValue.data = {
                    ...c_node.data,
                    input: {
                        ...c_node.data.input,
                        [e.target.name.replace(/_/g, '').toLowerCase()]:
                            e.target.value,
                    },
                }

                c_node = returnValue

                setNodes((nds) =>
                    nds.map((node) => {
                        if (node.id === c_node.id) {
                            node.data = {
                                ...node.data,
                                input: {
                                    ...node.data.input,
                                    [e.target.name
                                        .replace(/_/g, '')
                                        .toLowerCase()]: e.target.value,
                                },
                            }
                        }

                        return node
                    })
                )
            }
        })
    }

    const onOutputChange = (e, name) => {
        setnewChanges(true)
        setformData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
        const results = nodes?.forEach(function (c_node) {
            if (c_node.id === selectedNodeID) {
                const returnValue = { ...c_node }

                returnValue.data = {
                    ...c_node.data,
                    output: {
                        ...c_node.data.output,
                        [e.target.name.replace(/_/g, '').toLowerCase()]:
                            e.target.value,
                    },
                }

                c_node = returnValue

                setNodes((nds) =>
                    nds.map((node) => {
                        if (node.id === c_node.id) {
                            node.data = {
                                ...node.data,
                                output: {
                                    ...node.data.output,
                                    [e.target.name
                                        .replace(/_/g, '')
                                        .toLowerCase()]: e.target.value,
                                },
                            }
                        }

                        return node
                    })
                )
            }
        })
    }
    const onOptionChange = (e, name) => {
        setnewChanges(true)
        setformData((prevState) => ({
            ...prevState,
            [e.target.selectedOptions[0].getAttribute('name')]: e.target.value,
        }))

        const result = nodes?.forEach(function (c_node) {
            if (c_node.id === selectedNodeID) {
                const returnValue = { ...c_node }

                returnValue.data = {
                    ...c_node.data,
                    options: {
                        ...c_node.data.options,
                        [e.target.selectedOptions[0]
                            .getAttribute('name')
                            .replace(/_/g, '')
                            .toLowerCase()]: e.target.value,
                    },
                }

                c_node = returnValue

                setNodes((nds) =>
                    nds.map((node) => {
                        if (node.id === c_node.id) {
                            // it's important that you create a new object here
                            // in order to notify react flow about the change
                            node.data = {
                                ...node.data,
                                options: {
                                    ...node.data.options,
                                    [e.target.selectedOptions[0]
                                        .getAttribute('name')
                                        .replace(/_/g, '')
                                        .toLowerCase()]: e.target.value,
                                },
                            }
                        }

                        return node
                    })
                )
            }
        })
    }

    // const [settingOption, setsettingOption] = useState(false)
    // let settingOption = false

    const onOptionChangeInit = (name, value, e) => {
        // settingOption = true
        setnewChanges(true)

        const result = nodes?.forEach(function (c_node) {
            if (c_node.id === selectedNodeID) {
                const returnValue = { ...c_node }

                returnValue.data = {
                    ...c_node.data,
                    options: {
                        ...c_node.data.options,
                        [name.replace(/_/g, '').toLowerCase()]: value,
                    },
                }

                c_node = returnValue

                setNodes((nds) =>
                    nds.map((node) => {
                        if (node.id === c_node.id) {
                            // it's important that you create a new object here
                            // in order to notify react flow about the change
                            node.data = {
                                ...node.data,
                                options: {
                                    ...node.data.options,
                                    [name.replace(/_/g, '').toLowerCase()]:
                                        value,
                                },
                            }
                        }

                        return node
                    })
                )

                // setsettingOption(false)
            }
        })
    }

    const onOptionInputChangeInit = (name, value) => {
        setnewChanges(true)
        setformData((prevState) => ({
            ...prevState,
            [name]: value,
        }))

        const result = nodes?.forEach(function (c_node) {
            if (c_node.id === selectedNodeID) {
                const returnValue = { ...c_node }

                returnValue.data = {
                    ...c_node.data,
                    input: {
                        ...c_node.data.input,
                        [name]: value,
                    },
                }

                c_node = returnValue

                setNodes((nds) =>
                    nds.map((node) => {
                        if (node.id === c_node.id) {
                            // it's important that you create a new object here
                            // in order to notify react flow about the change
                            node.data = {
                                ...node.data,
                                input: {
                                    ...node.data.input,
                                    [name.replace(/_/g, '').toLowerCase()]:
                                        value,
                                },
                            }
                        }

                        return node
                    })
                )
            }
        })
    }

    const onBooleanChange = (e, name) => {
        setnewChanges(true)
        setChecked((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.checked,
        }))

        setformData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.checked,
        }))

        const result = nodes?.forEach(function (c_node) {
            if (c_node.id === selectedNodeID) {
                const returnValue = { ...c_node }

                returnValue.data = {
                    ...c_node.data,
                    options: {
                        ...c_node.data.options,
                        [e.target.name.replace(/_/g, '').toLowerCase()]:
                            e.target.checked,
                    },
                }

                c_node = returnValue

                setNodes((nds) =>
                    nds.map((node) => {
                        if (node.id === c_node.id) {
                            // it's important that you create a new object here
                            // in order to notify react flow about the change
                            node.data = {
                                ...node.data,
                                options: {
                                    ...node.data.options,
                                    [e.target.name
                                        .replace(/_/g, '')
                                        .toLowerCase()]: e.target.checked,
                                },
                            }
                        }

                        return node
                    })
                )
            }
        })
    }

    const onBooleanChangeInit = (name, value) => {
        setnewChanges(true)
        setChecked((prevState) => ({
            ...prevState,
            [name]: value,
        }))

        setformData((prevState) => ({
            ...prevState,
            [name]: value,
        }))

        const result = nodes?.forEach(function (c_node) {
            if (c_node.id === selectedNodeID) {
                const returnValue = { ...c_node }

                returnValue.data = {
                    ...c_node.data,
                    options: {
                        ...c_node.data.options,
                        [name.replace(/_/g, '').toLowerCase()]: value,
                    },
                }

                c_node = returnValue

                setNodes((nds) =>
                    nds.map((node) => {
                        if (node.id === c_node.id) {
                            // it's important that you create a new object here
                            // in order to notify react flow about the change
                            node.data = {
                                ...node.data,
                                options: {
                                    ...node.data.options,
                                    [name.replace(/_/g, '').toLowerCase()]:
                                        value,
                                },
                            }
                        }

                        return node
                    })
                )
            }
        })
    }

    const onPropertiesOptionChange = (e, name) => {
        setdataDictAdded(false)
        setnewChanges(true)
        setformData((prevState) => ({
            ...prevState,
            [e.target.selectedOptions[0].getAttribute('name')]: e.target.value,
        }))
    }

    const onPropertiesChange = (e, name) => {
        setdataDictAdded(false)
        setnewChanges(true)
        setformData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onPropertiesSubmit = (e, name) => {
        const results = nodes?.forEach(function (c_node) {
            if (c_node.id === selectedNodeID) {
                const returnValue = { ...c_node }

                returnValue.data = {
                    ...c_node.data,
                    input: {
                        ...c_node?.data?.input,
                        properties: [
                            {
                                selectortype: formData.Selector_Type || 'xpath',
                                selector: formData.Selector,
                                name: formData.Name,
                            },
                        ],
                    },
                }
                c_node = returnValue

                setNodes((nds) =>
                    nds.map((node) => {
                        if (node.id === c_node.id) {
                            // it's important that you create a new object here
                            // in order to notify react flow about the change

                            if (isInputPropertyAvail === false) {
                                node.data = {
                                    ...node.data,
                                    input: {
                                        ...node?.data?.input,
                                        properties: [
                                            {
                                                selectortype:
                                                    formData.Selector_Type ||
                                                    'xpath',
                                                selector: formData.Selector,
                                                name: formData.Name,
                                            },
                                        ],
                                    },
                                }
                                setisInputPropertyAvail(true)
                                // return node
                            } else {
                                node.data = {
                                    ...node.data,
                                    input: {
                                        ...node?.data?.input,
                                        properties: [
                                            ...node?.data?.input?.properties,
                                            {
                                                selectortype:
                                                    formData.Selector_Type,
                                                selector: formData.Selector,
                                                name: formData.Name,
                                            },
                                        ],
                                    },
                                }
                                return node
                            }
                        }
                        return node
                    })
                )
                setdataDictAdded('Added')
            }
        })
    }

    const newChangesSetter = (value) => {
        setnewChanges(value)
    }

    const searchMenuFunctions = (e) => {
        const search = e.target.value

        const duet = menuFunctionsClone.map((element) => {
            return {
                ...element,
                function_list: element.function_list.filter((subElement) =>
                    subElement.function_name
                        .toLowerCase()
                        .includes(search.toLowerCase())
                ),
            }
        })

        if (duet[0].function_list.length !== 0) {
            setsubMenuFunctions((prevState) => ({
                ...prevState,
                Browser: true,
            }))
        } else {
            setsubMenuFunctions((prevState) => ({
                ...prevState,
                Browser: false,
            }))
        }
        if (duet[1].function_list.length !== 0) {
            setsubMenuFunctions((prevState) => ({
                ...prevState,
                CSV: true,
            }))
        } else {
            setsubMenuFunctions((prevState) => ({
                ...prevState,
                CSV: false,
            }))
        }

        if (search === '') {
            setsubMenuFunctions((prevState) => ({
                ...prevState,
                CSV: false,
                Browser: false,
            }))
        }

        setmenuFunctions(duet)
    }
    return (
        <div>
            {layout1Settings.topbar.show && layout1Settings.topbar.fixed && (
                <ThemeProvider theme={topbarTheme}>
                    <Layout1Topbar
                        isConsole={true}
                        fixed={true}
                        onSave={onSave}
                        onRestore={onRestore}
                        flowName={curentFlowData?.[0]?.flow_name}
                        curentFlowData={curentFlowData}
                        updateFlowDataSetter={updateFlowDataSetter}
                        newChanges={newChanges}
                        newChangesSetter={newChangesSetter}
                        className="elevation-z8"
                        setshowConsoleTab={setshowConsoleTab}
                        showConsoleTab={showConsoleTab}
                    />
                </ThemeProvider>
            )}
            <ThemeProvider theme={topbarTheme}>
                <div className="console_layout_container">
                    <div className="console_left_sidebar">
                        <div>
                            <div className="console_search">
                                {' '}
                                <TextField
                                    // fullWidth
                                    id="standard-bare"
                                    variant="outlined"
                                    defaultValue=""
                                    onChange={(e) => searchMenuFunctions(e)}
                                    placeholder="Search..."
                                    InputProps={{
                                        style: {
                                            width: '100%',
                                            paddingTop: '1rem',
                                            height: '50px',
                                            paddingLeft: '2px',
                                            marginTop: '10px',
                                            marginBottom: '10px',
                                        },
                                        endAdornment: (
                                            <IconButton>
                                                <SearchOutlined />
                                            </IconButton>
                                        ),
                                    }}
                                />
                            </div>
                            <div>
                                <div className="function_menu_wrapper">
                                    {menuFunctions?.map((menu) => (
                                        <>
                                            <div
                                                className="function_menu_list"
                                                key={menu.key}
                                                onClick={(e) => {
                                                    handleClickActive(
                                                        e,
                                                        menu.key
                                                    )
                                                    setsubMenuFunctions(
                                                        (prevState) => ({
                                                            ...prevState,
                                                            [`${menu.group_name}`]:
                                                                !subMenuFunctions?.[
                                                                    `${menu.group_name}`
                                                                ],
                                                        })
                                                    )
                                                    handleClick()
                                                }}
                                            >
                                                <div className="menu_name">
                                                    <div>
                                                        {subMenuFunctions?.[
                                                            `${menu.group_name}`
                                                        ] ? (
                                                            <KeyboardArrowDown />
                                                        ) : (
                                                            <KeyboardArrowRight />
                                                        )}
                                                    </div>
                                                    {menu?.group_name}
                                                </div>
                                            </div>
                                            {subMenuFunctions?.[
                                                `${menu.group_name}`
                                            ] && (
                                                <>
                                                    <div
                                                        style={{
                                                            backgroundColor: '',
                                                        }}
                                                        className="sub_menus_functions"
                                                    >
                                                        {subMenuFunctions?.[
                                                            `${menu.group_name}`
                                                        ] &&
                                                            menu?.function_list?.map(
                                                                (funct) => (
                                                                    <div
                                                                        onDragStartCapture={() => {
                                                                            setcommonObject(
                                                                                (
                                                                                    prevState
                                                                                ) => ({
                                                                                    ...prevState,
                                                                                    [`${funct?.function_name?.replace(
                                                                                        ' ',
                                                                                        '_'
                                                                                    )}`]:
                                                                                        {
                                                                                            funct,
                                                                                            // selected: true,
                                                                                        },
                                                                                })
                                                                            )
                                                                            setsubMenuFunctions(
                                                                                (
                                                                                    prevState
                                                                                ) => ({
                                                                                    ...prevState,
                                                                                    [`${menu.group_name}`]: true,
                                                                                })
                                                                            )
                                                                        }}
                                                                        className="dndnode sub_menu_function"
                                                                        onDragStart={(
                                                                            event
                                                                        ) =>
                                                                            onDragStart(
                                                                                event,
                                                                                'default',
                                                                                `${funct?.function_name}`
                                                                            )
                                                                        }
                                                                        draggable
                                                                    >
                                                                        {
                                                                            funct?.function_name
                                                                        }
                                                                    </div>
                                                                )
                                                            )}
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="console_main_center"
                        style={{
                            background: `${
                                showConsoleTab ? '#f5f6f7' : '#f5f6f7'
                            }`,
                        }}
                    >
                        <div
                            style={{
                                height: '50%',
                                borderBottom: '2px solid #ccc',
                                backgroundColor: '#f8f9fa',
                            }}
                        >
                            <div className="dndflow">
                                <FlowConsoleArea
                                    menuFunctions={menuFunctions}
                                    addNode={addNode}
                                    searchMenuFunctions={searchMenuFunctions}
                                >
                                    <ReactFlowProvider>
                                        <div
                                            className="reactflow-wrapper"
                                            ref={reactFlowWrapper}
                                        >
                                            <ReactFlow
                                                nodeTypes={nodeTypes}
                                                zoomOnScroll={false}
                                                nodes={nodes}
                                                edges={edges}
                                                onNodesChange={onNodesChange}
                                                onEdgesChange={onEdgesChange}
                                                onConnect={onConnect}
                                                onInit={setReactFlowInstance}
                                                onDrop={onDrop}
                                                onNodeDragStop={onNodeDragStop}
                                                onDragOver={onDragOver}
                                                onNodeDragStart={
                                                    onNodeDragStart
                                                }
                                                onDragEnd={onDragEnd}
                                                onDropCapture={onDropCapture}
                                                // fitView
                                                onNodeClick={onNodeClick}
                                                defaultZoom={1}
                                            >
                                                <Controls />
                                            </ReactFlow>
                                        </div>
                                    </ReactFlowProvider>
                                </FlowConsoleArea>
                            </div>
                        </div>
                        {showConsoleTab && (
                            <div
                                style={{
                                    height: '50%',
                                    backgroundColor: '#ffffff',
                                }}
                            >
                                <RoboConsoleTab />
                            </div>
                        )}
                    </div>
                    <div className="console_right_sidebar">
                        <div>
                            <Accordion
                                expanded={expanded === 'panel1'}
                                onChange={handleChange('panel1')}
                            >
                                <AccordionSummary
                                    aria-controls="panel1d-content"
                                    id="panel1d-header"
                                >
                                    <Typography>Common</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <div>
                                            {' '}
                                            <Box
                                                component="form"
                                                sx={{
                                                    '& > :not(style)': {
                                                        m: 1,
                                                        width: '25ch',
                                                    },
                                                }}
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <TextField
                                                    id="standard-basic"
                                                    label="Name"
                                                    variant="standard"
                                                    value={`${commonObject?.name}`}
                                                    InputProps={{
                                                        style: {
                                                            width: '150px',
                                                            height: '30px',
                                                            paddingLeft: '2px',
                                                        },
                                                    }}
                                                />
                                                <TextField
                                                    id="standard-basic"
                                                    label="Color"
                                                    variant="standard"
                                                    // value="red"
                                                    InputProps={{
                                                        style: {
                                                            width: '150px',
                                                            height: '30px',
                                                            paddingLeft: '2px',
                                                        },
                                                        startAdornment: (
                                                            <div
                                                                onClick={() =>
                                                                    handleOpen()
                                                                }
                                                                style={{
                                                                    backgroundColor: `${commonObject?.color}`,
                                                                    width: '20px',
                                                                    height: '20px',
                                                                }}
                                                            ></div>
                                                        ),
                                                    }}
                                                />
                                                <TextField
                                                    id="standard-basic"
                                                    label="Delay Before (sec)"
                                                    variant="standard"
                                                    value="0"
                                                    InputProps={{
                                                        style: {
                                                            width: '150px',
                                                            height: '30px',
                                                            paddingLeft: '2px',
                                                        },
                                                    }}
                                                />
                                                <TextField
                                                    id="standard-basic"
                                                    label="Delay After (sec)"
                                                    variant="standard"
                                                    value="0"
                                                    InputProps={{
                                                        style: {
                                                            width: '150px',
                                                            height: '30px',
                                                            paddingLeft: '2px',
                                                        },
                                                    }}
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            name="SomeName"
                                                            value="SomeValue"
                                                        />
                                                    }
                                                    label="Continue or Error"
                                                />
                                            </Box>
                                        </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            {currentFunctions?.funct?.input !== undefined && (
                                <Accordion
                                    expanded={expanded === 'panel2'}
                                    onChange={handleChange('panel2')}
                                >
                                    <AccordionSummary
                                        aria-controls="panel2d-content"
                                        id="panel2d-header"
                                    >
                                        <Typography>Input</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            <>
                                                {currentFunctions?.funct?.input
                                                    .length !== 0 &&
                                                    currentFunctions?.funct?.input?.map(
                                                        (input, index) => (
                                                            <>
                                                                {input.type ===
                                                                    'enum' && (
                                                                    <>
                                                                        {/* ///Update The default option values on nodeClick for the functions, this is to cater for when user doesn't click an option */}
                                                                        {input.default && (
                                                                            <div
                                                                                ref={(
                                                                                    el
                                                                                ) =>
                                                                                    (inputContainers.current[
                                                                                        index
                                                                                    ] =
                                                                                        el)
                                                                                }
                                                                                id={`input_option_container_${index}`}
                                                                                onClick={() =>
                                                                                    onOptionInputChangeInit(
                                                                                        input.name,
                                                                                        input.default
                                                                                    )
                                                                                }
                                                                            ></div>
                                                                        )}
                                                                        <select
                                                                            style={{
                                                                                width: '100%',
                                                                                height: '40px',
                                                                                marginTop:
                                                                                    '10px',
                                                                            }}
                                                                            id="ddlCountry"
                                                                            className="form-control select-class"
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                onPropertiesOptionChange(
                                                                                    e
                                                                                )
                                                                            }
                                                                            defaultValue="id"
                                                                        >
                                                                            {input?.options?.map(
                                                                                (
                                                                                    e
                                                                                ) => (
                                                                                    <option
                                                                                        name={input?.name.replace(
                                                                                            ' ',
                                                                                            '_'
                                                                                        )}
                                                                                        value={
                                                                                            e
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            e
                                                                                        }
                                                                                    </option>
                                                                                )
                                                                            )}
                                                                        </select>
                                                                    </>
                                                                )}
                                                                {input.type ===
                                                                    'list' && (
                                                                    <>
                                                                        {input?.properties.map(
                                                                            (
                                                                                property
                                                                            ) => (
                                                                                <>
                                                                                    <div value="0">
                                                                                        {
                                                                                            property?.name
                                                                                        }
                                                                                    </div>
                                                                                    {property.type ===
                                                                                        'enum' && (
                                                                                        <>
                                                                                            <select
                                                                                                style={{
                                                                                                    width: '100%',
                                                                                                    height: '40px',
                                                                                                }}
                                                                                                id="ddlCountry"
                                                                                                className="form-control select-class"
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) =>
                                                                                                    onPropertiesOptionChange(
                                                                                                        e
                                                                                                    )
                                                                                                }
                                                                                                defaultValue="id"
                                                                                            >
                                                                                                {property?.options?.map(
                                                                                                    (
                                                                                                        e
                                                                                                    ) => (
                                                                                                        <option
                                                                                                            name={property?.name.replace(
                                                                                                                ' ',
                                                                                                                '_'
                                                                                                            )}
                                                                                                            value={
                                                                                                                e
                                                                                                            }
                                                                                                        >
                                                                                                            {
                                                                                                                e
                                                                                                            }
                                                                                                        </option>
                                                                                                    )
                                                                                                )}
                                                                                            </select>
                                                                                        </>
                                                                                    )}

                                                                                    {property.type ===
                                                                                        'text' && (
                                                                                        <TextField
                                                                                            inputRef={
                                                                                                textInput
                                                                                            }
                                                                                            id="standard-basic"
                                                                                            label={
                                                                                                property?.name
                                                                                            }
                                                                                            variant="standard"
                                                                                            name={
                                                                                                property?.name
                                                                                            }
                                                                                            // value=""
                                                                                            onChange={(
                                                                                                e
                                                                                            ) =>
                                                                                                onPropertiesChange(
                                                                                                    e
                                                                                                )
                                                                                            }
                                                                                            InputProps={{
                                                                                                style: {
                                                                                                    width: '150px',
                                                                                                    height: '30px',
                                                                                                    paddingLeft:
                                                                                                        '2px',
                                                                                                },
                                                                                            }}
                                                                                        />
                                                                                    )}

                                                                                    {property.type ===
                                                                                        'path' && (
                                                                                        <TextField
                                                                                            inputRef={
                                                                                                textInput
                                                                                            }
                                                                                            id="standard-basic"
                                                                                            label={
                                                                                                property?.name
                                                                                            }
                                                                                            variant="standard"
                                                                                            name={
                                                                                                property?.name
                                                                                            }
                                                                                            // value=""
                                                                                            onChange={(
                                                                                                e
                                                                                            ) =>
                                                                                                onPropertiesChange(
                                                                                                    e
                                                                                                )
                                                                                            }
                                                                                            InputProps={{
                                                                                                style: {
                                                                                                    width: '150px',
                                                                                                    height: '30px',
                                                                                                    paddingLeft:
                                                                                                        '2px',
                                                                                                },
                                                                                            }}
                                                                                        />
                                                                                    )}
                                                                                </>
                                                                            )
                                                                        )}

                                                                        {dataDictAdded ? (
                                                                            <div
                                                                                style={{
                                                                                    color: 'green',
                                                                                }}
                                                                            >
                                                                                Added
                                                                            </div>
                                                                        ) : (
                                                                            <div></div>
                                                                        )}
                                                                        <Button
                                                                            onClick={() =>
                                                                                onPropertiesSubmit()
                                                                            }
                                                                            style={{
                                                                                marginTop:
                                                                                    '2px',
                                                                            }}
                                                                        >
                                                                            Add
                                                                        </Button>
                                                                    </>
                                                                )}

                                                                {input.type ===
                                                                    'page_id' && (
                                                                    <TextField
                                                                        inputRef={
                                                                            textInput
                                                                        }
                                                                        id="standard-basic"
                                                                        label={
                                                                            input?.name
                                                                        }
                                                                        variant="standard"
                                                                        name={input?.name
                                                                            .replace(
                                                                                ' ',
                                                                                ''
                                                                            )
                                                                            .toLowerCase()}
                                                                        // value=""
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            onInputChange(
                                                                                e
                                                                            )
                                                                        }
                                                                        InputProps={{
                                                                            style: {
                                                                                width: '150px',
                                                                                height: '30px',
                                                                                paddingLeft:
                                                                                    '2px',
                                                                            },
                                                                        }}
                                                                    />
                                                                )}

                                                                {input.type ===
                                                                    'text' && (
                                                                    <TextField
                                                                        inputRef={
                                                                            textInput
                                                                        }
                                                                        id="standard-basic"
                                                                        label={
                                                                            input?.name
                                                                        }
                                                                        variant="standard"
                                                                        name={
                                                                            input?.name
                                                                        }
                                                                        // value=""
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            onInputChange(
                                                                                e
                                                                            )
                                                                        }
                                                                        InputProps={{
                                                                            style: {
                                                                                width: '150px',
                                                                                height: '30px',
                                                                                paddingLeft:
                                                                                    '2px',
                                                                            },
                                                                        }}
                                                                    />
                                                                )}

                                                                {input.type ===
                                                                    'path' && (
                                                                    <TextField
                                                                        inputRef={
                                                                            textInput
                                                                        }
                                                                        id="standard-basic"
                                                                        label={
                                                                            input?.name
                                                                        }
                                                                        variant="standard"
                                                                        name={input?.name
                                                                            .replace(
                                                                                ' ',
                                                                                ''
                                                                            )
                                                                            .toLowerCase()}
                                                                        // value=""
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            onInputChange(
                                                                                e
                                                                            )
                                                                        }
                                                                        InputProps={{
                                                                            style: {
                                                                                width: '150px',
                                                                                height: '30px',
                                                                                paddingLeft:
                                                                                    '2px',
                                                                            },
                                                                        }}
                                                                    />
                                                                )}
                                                                {input.type ===
                                                                    'data_dict' && (
                                                                    <TextField
                                                                        inputRef={
                                                                            textInput
                                                                        }
                                                                        id="standard-basic"
                                                                        label={
                                                                            input?.name
                                                                        }
                                                                        variant="standard"
                                                                        name={
                                                                            input?.name
                                                                        }
                                                                        // value=""
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            onInputChange(
                                                                                e
                                                                            )
                                                                        }
                                                                        InputProps={{
                                                                            style: {
                                                                                width: '150px',
                                                                                height: '30px',
                                                                                paddingLeft:
                                                                                    '2px',
                                                                            },
                                                                        }}
                                                                    />
                                                                )}
                                                                {input.type ===
                                                                    'url' && (
                                                                    <TextField
                                                                        inputRef={
                                                                            textInput
                                                                        }
                                                                        id="standard-basic"
                                                                        label={
                                                                            input?.name
                                                                        }
                                                                        variant="standard"
                                                                        name={
                                                                            input?.name
                                                                        }
                                                                        // value=""
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            onInputChange(
                                                                                e
                                                                            )
                                                                        }
                                                                        InputProps={{
                                                                            style: {
                                                                                width: '150px',
                                                                                height: '30px',
                                                                                paddingLeft:
                                                                                    '2px',
                                                                            },
                                                                        }}
                                                                    />
                                                                )}
                                                            </>
                                                        )
                                                    )}
                                            </>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            )}
                            {currentFunctions?.funct?.output.length !== 0 && (
                                <Accordion
                                    expanded={expanded === 'panel2'}
                                    onChange={handleChange('panel2')}
                                >
                                    <AccordionSummary
                                        aria-controls="panel2d-content"
                                        id="panel2d-header"
                                    >
                                        <Typography>Output</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            <>
                                                {currentFunctions?.funct?.output
                                                    .length !== 0 &&
                                                    currentFunctions?.funct?.output?.map(
                                                        (output) => (
                                                            <>
                                                                {' '}
                                                                <TextField
                                                                    inputRef={
                                                                        textInput
                                                                    }
                                                                    id="standard-basic"
                                                                    label={
                                                                        output?.type
                                                                    }
                                                                    name={
                                                                        output?.type
                                                                    }
                                                                    variant="standard"
                                                                    // value=""
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        onOutputChange(
                                                                            e
                                                                        )
                                                                    }
                                                                    InputProps={{
                                                                        style: {
                                                                            width: '150px',
                                                                            height: '30px',
                                                                            paddingLeft:
                                                                                '2px',
                                                                        },
                                                                    }}
                                                                />
                                                            </>
                                                        )
                                                    )}
                                            </>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            )}

                            {currentFunctions?.funct?.options.length !== 0 && (
                                <>
                                    <Accordion
                                        expanded={expanded === 'panel3'}
                                        onChange={handleChange('panel3')}
                                    >
                                        <AccordionSummary
                                            aria-controls="panel3d-content"
                                            id="panel3d-header"
                                        >
                                            <Typography>Options</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {currentFunctions?.funct?.options?.map(
                                                (option, index) => (
                                                    <>
                                                        {option?.type ===
                                                            'enum' && (
                                                            <>
                                                                {/* ///Update The default option values on nodeClick for the functions, this is to cater for when user doesn't click an option */}
                                                                {option.default && (
                                                                    <div
                                                                        ref={(
                                                                            el
                                                                        ) =>
                                                                            (optionsContainers.current[
                                                                                index
                                                                            ] =
                                                                                el)
                                                                        }
                                                                        id={`container_${index}`}
                                                                        onClick={() =>
                                                                            onOptionChangeInit(
                                                                                option.name,
                                                                                option.default
                                                                            )
                                                                        }
                                                                    ></div>
                                                                )}

                                                                <div value="0">
                                                                    {
                                                                        option.name
                                                                    }
                                                                </div>

                                                                <select
                                                                    style={{
                                                                        width: '100%',
                                                                        height: '40px',
                                                                    }}
                                                                    id="ddlCountry"
                                                                    value=""
                                                                    defaultValue={
                                                                        option.default
                                                                    }
                                                                    className="form-control select-class"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        onOptionChange(
                                                                            e
                                                                        )
                                                                    }
                                                                >
                                                                    {option?.options?.map(
                                                                        (e) => (
                                                                            <>
                                                                                {option.default ===
                                                                                    e && (
                                                                                    <>
                                                                                        <option
                                                                                            name={
                                                                                                option.name
                                                                                            }
                                                                                            value={
                                                                                                e
                                                                                            }
                                                                                            selected
                                                                                        >
                                                                                            {
                                                                                                e
                                                                                            }
                                                                                        </option>
                                                                                    </>
                                                                                )}
                                                                                {option.default !==
                                                                                    e && (
                                                                                    <>
                                                                                        <option
                                                                                            name={
                                                                                                option.name
                                                                                            }
                                                                                            value={
                                                                                                e
                                                                                            }
                                                                                            selected
                                                                                        >
                                                                                            {
                                                                                                e
                                                                                            }
                                                                                        </option>
                                                                                    </>
                                                                                )}
                                                                            </>
                                                                        )
                                                                    )}
                                                                </select>
                                                            </>
                                                        )}
                                                        {option?.type ===
                                                            'boolean' && (
                                                            <>
                                                                {/* ///Update The default option values on nodeClick for the functions, this is to cater for when user doesn't click an option */}
                                                                {option.default && (
                                                                    <div
                                                                        ref={(
                                                                            el
                                                                        ) =>
                                                                            (optionsContainers.current[
                                                                                index
                                                                            ] =
                                                                                el)
                                                                        }
                                                                        id={`container_${index}`}
                                                                        onClick={() =>
                                                                            onBooleanChangeInit(
                                                                                option.name,
                                                                                true
                                                                            )
                                                                        }
                                                                    ></div>
                                                                )}
                                                                <FormGroup
                                                                    aria-label="Temas"
                                                                    row={true}
                                                                >
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                checked={
                                                                                    checked[
                                                                                        `${option?.name}`
                                                                                    ]
                                                                                }
                                                                                name={
                                                                                    option?.name
                                                                                }
                                                                                inputProps={{
                                                                                    'aria-label':
                                                                                        'controlled',
                                                                                }}
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    onBooleanChange(
                                                                                        e
                                                                                    )
                                                                                }
                                                                            />
                                                                        }
                                                                        label={
                                                                            option?.name
                                                                        }
                                                                    />
                                                                </FormGroup>
                                                            </>
                                                        )}
                                                    </>
                                                )
                                            )}
                                        </AccordionDetails>
                                    </Accordion>
                                </>
                            )}
                        </div>
                    </div>
                    <Button onClick={handleOpen}>Open modal</Button>
                    <Modal
                        open={openColorModal}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            {!showPalette && (
                                <>
                                    <Typography
                                        id="modal-modal-title"
                                        variant="h6"
                                        component="h2"
                                    >
                                        <div>
                                            <div className="modal_color_nav">
                                                <div
                                                    className="modal_color_button"
                                                    onClick={() => {
                                                        handleClose()
                                                        setshowPalette(false)
                                                    }}
                                                >
                                                    Cancel
                                                </div>
                                                <div>Choose a color</div>
                                                <div
                                                    onClick={() => {
                                                        // setcommonObject(
                                                        //     (prevState) => ({
                                                        //         ...prevState,
                                                        //         color: `${color?.hex}`,
                                                        //     })
                                                        // )
                                                    }}
                                                    className="modal_color_button"
                                                    style={{
                                                        backgroundColor:
                                                            'green',
                                                        color: '#ffffff',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    Select
                                                </div>
                                            </div>
                                        </div>
                                    </Typography>
                                    <div className="color_map_div">
                                        {Colors?.map((color) => (
                                            <div
                                                onClick={() =>
                                                    setcommonObject(
                                                        (prevState) => ({
                                                            ...prevState,
                                                            color: `${color?.color}`,
                                                        })
                                                    )
                                                }
                                                className="color_map_in_div"
                                                style={{
                                                    width: '60px',
                                                    height: '50px',
                                                    backgroundColor: `${color?.color}`,
                                                }}
                                            ></div>
                                        ))}
                                    </div>
                                    <div>
                                        <div
                                            style={{
                                                marginLeft: '.5rem',
                                                // marginBottom:'.5rem'
                                            }}
                                        >
                                            Custom
                                        </div>
                                        <div
                                            style={{
                                                border: '1px solid #ccc',
                                                width: '60px',
                                                marginLeft: '.5rem',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => setshowPalette(true)}
                                        >
                                            <Add />
                                        </div>
                                    </div>
                                </>
                            )}
                            {showPalette && (
                                <>
                                    <Typography
                                        id="modal-modal-title"
                                        variant="h6"
                                        component="h2"
                                    >
                                        <div>
                                            <div className="modal_color_nav">
                                                <div
                                                    className="modal_color_button"
                                                    onClick={() => {
                                                        handleClose()
                                                        setshowPalette(false)
                                                    }}
                                                >
                                                    Cancel
                                                </div>
                                                <div>Choose a color</div>
                                                <div
                                                    onClick={() => {
                                                        setcommonObject(
                                                            (prevState) => ({
                                                                ...prevState,
                                                                color: `${color?.hex}`,
                                                            })
                                                        )
                                                    }}
                                                    className="modal_color_button"
                                                    style={{
                                                        backgroundColor:
                                                            'green',
                                                        color: '#ffffff',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    Select
                                                </div>
                                            </div>
                                        </div>
                                    </Typography>
                                    <div style={{ marginLeft: '2rem' }}>
                                        {' '}
                                        <div
                                            style={{
                                                backgroundColor: `${color?.hex}`,
                                                height: '40px',
                                                width: '60px',
                                                // border: '2px solid red',
                                                margin: '1rem 0',
                                            }}
                                        ></div>
                                        <ColorPicker
                                            width={456}
                                            height={228}
                                            color={color}
                                            onChange={setColor}
                                            hideHSV
                                            dark
                                        />
                                    </div>
                                </>
                            )}
                        </Box>
                    </Modal>
                </div>
            </ThemeProvider>
            {/* ////// extension modal */}
            <Modal
                open={openBroswerExtension}
                onClose={ExtensionClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={extensionStyle}>
                    <div>
                        <h2>Waiting Inspect</h2>
                    </div>
                    <div>
                        <p>
                            Web Inspect mode has been activated. You can now
                            open a new browser tab or go to an existing tab to
                            inspect a web element.
                        </p>
                        <p>
                            Just click left mouse button to inspect an element.
                            The browser will return to Flow Designer.
                        </p>
                        <p>
                            If Ctrl key is pressed while clicking, this will
                            open advanced XPath editor.
                        </p>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            margin: '1rem',
                        }}
                    >
                        <Loader />
                    </div>
                    <div
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                        <Button
                            style={{ width: 'max-content', cursor: 'pointer' }}
                            onClick={() => setopenBroswerExtension(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}
