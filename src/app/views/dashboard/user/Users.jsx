import styled from '@emotion/styled'
import { Box } from '@mui/system'
import {
    deleteUser,
    getWorkspaceStats,
    workspaceInvite,
} from 'app/AppServices/apiService/Services'
import React, { Fragment, useEffect, useState } from 'react'
import Search from '../shared/Search'
import MUITableFlow from '../shared/Table/MUITableFlow'
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

import debounce from 'lodash/debounce'

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
import ViewColumn from '@material-ui/icons/ViewColumn'

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
import { useTheme } from '@mui/system'
import { Span } from 'app/components/Typography'
import { notification } from 'antd'

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

const ContentBox = styled('div')(({ theme }) => ({
    margin: '23px',
    // backgroundColor:'red',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
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

const DashBody = {
    backgroundColor: '#FFFFFF',
    paddingTop: '85px',
    height: '100vh',
}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        boxShadow: 'none',
    },
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

export default function Users() {
    const [users, setusers] = useState()
    const [showInviteModal, setshowInviteModal] = useState(false)
    const [value, setValue] = React.useState('Admin')
    const [email, setemail] = useState()
    const [message, setmessage] = useState()

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const workspaceInviteAction = async()=>{
        const data = {
            email: email,
            user_role: value

        }
        try{
            const res = await workspaceInvite(data)
            console.log(res)
            notification.success({
                message: 'SUCCESS',
                description: 'Email Sent',
            })
        }catch(err){
             console.log(err.response)
             setmessage(err.response.data.msg)
        }
       
    }

    useEffect(() => {
        const getBoardWorkspaceStats = async () => {
            const res = await getWorkspaceStats()
            // setstatData(res?.data?.data)
            setusers(res?.data?.data?.users)
            console.log(res)
        }

        getBoardWorkspaceStats()
    }, [])

    const classes = useStyles()

    // Material Table Columns
    const columns = [
        {
            title: (
                <div className="table_header">
                    <div>Name</div>
                    <div>
                        <img src="/bxs_sort-alt.png" />
                    </div>
                </div>
            ),
            field: 'fullname',
        },

        {
            title: 'ID',
            field: 'user_id',
        },
        { title: 'EMAIL', field: 'email' },

        { title: 'ROLE', field: 'user_role' },

        {
            title: 'Actions',
            field: 'actions',
            lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
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
                        >
                            <Icon> Edit </Icon>
                            <Span> Edit </Span>
                        </div>
                    </StyledItem>
                    <StyledItem>
                        <div onClick={() => deleteUserData(rowData.user_id)}>
                            <Icon> Delete</Icon>
                            <Span> Delete </Span>
                        </div>
                    </StyledItem>
                </MatxMenu>
            ),
        },
    ]

    // Material Table Columns Rows Mock Data
    var data = [
        {
            namee: 'Mohammad',
            id: 'Faisal',
            Flow_ID: 1995,
            status: true,
            type: true,
            actione: true,
            Last_modified: '20/20/2021',
            Versionse: '20',
            imageUrl:
                'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
        },
        {
            namee: 'Segun',
            id: 'Arinze',
            Flow_ID: 1995,
            status: false,
            type: true,
            actione: true,
            Last_modified: '20/20/2021',
            Versionse: '210',
            imageUrl:
                'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
        },
        {
            namee: 'Musa',
            id: 'Juse',
            Flow_ID: 1995,
            status: true,
            type: true,
            actione: true,
            Last_modified: '20/20/2021',
            Versionse: '30',
            imageUrl:
                'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
        },
        {
            namee: 'Musa',
            id: 'Juse',
            Flow_ID: 1995,
            status: true,
            type: true,
            actione: true,
            Last_modified: '20/20/2021',
            Versionse: '90',
            imageUrl:
                'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
        },
    ]

    const inviteUserModalSetter = (value) => {
        setshowInviteModal(value)
    }

    const deleteUserData = async (id) => {
        try {
            const res = await deleteUser(id)
            console.log(res)
            notification.success({
                message: 'SUCCESS',
                description: 'uSER Deleted',
            })
        } catch (err) {
            console.log(err.response)
            notification.error({
                message: 'FAILURE',
                description:  err?.response?.data?.msg,
            })
        }
    }
    const tableRef = React.createRef()

    data = users

    return (
        <>
            <div style={DashBody}>
                <Fragment>
                    <Box>
                        <img src="/userDashboard.svg" />
                    </Box>
                    <ContentBox className="analytics">
                        <Search
                            isUser={true}
                            inviteUserModalSetter={inviteUserModalSetter}
                            action="Invite User"
                        />

                        {/* <MUITableFlow/> */}
                        <MaterialTable
                            title=""
                            tableRef={tableRef}
                            icons={tableIcons}
                            // style={{ whiteSpace: 'nowrap' }}
                            columns={columns}
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
                        />
                    </ContentBox>
                </Fragment>
            </div>
            <Modal
                open={showInviteModal}
                onClose={() => setshowInviteModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    ></Typography>
                    <div style={{ display: 'column', flexDirection: 'column' }}>
                    <Box style={{color:'red'}}>{message}</Box>
                        <Box className="create_robot_top_bar">
                            <Box>
                                <div className="modal__title">Invite User</div>
                            </Box>
                        </Box>

                        <Box className="">
                            <Box>
                                {' '}
                                <Input
                                    size="large"
                                    placeholder="Name *"
                                    style={{ width: 220, height: 40 }}
                                    onChange={
                                        (e) => console.log(e)
                                        // setflowName(e.target.value)
                                    }
                                />
                            </Box>
                            <Box>
                                {' '}
                                <Input
                                    size="large"
                                    placeholder="Email *"
                                    style={{ width: 220, height: 40 }}
                                    onChange={
                                        (e) => setemail(e.target.value)
                                        // setflowName(e.target.value)
                                    }
                                />
                            </Box>
                        </Box>
                        <Box>
                            <div style={{ marginTop: '20px' }}>
                                {' '}
                                <FormControl>
                                    <FormLabel id="demo-controlled-radio-buttons-group">
                                        User Role
                                    </FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={value}
                                        onChange={handleChange}
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
                            </div>
                        </Box>
                        <Box className="create_robot_div">
                            <Box
                                style={{ marginRight: '10px' }}
                                className="create_robot_btn"
                                onClick={() => {
                                    setshowInviteModal(false)
                                    // createFlow()
                                    // setloader(true)
                                }}
                            >
                                CANCEL
                            </Box>
                            <Box
                                className="create_robot_btn"
                                onClick={() => {
                                    workspaceInviteAction()
                                    // createFlow()
                                    // setloader(true)
                                }}
                            >
                                OK
                            </Box>
                        </Box>
                    </div>
                </Box>
            </Modal>
        </>
    )
}
