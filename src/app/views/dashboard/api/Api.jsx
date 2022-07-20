import styled from '@emotion/styled'
import { Box } from '@mui/system'
import React, { Fragment } from 'react'

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
    height: '100vh',
}

export default function Api() {
    return (
        <div style={DashBody}>
            <Fragment>
                <Box>
                    <img src="/apiDashboard.svg" />
                </Box>
                <ContentBox className="analytics">
                    <Box className="api_Pg_header">Workspace Tokens</Box>
                    <Box>
                        You have to generate a token in order to use <b style={{color:'#369FFF'}}>Robomotion
                        API.</b> 
                    </Box>
                </ContentBox>
            </Fragment>
        </div>
    )
}
