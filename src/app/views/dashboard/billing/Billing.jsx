import React, { Fragment } from 'react'
import { styled } from '@mui/system'

import { Box} from '@mui/material'
import MUITab from 'app/components/tab/MUITab'

export default function Billing() {
    const ContentBox = styled('div')(({ theme }) => ({
        margin: '30px',
        [theme.breakpoints.down('sm')]: {
            margin: '16px',
        },
    }))

    return (
        <div style={{ backgroundColor: 'white', paddingTop:'70px' }}>
            <Fragment>
                <Box>
                    <img src="/billing22.png" />
                </Box>
                <ContentBox className="analytics">
                    <MUITab />
                </ContentBox>
            </Fragment>
        </div>
    )
}
