import styled from '@emotion/styled'
import { UploadFile } from '@mui/icons-material'
import { Button } from '@mui/material'
import { Box } from '@mui/system'
import MUITab2 from 'app/components/tab/MUITab2'
import React, { Fragment } from 'react'
import Test from './Test'

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

export default function Respositories() {
    return (
        <div style={DashBody}>
            <Fragment>
                <ContentBox className="analytics">
                    {' '}
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            columnGap: '10px',
                        }}
                    >
                        <Box>
                            <img src="/repoDashboard.svg" />
                        </Box>
                        <Button
                            style={{
                                backgroundColor: '#369FFF',
                                borderRadius: '8px',
                                height: '30px',
                                color: 'white',
                                padding:'1rem 1rem'
                            }}
                            startIcon={<UploadFile />}
                        >
                            Download
                        </Button>
                    </Box>
                    <MUITab2/>
                    <Test/>
                </ContentBox>
            </Fragment>
        </div>
    )
}
