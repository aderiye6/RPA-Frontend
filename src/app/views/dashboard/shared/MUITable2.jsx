import React, { FC, useState, MouseEvent } from 'react'
import debounce from 'lodash/debounce'

import { makeStyles } from '@material-ui/core/styles'

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

////
import { Span } from '../../../components/Typography'
import { deleteRobot } from 'app/AppServices/apiService/Services'
import Loadable from 'app/components/Loadable/Loadable'

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

export default function MUITable2(props) {
    const {
        UpdateRobotModalSetter,
        robotData,
        getRobotData,
        selectedRobotIDSetter,
    } = props

    const classes = useStyles()

    const deleteRobotData = async (id) => {
        try {
            const res = await deleteRobot(id)
            console.log(res, 'djdkjd')
            getRobotData()
        } catch (err) {
            console.log(err.response)
        }
    }

    // Material Table Columns
    const columns = [
        {
            title: 'Name',
            field: 'name',
        },
        { title: 'Id', field: 'id' },
        { title: 'Token', field: 'token' },
        {
            title: 'Status',
            field: 'status',
            render: (rowData) => {
                if (rowData.status === 'Disconnected') {
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
                            Disconnected
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
                            Connected
                        </div>
                    )
                }
            },
        },
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
                                backgroundColor: 'gray',
                                padding: '.3rem .3rem',
                                // border: '1px solid #ccc',
                                color: '#ffffff',
                            }}
                        >
                            Development
                        </div>
                    )
                } else if (rowData.type === 'On Demand') {
                    return (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '120px',
                                borderRadius: '22px',
                                backgroundColor: 'orange',
                                padding: '.3rem .3rem',
                                // border: '1px solid #ccc',
                                color: '#ffffff',
                            }}
                        >
                            On Demand
                        </div>
                    )
                }else{
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
            field: 'actions',
            lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            render: (rowData) => (
                // <div>
                //     <img src="/inelip.png" />
                // </div>
                <MatxMenu
                    menuButton={
                        <UserMenu>
                            {/* <Hidden xsDown>
                                <Span>
                                    Hi <strong>Job</strong>
                                </Span>
                            </Hidden> */}
                            <img src="/inelip.png" />
                        </UserMenu>
                    }
                >
                    <StyledItem>
                        <div
                            onClick={() => {
                                selectedRobotIDSetter(rowData.id)
                                UpdateRobotModalSetter(true)
                            }}
                        >
                            <Icon> Edit </Icon>
                            <Span> Edit </Span>
                        </div>
                    </StyledItem>
                    <StyledItem>
                        <div onClick={() => deleteRobotData(rowData.id)}>
                            {' '}
                            <Icon> Delete </Icon>
                            <Span> Delete </Span>
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

    data = robotData

    const tableRef = React.createRef()
    return (
        <>
            {!data && <Loadable />}
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
                    paddingTop: '-100px',
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
        </>
    )
}
