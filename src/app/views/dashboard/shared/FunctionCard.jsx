import styled from '@emotion/styled'
import { Card, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import '../dashboard.css'

const CardRoot = styled(Card)(({ theme }) => ({
    marginBottom: '24px',
    padding: '24px !important',
    border: '1px solid #DFE0EB',
    [theme.breakpoints.down('sm')]: {
        paddingLeft: '16px !important',
    },
    height:'100%'
}))

const CardColumn = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirectiom: 'row',
    columnGap: '40px',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom: '24px',
    // padding: '24px !important',
    // [theme.breakpoints.down('sm')]: {
    //     paddingLeft: '16px !important',
    // },
}))

const CardRow = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirectiom: 'row',
    rowGap: '50px',
}))

export default function FunctionCard({name, count, content, iconUrl}) {
    return (
        <div>
            <CardRoot>
                <CardColumn>
                    <div className="funt__row">
                        <Box className='funct_name'>{name}</Box>
                        <Box className="funct_count">{count}</Box>
                    </div>
                    <Box className="funct_icon_cont">
                        <img src={`${iconUrl}`}  className="funct_icon" />
                    </Box>
                </CardColumn>
                <Box className='funct_content'>{content}</Box>
                <Box className='funct_details_btn'>Details</Box>
            </CardRoot>
        </div>
    )
}
