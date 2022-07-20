import {
    Card,
    Grid,
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import useAuth from 'app/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Box, styled, useTheme } from '@mui/system'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Paragraph, Span } from 'app/components/Typography'
import { useLocation } from 'react-router-dom'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '32px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const IMG = styled('img')(() => ({
    width: '100%',
}))

const JWTRoot = styled(JustifyBox)(() => ({
    background: '#ffffff',
    height: '100vh !important',
    '& .card': {
        // maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
}))

const StyledProgress = styled(CircularProgress)(() => ({
    position: 'absolute',
    top: '6px',
    left: '25px',
}))

export default function VerifyOTP() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({
        otp: '',
    })
    const [tempID, settempID] = useState()
    const [message, setMessage] = useState('')
    const { verifyOTP } = useAuth()
    const location = useLocation()

    useEffect(() => {
        settempID(location?.state?.data)
    }, [])

    const handleChange = ({ target: { name, value } }) => {
        let temp = { ...userInfo }
        temp[name] = value
        setUserInfo(temp)
    }

    console.log(tempID, location, 'djdsjsjjs')

    const { palette } = useTheme()
    const textError = palette.error.main
    const textPrimary = palette.primary.main

    const handleFormSubmit = async (event) => {
        setLoading(true)
        try {
            await verifyOTP(userInfo.otp, tempID)
            navigate('/account-setup', { state: { data: tempID } })
        } catch (e) {
            console.log(e)
            setMessage(e?.msg || e)
            setLoading(false)
        }
    }
    return (
        <>
            <JWTRoot>
                {/* <Card className="card"> */}
                <Grid
                    container
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Grid
                    className='robomotion_color_bg'
                        // style={{
                        //     backgroundColor: 'rgb(50, 81, 112)',
                        //     height: '100vh',
                        // }}
                        item
                        lg={5}
                        md={5}
                        sm={5}
                        xs={12}
                    >
                        <JustifyBox p={4} height="">
                            {/* <IMG
                                    src="/assets/images/illustrations/dreamer.svg"
                                    alt=""
                                /> */}
                        </JustifyBox>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <ContentBox>
                            {/* {message} */}
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    sx={{ mb: '12px', width: '100%' }}
                                    label="OTP"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="otp"
                                    type="password"
                                    value={userInfo.otp}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />

                                {message && (
                                    <Paragraph sx={{ color: textError }}>
                                        {message}
                                    </Paragraph>
                                )}

                                <FlexBox mb={2} flexWrap="wrap">
                                    <Box position="relative">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                            type="submit"
                                        >
                                            Verify
                                        </Button>
                                        {loading && (
                                            <StyledProgress
                                                size={24}
                                                className="buttonProgress"
                                            />
                                        )}
                                    </Box>
                                </FlexBox>
                            </ValidatorForm>
                        </ContentBox>
                    </Grid>
                </Grid>
                {/* </Card> */}
            </JWTRoot>
        </>
    )
}
