import React, { Fragment, useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/system'
import { Box, IconButton, TextField } from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'
import MUIRobotTable from '../shared/Table/MUIRobotTable'
import { getFlows } from 'app/AppServices/apiService/Services'
import { notification } from 'antd'

const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

export default function Flows() {
    const [flowsData, setflowsData] = useState()
    const tabs = ['All', 'Shipped', 'Processing', 'Completed']
    const [statusFilter, setStatusFilter] = React.useState(0)
    const [startDate, setStartDate] = React.useState(
        new Date('2019-01-01T00:00:00')
    )
    const [finishDate, setFinishDate] = React.useState(
        new Date('2022-01-01T00:00:00')
    )
    const [priceFilter, setPriceFilter] = React.useState([0, 200])
    const [sorting, setSorting] = React.useState(['Orders.createdAt', 'desc'])

    const query = {
        timeDimensions: [
            {
                dimension: 'Orders.createdAt',
                dateRange: [startDate, finishDate],
                granularity: 'day',
            },
        ],
        order: {
            [`${sorting[0]}`]: sorting[1],
        },
        dimensions: [
            'Users.id',
            'Orders.id',
            'Orders.size',
            'Users.fullName',
            'Users.city',
            'Orders.price',
            'Orders.status',
            'Orders.createdAt',
        ],
        filters: [
            {
                dimension: 'Orders.status',
                operator: tabs[statusFilter] !== 'All' ? 'equals' : 'set',
                values: [`${tabs[statusFilter].toLowerCase()}`],
            },
            {
                dimension: 'Orders.price',
                operator: 'gt',
                values: [`${priceFilter[0]}`],
            },
            {
                dimension: 'Orders.price',
                operator: 'lt',
                values: [`${priceFilter[1]}`],
            },
        ],
    }


    const getFlowData = async () => {
        const res = await getFlows()
        setflowsData(res?.data?.data)
        console.log(res)
    }

    useEffect(() => {
        getFlowData()
    }, [])

    const onDeleteSuccess = () => {
        notification.success({
            message: 'SUCCESS',
            description: 'Flow Deleted',
        })

        getFlowData()
    }

    

    return (
        <div style={{ backgroundColor: 'white' }}>
            <Fragment>
                <Box>
                    <img src="/flow3.png" />
                </Box>
                <ContentBox className="">
                    <TextField
                        // fullWidth
                        id="standard-bare"
                        variant="outlined"
                        defaultValue="Search..."
                        InputProps={{
                            style: {
                                width: '100%',
                                height: '30px',
                                paddingLeft: '2px',
                            },
                            startAdornment: (
                                <IconButton>
                                    <SearchOutlined />
                                </IconButton>
                            ),
                        }}
                    />
                    <MUIRobotTable flowsData={flowsData} getFlowData={getFlowData} onDeleteSuccess={onDeleteSuccess} />
                </ContentBox>
            </Fragment>
        </div>
    )
}
