import { deleteProjectFlow, getFlows, getUsers, inviteUserToFlow, shareFlow, updateFlow } from 'app/AppServices/apiService/Services'
import React, { useState, useEffect } from 'react'
import MUIRobotTable from '../../shared/Table/MUIRobotTable'
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
import CreateFlowModal from '../../../../components/Modal/CreateFlowModal/CreateFlowModal'
import { useNavigate } from 'react-router-dom'
////
import { forwardRef } from 'react'
import { MatxMenu } from 'app/components'
import {
    Avatar,
    FormControl,
    FormControlLabel,
    FormLabel,
    Hidden,
    Icon,
    Input,
    MenuItem,
    Modal,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { styled, useTheme, Box } from '@mui/system'

////
// import { Span } from '../../../components/Typography'
import { Span } from 'app/components/Typography'
import { notification } from 'antd'
import axios from 'axios'
import { CloudCircleOutlined, WebOutlined } from '@mui/icons-material'
import { SecurityOutlined } from '@material-ui/icons'
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
    height: "max-content",
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

export default function SharedFlows({ robotData, refetch, refetchSetter, isConsoleProject }) {
    const [flowsData, setflowsData] = useState()
    const [showRenameFLow, setshowRenameFLow] = useState(false)
    const [flowName, setflowName] = useState()
    const [flowID, setflowID] = useState()
    const [loading, setloading] = useState(false)
    const [message, setmessage] = useState()
    const [loader, setloader] = useState(false)
    const [openShare, setopenShare] = useState(false)
    const [selectedValue, setSelectedValue] = React.useState({})
    const [flowUsers, setflowUsers] = useState()
    const [selectedUser, setselectedUser] = useState()
    const [value, setValue] = React.useState('Admin')
    const [workspaceShareType, setworkspaceShareType] = useState({})
    const [shareLoading, setShareLoading] = useState(false)
    // const [message, setmessage] = useState()


    const handleShareTypeChange = (event) => {
        setValue(event.target.value)
       
        setworkspaceShareType((prevState) => ({
            ...prevState,
            share_type: event.target.value,
        }))
    }
    let navigate = useNavigate()

    const getFlowData = async () => {
        try {
            const res = await getFlows()
            setloading(false)
            setflowsData(
                res?.data?.data.filter(
                    (flow) => flow?.shared_type === 'Public'
                )
            )
            console.log(res)
        } catch (err) {
            setloading(false)
            console.log(err)
        }
    }


    const shareFlowDesign = async()=>{
        setShareLoading(true)
        const data = {
            share_type:selectedValue
        }

        const data2 = {
            user_id:selectedUser
        }

        try{
            if(selectedValue !== 'PRIVATE'){
                const res = await shareFlow(data, flowID)
                setShareLoading(false)
            
                setopenShare(false)
                notification.success({
                    message:'SUCCESS',
                    description:'flow shared'
                })

            }else{
                const res = await inviteUserToFlow(data2, flowID)
                setShareLoading(false)
                setopenShare(false)
                notification.success({
                    message:'SUCCESS',
                    description:'flow shared'
                })
            }
        
        }catch(err){
        console.log(err.response)
        setShareLoading(false)
        setmessage(err?.response?.data?.msg)
        }
       
    }

    const getFlowUsers = async () => {
        // setflowID(value)
        try {
            const res = await getUsers()
          
            setflowUsers(res?.data?.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getFlowData()
        getFlowUsers()
    }, [])


    const refetchData = ()=>{
        if(refetch && isConsoleProject){
            console.log(refetchSetter,'GETTINGPPP')
            getFlowData()
            refetchSetter(false)

        }
    }


    refetchData()
    useEffect(() => {
    // setloading(true)
    refetchData()
    }, [])

    const deleteFlow = async (id) => {
        if (window.confirm('Are you sure you want to delete the Flow?')) {
        
            try{
               const res = await deleteProjectFlow(id)
               notification.success({
                message:'error',
                description: res?.data?.msg || 'error'
            })
            getFlowData()  
            }catch(err){
                notification.error({
                    message:'error',
                    description: err?.response?.data?.msg || 'error'
                })
            }
           
        }
    }

  

    // Material Table Columns
    const columns = [
        {
            title: 'Name',
            field: 'name',
        },
        { title: 'Id', field: 'id' },
        { title: 'LAST MODIFIED', field: 'updated_at' },

        {
            title: 'Type',
            field: 'type',
            render: (rowData) => {
                if (rowData.type === 'Development') {
                    return (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '120px',
                                borderRadius: '22px',
                                backgroundColor: '#F9EBEC',
                                padding: '.3rem .3rem',
                                // border: '1px solid #ccc',
                                color: '#A30D11',
                            }}
                        >
                            Development
                        </div>
                    )
                } else {
                    return (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '120px',
                                borderRadius: '22px',
                                backgroundColor: 'green',
                                padding: '.3rem .3rem',
                                // border: '1px solid #ccc',
                                color: 'white',
                            }}
                        >
                            Completed
                        </div>
                    )
                }
            },
        },
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
                    <StyledItem>
                        <div
                            onClick={() => {
                                navigate(`/console/robo_console/${rowData?.id}`)
                                window.location.reload()
                            }}
                        >
                            {/* <Link to={`/console/robo_console/${rowData?.id}`}> */}
                            <Icon> Open </Icon>
                            <Span> Open </Span>
                            {/* </Link>   */}
                        </div>
                    </StyledItem>
                    <StyledItem>
                        <div
                            onClick={() => {
                                setshowRenameFLow(true)
                               

                                setflowID(rowData.id)
                            }}
                        >
                            <Icon> Rename </Icon>
                            <Span> Rename </Span>
                        </div>
                    </StyledItem>
                    <StyledItem>
                        <div onClick={()=> deleteFlow(rowData.id)}>
                            <Icon> Delete</Icon>
                        <Span> Delete </Span>
                        </div>
                        
                    </StyledItem>
                    {/* <StyledItem
                 
                    >
                        <Icon> Export </Icon>
                        <Span> Export </Span>
                    </StyledItem> */}
                    {/* <StyledItem>
                        <Icon> Make a Copy </Icon>
                        <Span> Make a Copy</Span>
                    </StyledItem> */}
                    {/* <StyledItem>
                        <div onClick={() => {
                            setflowID(rowData.id)
                            setopenShare(true)}}>
                            <Icon> Share </Icon>
                            <Span> Share </Span>
                        </div>
                    </StyledItem> */}
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

    const createFlow = async () => {
       

        const data={
            name: flowName,
        }

        try {

            const response = await updateFlow(data, flowID)
            setloader(false)

            setmessage('UPDATED')
            getFlowData()
            setshowRenameFLow(false)
            notification.success({
                message: 'SUCCESS',
                description: response?.data?.msg || 'Flow Created',
            })
        } catch (err) {
            setloader(false)
            console.log(err)
        }
    }

    data = flowsData

    const tableRef = React.createRef()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value)
        
        // setworkspaceShareType((prevState) => ({
        //     ...prevState,
        //     share_type: event.target.value,
        // }))
    }

    return (
        <>
            {/* {showRenameFLow && <CreateFlowModal />} */}

            <div style={{ overflow: 'scroll', height: '100%' }}>
                {/* <MUIRobotTable
            // flowsData={flowsData} onDeleteSuccess={onDeleteSuccess}
            /> */}

{!data?  <Loader/> :  <MaterialTable
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
                            // fontSize: '13px',
                            // backgroundColor: '#F3F2F7',
                            // borderBottomColor: '#ccc',
                            // paddingTop: '5px',
                            // paddingBottom: '5px',
                            // marginTop: '-100px',
                        },
                    }}
                />}

               
            </div>

            <Modal
                open={showRenameFLow}
                onClose={() => setshowRenameFLow(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    ></Typography>
                    <div>
                        <Box className="create_robot_top_bar">
                            {' '}
                            <Box>
                                <div className="modal__title">
                                    Update Project
                                </div>
                            </Box>
                            <Box
                                onClick={async () => {
                                    setshowRenameFLow(false)
                                    await getFlowData()

                                   
                                }}
                                style={{ color: 'red', cursor: 'pointer' }}
                            >
                                <img src="/charm_cross.png" />
                            </Box>
                        </Box>
                        <div> {message}</div>

                        <Box className="create_robot_body">
                            <Box>
                                {' '}
                                <Input
                                    size="large"
                                    placeholder="Flow name *"
                                    style={{ width: 220, height: 40 }}
                                    onChange={(e) =>
                                    
                                        setflowName(e.target.value)
                                    }
                                />
                            </Box>
                        </Box>
                        <Box className="create_robot_div">
                            <Box
                                className="create_robot_btn"
                                onClick={() => {
                                    createFlow()
                                    setloader(true)
                                }}
                            >
                                {loader ? 'updating...' : 'Update'}
                            </Box>
                        </Box>
                    </div>
                </Box>
            </Modal>
            <Modal
                open={openShare}
                onClose={() => setopenShare(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleShare}>
                    {/* <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    ></Typography> */}
                    <div
                    // style={{ border: '1px solid red' }}
                    >
                        <Box className="create_robot_top_bar">
                            <Box
                                style={{
                                    borderBottom: '1px solid #ccc',
                                    width: '100%',
                                    paddingBottom: '10px',
                                }}
                            >
                                <div className="modal__title">
                                    Share Project
                                </div>
                            </Box>
                        </Box>
                        <div style={{color:'red'}}> {message}</div>

                        <Box className="share_modal">
                            <Box
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    columnGap: '10px',
                                }}
                            >
                                <div style={{ minWidth: '100px' }}>Title</div>
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
                            <Box
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    columnGap: '10px',
                                    borderBottom: '1px solid #ccc',
                                    width: '100%',
                                    paddingBottom: '10px',
                                    marginBottom: '10px',
                                }}
                            >
                                <div style={{ minWidth: '100px' }}>
                                    Description
                                </div>
                                <Input
                                    size="large"
                                    placeholder="Flow Description *"
                                    style={{ width: 220, height: 40 }}
                                    onChange={(e) =>
                                        // console.log(e)
                                        setflowName(e.target.value)
                                    }
                                />
                            </Box>
                            <Box>
                            {/* <div style={{ marginTop: '20px' }}>
                                {' '}
                                <FormControl>
                                    <FormLabel id="demo-controlled-radio-buttons-group">
                                        User Role
                                    </FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={value}
                                        onChange={handleShareTypeChange}
                                    >
                                        <FormControlLabel
                                            value="Admin"
                                            control={<Radio />}
                                            label="Admin"
                                        />
                                        <FormControlLabel
                                            value="Member"
                                            control={<Radio />}
                                            label="Member"
                                        />
                                        <FormControlLabel
                                            value="Guest"
                                            control={<Radio />}
                                            label="Guest"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div> */}
                            </Box>
                            <Box
                                style={{
                                    display: 'flex',
                                    columnGap: '10px',
                                    alignItems: 'center',
                                }}
                            >
                             
                                <Radio
                                    style={{ color: 'blue' }}
                                    checked={selectedValue === 'PUBLIC'}
                                    onChange={handleChange}
                                    value="PUBLIC"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'A' }}
                                />
                                <WebOutlined />
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        fontSize: '10px',
                                    }}
                                >
                                    <div>Anyone with the link</div>
                                    <div>
                                        Anyone who has the link can access this
                                        flow. No sign-in required.
                                    </div>
                                </div>
                            </Box>
                            <Box
                                style={{
                                    display: 'flex',
                                    columnGap: '10px',
                                    alignItems: 'center',
                                    margin: '10px 0',
                                }}
                            >
                                <Radio
                                    style={{ color: 'blue' }}
                                    checked={selectedValue === 'WORKSPACE'}
                                    onChange={handleChange}
                                    value="WORKSPACE"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'A' }}
                                />
                                <CloudCircleOutlined />
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        fontSize: '10px',
                                    }}
                                >
                                    <div>Your Workspace</div>
                                    <div>
                                        Anyone at your workspace can access this
                                        flow. Sign-in required.
                                    </div>
                                </div>
                            </Box>
                            <Box
                                style={{
                                    display: 'flex',
                                    columnGap: '10px',
                                    alignItems: 'center',
                                }}
                            >
                                <Radio
                                    style={{ color: 'blue' }}
                                    checked={selectedValue === 'PRIVATE'}
                                    onChange={handleChange}
                                    value="PRIVATE"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'A' }}
                                />
                                <SecurityOutlined />
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        fontSize: '10px',
                                    }}
                                >
                                    <div>Private</div>
                                    <div>
                                        Share this flow with specific people at
                                        your workspace. Sign-in required.
                                    </div>
                                </div>
                            </Box>
                        </Box>
                        {selectedValue === 'PRIVATE' &&
                        <div>
                                            <select
                                                style={{
                                                    width: '100%',
                                                    height: '40px',
                                                    margin: '1rem 0',
                                                }}
                                                id="ddlStates"
                                                className="form-control select-class"
                                                onChange={(e) =>
                                                    setselectedUser(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="0">
                                                    Select User
                                                </option>
                                                {flowUsers &&
                                                flowUsers !== undefined
                                                    ? flowUsers.map(
                                                          (ctr, index) => {
                                                              return (
                                                                  <option
                                                                      key={
                                                                          index
                                                                      }
                                                                      value={
                                                                          ctr?.user_id
                                                                      }
                                                                  >
                                                                      {
                                                                          ctr?.fullname
                                                                      }
                                                                  </option>
                                                              )
                                                          }
                                                      )
                                                    : 'No State'}
                                            </select>
                                        </div>
                                }
                        <Box className="create_robot_div">
                            <Box
                                className="create_robot_btn"
                                onClick={() => {
                                    setopenShare(false)
                                }}
                                style={{ marginRight: '10px' }}
                            >
                                CANCEL
                            </Box>

                            <Box
                                className="create_robot_btn"
                                onClick={() => {
                                    // createFlow()
                                    shareFlowDesign()
                                    setloader(true)
                                }}
                            >
                               {shareLoading? <>SHARE <Loader/></> : "SHARE" }   
                            </Box>
                        </Box>
                    </div>
                </Box>
            </Modal>
        </>
    )
}
