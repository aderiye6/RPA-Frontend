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
import { Avatar, Hidden, Icon, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import { styled, useTheme, Box } from '@mui/system'
import { Span } from 'app/components/Typography'
import '../../dashboard.css'

////
// import { Span } from '../../../components/Typography'

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

export default function MUITableFlow({}) {
    const classes = useStyles()

    // Material Table Columns
    const columns = [
        // {
        //     title: 'Avatar',
        //     field: 'imageUrl',
        //     render: (rowData) => (
        //         <img
        //             src={rowData.imageUrl}
        //             style={{ width: 40, borderRadius: '50%' }}
        //         />
        //     ),
        // },
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
      
        {
            title: (
                <div className="table_header">
                    <div>Robot</div>
                    <div>
                        <img src="/bxs_sort-alt.png" />
                    </div>
                </div>
            ),
            field: 'robot',
        },
        { title: 'Flow', field: 'Flow' },
        { title: 'Versions', field: 'Versions' },
     
        { title: 'Schedule', field: 'Schedule' },
        { title: 'Cron', field: 'Cron' },
        { title: 'Status', field: 'Status' },

        {
            title: 'Actions',
            field: 'actions',
            lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            render: (rowData) => (
                <div style={{height:'25px'}} className="edit_delete_div">
                    {/* <div >
                        <img src="/edit (1) 2.png" />
                    </div>
                    <div>
                        <img src="/trash-2 2.png" />
                    </div> */}
                </div>
            ),
        },
    ]

    // Material Table Columns Rows
    const data = [
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
        {
            namee: 'Musa',
            id: 'Juse',
            Flow_ID: 1995,
            status: false,
            type: true,
            actione: true,
            Last_modified: '20/20/2021',
            Versionse: '290',
            imageUrl:
                'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
        },
    ]

    const tableRef = React.createRef()
    return (
        <MaterialTable
            title=""
            tableRef={tableRef}
            icons={tableIcons}
            // style={{ whiteSpace: 'nowrap' }}
            columns={columns}
            data={data}
            // components={{
            //     Action: (props) => (
            //         <button
            //             onClick={(event) =>
            //                 props.action.onClick(event, props.data)
            //             }
            //         >
            //             Custom Delete Button
            //         </button>
            //     ),
            // }}
            // actions={[
            //     {
            //         icon: Refresh,
            //         tooltip: 'Refresh Data',
            //         isFreeAction: true,
            //         onClick: () =>
            //             tableRef.current && tableRef.current.onQueryChange(),
            //     },
            //     {
            //         icon: Save,
            //         tooltip: 'Save User',
            //         onClick: (event, rowData) =>
            //             console.log('You saved ', rowData),
            //     },
            //     {
            //         icon: Delete,
            //         tooltip: 'Delete User',
            //         onClick: (event, rowData) =>
            //             console.log('You want to delete ', rowData),
            //     },
            //     {
            //         icon: Delete,
            //         tooltip: 'Delete User',
            //         onClick: (event, rowData) =>
            //             console.log('You want to delete ', rowData),
            //     },
            // ]}

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
    )
}
