import React, { Fragment } from 'react'
import { Box, styled, useTheme } from '@mui/system'

import { Button, Grid} from '@mui/material'
import {  UploadFile } from '@mui/icons-material'


const ContentBox = styled('div')(({ theme }) => ({
    margin: '0px',
    marginTop: '0',
    paddingLeft: '0px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const btnStyle={
  backgroundColor:'#369FFF',
  padding: '.5rem .5rem',
  borderRadius:'4px',
  color:'#ffffff'
}

export default function BillingCompanyInfo() {
  return (
    <Fragment>
    <ContentBox className="analytics">
     
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
                columnGap:'20px'
            }}
        >
          <Box><b>Billing details</b> 
            <Box>No details yet</Box>
          </Box>
            <Button style={btnStyle} variant="contained" startIcon={<UploadFile />}>
                Upgrade Details
            </Button>
        </Box>
        <Grid
            container
            rowSpacing={4}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
        </Grid>
    </ContentBox>
</Fragment>
  )
}
