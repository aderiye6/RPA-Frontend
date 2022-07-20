import React from 'react'
import styled from '@emotion/styled'
import { Card, Grid, InputAdornment, TextField } from '@mui/material'
import { Box } from '@mui/system'
import DoughnutChart from 'app/views/cards/echarts/Doughnut'

const CardRoot = styled('Card')(({ theme }) => ({
    marginBottom: '24px',
    padding: '24px !important',
    height:'500px',
    // border: '1px solid #DFE0EB',
    fontFamily:'Manrope !important',
    [theme.breakpoints.down('sm')]: {
        paddingLeft: '16px !important',
    },
}))

const CardRow = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirectiom: 'row',
    RowGap: '50px',
    // justifyContent:'center',
    alignItems:'center',
    fontSize:'12px',
    // backgroundColor:'red',
    // marginBottom: '24px',
    // padding: '24px !important',
    // [theme.breakpoints.down('sm')]: {
    //     paddingLeft: '16px !important',
    // },
}))

const CardBody = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignContents: 'center',
    height:'100%',
    // flexDirectiom: 'row',
    // rowGap: '50px',
    // marginBottom: '24px',
    // padding: '24px !important',
    // [theme.breakpoints.down('sm')]: {
    //     paddingLeft: '16px !important',
    // },
}))

const cardStyle = {
    // display: "block",
    transitionDuration: "0.3s",
    height: "92%",
    marginTop:'2rem',
  };
export default function TasksMetric() {
    return (
        <CardRoot>
            <Grid container spacing={3}>
                <Grid item lg={6} md={6} sm={6} xs={6} >
                    <CardRow>
                        <Box>
                            <img src="/schedule22.png" />{' '}
                        </Box>
                        <Box>Schedule</Box>
                    </CardRow>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                    <CardRow>
                        <Box>Upcoming tasks</Box>
                        <Box>
                            <TextField
                                label="Next"
                                id="outlined-start-adornment"
                                height='10px'
                                sx={{ m: 1, width: '12ch' }}
                                InputProps={{
                                    style: { fontSize: '2rem', height: 30},
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            4 hours
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                    </CardRow>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <CardBody style={cardStyle}>No schedules found</CardBody>.
                </Grid>
             
            </Grid>
        </CardRoot>
    )
}
