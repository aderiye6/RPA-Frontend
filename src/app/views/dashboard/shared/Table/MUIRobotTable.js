import React, { FC, useState, MouseEvent } from 'react'
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

////
import { forwardRef } from 'react'
import { MatxMenu } from 'app/components'
import { Avatar, Hidden, Icon, Input, MenuItem, Modal, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { styled, useTheme, Box } from '@mui/system'
import { Span } from 'app/components/Typography'
import '../../dashboard.css'
import { deleteProjectFlow, updateFlow } from 'app/AppServices/apiService/Services'
import { notification } from 'antd'

////
// import { Span } from '../../../components/Typography'

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

export default function MUIRobotTable({ flowsData, onDeleteSuccess, getFlowData }) {
    const classes = useStyles()
    const [showEditFLow, setshowEditFLow] = useState(false)
    const [flowID, setFlowID] = useState()
    const [flowName, setflowName] = useState()
    const [loader, setloader] = useState(false)
    const [message, setmessage] = useState()
    console.log(flowsData)

    const updateFLowAtt = async () => {
        console.log(flowName)

        const data = {
            name: flowName,
        }

        try {

            const response = await updateFlow(data, flowID)
            // const response = await axios.patch(
            //     `https://kophy-rpa.herokuapp.com/api/v1/flow/${flowID}`,
            //     {
            //         name: flowName,
            //     }
            // )
            setloader(false)

            setmessage(response?.data?.msg)
            console.log(response)
            setshowEditFLow(false)

            // CreateRobotModalSetter(false)
            notification.success({
                message: 'SUCCESS',
                description: response?.data?.msg || 'Flow Created',
            })
            getFlowData()
        } catch (err) {
            setloader(false)
            console.log(err)

        }
    }


    const deleteFlow = async (id) => {
        if (window.confirm('Are you sure you want to delete the Flow?')) {
            console.log(id)
            const res = await deleteProjectFlow(id)
            console.log(res)
            onDeleteSuccess()
        }
    }

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
            field: 'name',
        },
        { title: 'Flow ID', field: 'id' },
        {
            title: (
                <div className="table_header">
                    <div>Last modified</div>
                    <div>
                        <img src="/bxs_sort-alt.png" />
                    </div>
                </div>
            ),
            field: 'updated_at',
        },
        { title: 'Versions', field: 'versions' },

        {
            title: 'Actions',
            field: 'actions',
            lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            render: (rowData) => (
                <div style={{cursor:'pointer'}} className="edit_delete_div">
                    <div onClick={()=> {setFlowID(rowData.id)
                        setshowEditFLow(true)
                        setmessage('')
                    }}>
                        <img src="/edit (1) 2.png" />
                    </div>
                    <div style={{cursor:'pointer'}} onClick={() => deleteFlow(rowData.id)}>
                        <img src="/trash-2 2.png" />
                    </div>
                </div>
            ),
        },
    ]

    var data
    // Material Table Columns Rows
    data = [
        {
            name: 'Mohammad',
            id: 'Faisal',
            Flow_ID: 1995,
            status: true,
            type: true,
            action: true,
            Last_modified: '20/20/2021',
            Versions: '20',
            imageUrl:
                'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
        },
        {
            name: 'Segun',
            id: 'Arinze',
            Flow_ID: 1995,
            status: false,
            type: true,
            action: true,
            Last_modified: '20/20/2021',
            Versions: '210',
            imageUrl:
                'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
        },
        {
            name: 'Musa',
            id: 'Juse',
            Flow_ID: 1995,
            status: true,
            type: true,
            action: true,
            Last_modified: '20/20/2021',
            Versions: '30',
            imageUrl:
                'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
        },
        {
            name: 'Musa',
            id: 'Juse',
            Flow_ID: 1995,
            status: true,
            type: true,
            action: true,
            Last_modified: '20/20/2021',
            Versions: '90',
            imageUrl:
                'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
        },
        {
            name: 'Musa',
            id: 'Juse',
            Flow_ID: 1995,
            status: false,
            type: true,
            action: true,
            Last_modified: '20/20/2021',
            Versions: '290',
            imageUrl:
                'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
        },
    ]

    data = flowsData

    const tableRef = React.createRef()
    return (
        <>
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
         <Modal
                open={showEditFLow}
                onClose={() => setshowEditFLow(false)}
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
                                    setshowEditFLow(false)
                                    // await getFlowData()

                                    console.log('clicked')
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
                                        // console.log(e)
                                        setflowName(e.target.value)
                                    }
                                />
                            </Box>
                        </Box>
                        <Box className="create_robot_div">
                            <Box
                                className="create_robot_btn"
                                onClick={() => {
                                    updateFLowAtt()
                                    setloader(true)
                                }}
                            >
                                {loader ? 'updating...' : 'Update'}
                            </Box>
                        </Box>
                    </div>
                </Box>
            </Modal>
        </>
    )
}
