import React, { Fragment, useEffect, useState } from 'react'
import { Box, styled, useTheme } from '@mui/system'
import { Button, Grid, IconButton, Paper, TextField } from '@mui/material'
import { Search, SearchOutlined, UploadFile } from '@mui/icons-material'
import MUITable from '../shared/MUITable'
import { billingSubscriptions } from 'app/AppServices/apiService/Services'

import MaterialTable from 'material-table'
import { makeStyles } from '@material-ui/core/styles'
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
import SmartToyIcon from '@mui/icons-material/SmartToy';

////
import { forwardRef } from 'react'
import { MatxMenu } from 'app/components'
import {
    Icon,
    Input,
    MenuItem,
} from '@mui/material'
import { Link } from 'react-router-dom'

import { Span } from 'app/components/Typography'
import { notification } from 'antd'

const ContentBox = styled('div')(({ theme }) => ({
    margin: '0px',
    marginTop: '0',
    paddingLeft: '0px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const btnStyle = {
    backgroundColor: '#369FFF',
    padding: '.5rem .5rem',
    borderRadius: '4px',
    color: '#ffffff',
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

export default function BillingApplication() {
    const [billingData, setbillingData] = useState()

    useEffect(() => {
        const getBillingSubs = async () => {
            const res = await billingSubscriptions()
            setbillingData(res?.data?.data)
            console.log(res?.data?.data)
        }

        getBillingSubs()
    }, [])

    // billingSubscriptions

    // Material Table Columns
    const columns = [
        {
            title: "Plan Name",
            field: 'name',
        },

        {
            title: 'User Limit',
            field: 'user_limit',
        },
        { title: 'EMAIL', field: 'email',
        render: (rowData)=>(
            <div style={{display:'flex'}}><div style={{display:''}}> <div style={{color:'gray'}}><SmartToyIcon/></div> <b>{rowData.prod_robot}</b> </div> <div style={{display:''}}> <div style={{color:'orange'}}><SmartToyIcon/></div><b>{rowData.on_demand_robot}</b></div> <div style={{display:''}}> <div style={{color:'blue'}}><SmartToyIcon/></div> <b>{rowData.dev_robot}</b> </div>    </div>
        )
    },

        { title: 'Period', field: 'period' },
        { title: 'Next Payment Date', field: 'next_pay_date' },
        { title: 'Payment Amount', field: 'amount' },

        {
            title: 'Status',
            field: 'status',
           
            // render: (rowData) => (
            //     <MatxMenu
            //         menuButton={
            //             <UserMenu>
            //                 <img src="/inelip.png" />
            //             </UserMenu>
            //         }
            //     >
            //         <StyledItem>
            //             <div
            //                 onClick={() => {
            //                     // setshowRenameFLow(true)
            //                     // console.log(rowData, 'dsjdjks')
            //                     // setflowID(rowData.id)
            //                 }}
            //             >
            //                 <Icon> Edit </Icon>
            //                 <Span> Edit </Span>
            //             </div>
            //         </StyledItem>
            //         <StyledItem>
            //             <div
            //             // onClick={() => deleteUserData(rowData.user_id)}
            //             >
            //                 <Icon> Delete</Icon>
            //                 <Span> Delete </Span>
            //             </div>
            //         </StyledItem>
            //     </MatxMenu>
            // ),
        },

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
                            onClick={() => {
                                // setshowRenameFLow(true)
                                // console.log(rowData, 'dsjdjks')
                                // setflowID(rowData.id)
                            }}
                        >
                            <Icon> Upgrade </Icon>
                            <Span> Upgrade </Span>
                        </div>
                    </StyledItem>
                    <StyledItem>
                        <div
                        // onClick={() => deleteUserData(rowData.user_id)}
                        >
                            <Icon> Cancel</Icon>
                            <Span> Cancel </Span>
                        </div>
                    </StyledItem>
                </MatxMenu>
            ),
        },
    ]

    // Material Table Columns Rows
    var data = [
        {
            amount: billingData?.amount,
            created_at: billingData?.created_at, 
            dev_robot: billingData?.dev_robot, 
            id: billingData?.id, 
            name:billingData?.name, 
            
            next_pay_date: billingData?.next_pay_date, 
            on_demand_robot: billingData?.on_demand_robot, 
            period: billingData?.period, 
            prod_robot: billingData?.prod_robot, 
            status: billingData?.status, 
            updated_at: billingData?.updated_at ,
            user_limit: billingData?.user_limit, 
            workspace_id: billingData?.workspace_id
        },
        
    
      
    ]


    // data =billingData
    console.log(billingData)


    const tableRef = React.createRef()
    return (
        <Fragment>
            <ContentBox className="analytics">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        // justifyContent: 'space-between',
                        p: 1,
                        m: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        columnGap: '20px',
                    }}
                >
                    <Box>
                        <Box>Current plan</Box>
                        <Box>
                            <b>Free</b>{' '}
                        </Box>
                    </Box>
                    <Button
                        style={btnStyle}
                        variant="contained"
                        startIcon={<UploadFile />}
                    >
                        Upgrade
                    </Button>
                </Box>
                <Grid
                    container
                    rowSpacing={4}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        {/* <MUITable
                            billingData={billingData}
                            style={{ marginTop: '5rem' }}
                        /> */}

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
                    </Grid>
                </Grid>

                {/* <TopSellingTable /> */}
            </ContentBox>
        </Fragment>
    )
}
