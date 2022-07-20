import {
    ArrowDropDownCircleTwoTone,
    CloseRounded,
    SearchOutlined,
} from '@mui/icons-material'
// import { Input, Select } from 'antd'
// import { Box } from '@mui/system'
import './OpenVersionModal.css'
import 'antd/dist/antd.css'
import { Option } from 'antd/lib/mentions'
// import axios from 'axios'
// import { Button, IconButton, TextField, Typography } from '@mui/material'
import OpenProjectTab from 'app/components/tab/OpenProjectTab'
import CreateFlowModal from '../CreateFlowModal/CreateFlowModal'
import { MatxMenu } from 'app/components'
// import { Option } from 'antd/lib/mentions'
import { addFlowData, getFlows, getUsers, inviteUserToFlow, shareFlow } from 'app/AppServices/apiService/Services'
import React, { useState, useEffect } from 'react'
// import MUIRobotTable from '../../shared/Table/MUIRobotTable'
// import React, { FC, useState, MouseEvent } from 'react'
import debounce from 'lodash/debounce'

import { makeStyles } from '@material-ui/core/styles'
import MuiCheckbox from '@material-ui/core/Checkbox'
import MuiCircularProgress from '@material-ui/core/CircularProgress'
import MuiPaper from '@material-ui/core/Paper'
import MuiTable from '@material-ui/core/Table'
import MuiTableCell from '@material-ui/core/TableCell'
import MuiTableHead from '@material-ui/core/TableHead'
import MuiTablePagination from '@material-ui/core/TablePagination'
import MuiTableRow from '@material-ui/core/TableRow'
import Delete from '@material-ui/icons/Delete'
import Refresh from '@material-ui/icons/Refresh'
import Save from '@material-ui/icons/Save'
import MaterialTable from 'material-table'
//////
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
// import CreateFlowModal from '../../../../components/Modal/CreateFlowModal/CreateFlowModal'
import { useNavigate } from 'react-router-dom'
////
import { forwardRef } from 'react'
// import { MatxMenu } from 'app/components'
import {
    Avatar,
    FormControl,
    FormControlLabel,
    FormLabel,
    Hidden,
    Icon,
    IconButton,
    Input,
    MenuItem,
    Modal,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { styled, useTheme, Box } from '@mui/system'

// import CreateVersionModal from '../CreateVersionModal/CreateVersionModal'

////
// import { Span } from '../../../components/Typography'
import { Span } from 'app/components/Typography'
import { notification } from 'antd'
import axios from 'axios'
import { CloudCircleOutlined, WebOutlined } from '@mui/icons-material'
import { SecurityOutlined } from '@material-ui/icons'
// import { Button } from '@material-ui/core'
import Button from '@mui/material/Button';
import CreateRobotModal from '../CreateRobotModal/CreateRobotModal'
import OpenProjectFlowModal from '../OpenFlowModal/OpenProjectFlowModal'
import Loadable from 'app/components/Loadable/Loadable'
import Loader from 'app/components/Loadable/Loader'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    height: 'max-content',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,

    display: 'flex',

    // justifyContent:'center',
    alignItems: 'center',
    flexDirection: 'column',
    p: 4,

    // pt: 2,
    // px: 4,
    // pb: 3,
}

const styleShare = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    height: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,

    display: 'flex',

    // justifyContent:'center',
    // alignItems: 'center',
    flexDirection: 'column',
    p: 2,

    // pt: 2,
    // px: 4,
    // pb: 3,
}

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

