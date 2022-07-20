import styled from '@emotion/styled'
import { Box } from '@mui/system'
import React, { Fragment } from 'react'
import Search from '../shared/Search'
import MUITableFlow from '../shared/Table/MUITableFlow'

const ContentBox = styled('div')(({ theme }) => ({
    margin: '23px',
    // backgroundColor:'red',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const DashBody = {
    backgroundColor: '#FFFFFF',
    paddingTop: '85px',
    height:'100vh'
}

export default function Triggers() {
    return (
        <div style={DashBody}>
            <Fragment>
                <Box>
                    <img src="/triggerDashboard.svg" />
                </Box>
                <ContentBox className="analytics">
                  <Search action="Add Trigger"/>
                  <MUITableFlow/>
                </ContentBox>
            </Fragment>
        </div>
    )
}
