import styled from '@emotion/styled'
import { Add, AddBoxOutlined, UploadFile } from '@mui/icons-material'
import { Button } from '@mui/material'
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

export default function Lincenses() {
    return (
        <div style={DashBody}>
            <Fragment>
                <Box>
                    <img src="/licenseDashboard.svg" />
                </Box>

                <ContentBox className="analytics">
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            columnGap: '10px',
                        }}
                    >
                        <Box>
                            <Button
                                style={{ backgroundColor: '#D0E9FF' }}
                                // variant="contained"
                                startIcon={<AddBoxOutlined />}
                                color="primary"
                            >
                                Add License
                            </Button>
                        </Box>
                        <Box>
                            <Button
                                style={{ backgroundColor: '#FFECD0' }}
                                startIcon={<UploadFile />}
                            >
                                Request License
                            </Button>
                        </Box>
                    </Box>
                    <Box>
                        <b>No licenses found.</b>
                    </Box>
                </ContentBox>
            </Fragment>
        </div>
    )
}