const useStyles = makeStyles({
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        padding: '1rem',
        margin: '0.25rem 0.5rem',
        fontSize: '1.25rem',
        fontWeight: 500,
    },
    tableContainer: {
        position: 'relative',
    },
    cell: {
        padding: '0.25rem 0.5rem',
    },
    loader: {
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
        <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
        <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}


export default function (props) {
    const { OpenVersionModalSetter, curentFlowData, updateFlowDataSetter } = props
    const [flowName, setflowName] = useState()
    const [showCreateProject, setshowCreateProject] = useState()
    const [first, setfirst] = useState()
    const [loading, setloading] = useState(false)
const [showCreateVersion, setshowCreateVersion] = useState(false)
const [versionName, setversionName] = useState()
const [versionDescription, setversionDescription] = useState()
const [message, setmessage] = useState()
    const navigate = useNavigate()

  


    useEffect(() => {
    //   setloading(true)
    }, [])
    

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

    // const OpenVersionModalSetter = (value)=>{
    //     setshowCreateProject(value)

    // }


    const createVersion = async()=>{
setloading(true)
        const data = {
            name: versionName,
            description: versionDescription
        }

     

        try{
            const res = await addFlowData(data, curentFlowData?.[0]?.flow_id)
            setloading(false)
     
        updateFlowDataSetter()
        setshowCreateVersion(false)

        notification.success({
            message: 'success',
            description: res?.data?.msg
        })
        setmessage(res?.data?.msg)

        // notification.success({
        //     message: 'SUCCESS',
        //     description: 'Flow Deleted',
        // })
        }catch(err){
            setloading(false)
            notification.error({
                message: 'failure',
                description: err?.response?.data?.msg || 'version created'
            })

            setmessage(err?.response?.data?.msg )

        }
      
    }


     // Material Table Columns
     const columns = [
        {
            title: 'Name',
            field: 'name',
        },
        { title: 'Id', field: 'id' },
        { title: 'description', field: 'description' },
        { title: 'version', field: 'version' },
        { title: 'flow name', field: 'flow_name' },

        {
            title: 'Actions',
            field: 'id',
            // lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            render: (rowData) => (
                <MatxMenu
                    menuButton={
                        <UserMenu>
                            <img src="/inelip.png" />
                        </UserMenu>
                    }
                >
                    {/* <StyledItem>
                        <div
                            onClick={() => {
                                navigate(`/console/robo_console/${rowData?.flow_id}`)
                                window.location.reload()
                            }}
                        >
                           
                            <Icon> Open </Icon>
                            <Span> Open </Span>
                           </div>
                    </StyledItem> */}
                    <StyledItem>
                        <div
                            // onClick={() => {
                            //     setshowRenameFLow(true)
                            //     console.log(rowData, 'dsjdjks')

                            //     setflowID(rowData.id)
                            // }}
                        >
                            <Icon> Rename </Icon>
                            <Span> Rename </Span>
                        </div>
                    </StyledItem>
                    <StyledItem>
                        <Icon> Delete</Icon>
                        <Span> Delete </Span>
                    </StyledItem>
                    <StyledItem
                    // onClick={logout}
                    >
                        <Icon> Export </Icon>
                        <Span> Export </Span>
                    </StyledItem>
                    <StyledItem>
                        <Icon> Make a Copy </Icon>
                        <Span> Make a Copy</Span>
                    </StyledItem>
                    <StyledItem>
                        <div onClick={() => {
                            // setflowID(rowData.id)
                            // setopenShare(true)
                        } }
                            >
                            <Icon> Share </Icon>
                            <Span> Share </Span>
                        </div>
                    </StyledItem>
                </MatxMenu>
            ),
        },
    ]

    // Material Table Columns Rows

    var data
    data = [
        {
            name: 'Mohammad',
            id: 'Faisal',
            token: 1995,
            status: true,
            type: true,
            action: true,
            imageUrl:
                'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
        },
        {
            name: 'Segun',
            id: 'Arinze',
            token: 1995,
            status: false,
            type: true,
            action: true,
            imageUrl:
                'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
        },
        {
            name: 'Musa',
            id: 'Juse',
            token: 1995,
            status: true,
            type: true,
            action: true,
            imageUrl:
                'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
        },
        {
            name: 'Musa',
            id: 'Juse',
            token: 1995,
            status: true,
            type: true,
            action: true,
            imageUrl:
                'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
        },
        {
            name: 'Musa',
            id: 'Juse',
            token: 1995,
            status: false,
            type: true,
            action: true,
            imageUrl:
                'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
        },
    ]

    data = curentFlowData;

    const tableRef = React.createRef()

    return (
        <>
            {/* {showCreateVersion && (
                <CreateVersionModal
                    OpenVersionModalSetter={OpenVersionModalSetter}
                />
            )} */}
            <Box>
                <div style={{color:'red'}}>{message}</div>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <Box
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                        className=""
                    >
                        <Box>
                            <div className="modal__title">Versions</div>
                        </Box>
                        {/* <Button variant="">jjjk</Button> */}
                        <Box

                        style={{cursor:'pointer'}}
                                className="create_version_btn"
                                onClick={() => {
                                    setshowCreateVersion(true)
                                }}
                            >
                                Create Version
                            </Box>
                       
                        {/* <Box
                            onClick={() => {
                                OpenVersionModalSetter(false)
                                console.log('clicked')
                            }}
                            style={{ color: 'red', cursor: 'pointer' }}
                        >
                            <img src="/charm_cross.png" />
                        </Box> */}
                    </Box>
                    {/* <Box>
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
                    </Box> */}
                    <Box>
                        {!data && <Loader/> }
                        {curentFlowData && 
                    <MaterialTable
                    title=""
                    tableRef={tableRef}
                    icons={tableIcons}
                    // style={{ whiteSpace: 'nowrap' }}
                    columns={columns}
                    loader={loading}
                    data={data}
                    options={{
                        actionsColumnIndex: -1,
                        // exportButton: true,
                        pagination: true,
                        filtering: false,
                        search: false,
                        padding: 'dense',
                        pageSize: 10,
                        // paddingTop: '-100px',
                        headerStyle: {
                            fontSize: '13px',
                            backgroundColor: '#F3F2F7',
                            borderBottomColor: '#ccc',
                            paddingTop: '5px',
                            paddingBottom: '5px',
                            marginTop: '-100px',
                        },
                    }}
                />
}
                      
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
                                    OpenVersionModalSetter(false)
                                    
                                }}
                            >
                                Cancel
                            </Box>
                        </Box>
                    </div>
                </Typography>
            </Box>

            <Modal
                    open={showCreateVersion}
                    onClose={()=> setshowCreateVersion(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    {/* <CreateRobotModal/> */}
                    {/* <OpenProjectFlowModal/> */}
                    <Box sx={style}>
                    <Box>
                        {' '}
                        <Input
                            size="large"
                            placeholder="Version name *"
                            style={{ width: 220, height: 40 }}
                            onChange={(e)=> setversionName(e.target.value)}
                        />
                    </Box>
                    <Box>
                        {' '}
                        <Input
                            size="large"
                            placeholder="Version Description *"
                            style={{ width: 220, height: 40 }}
                            onChange={(e)=> setversionDescription(e.target.value)}
                        />
                    </Box>
                    <Box className="create_robot_div">
                            <Box
                            onClick={()=> createVersion()}
                                style={{ marginRight: '1rem' }}
                                className="create_robot_btn"
                            >
                                {loading? "loading" : "OK"}
                                
                            </Box>
                            <Box
                                className="create_robot_btn"
                                onClick={() => {
                                    setshowCreateVersion(false)
                                   
                                }}
                            >
                                Cancel
                            </Box>
                        </Box>
                     
                    </Box>
                </Modal>
        </>
    )
}
