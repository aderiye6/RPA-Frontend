import {
    Card,
    Grid,
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
} from '@mui/material'
import React, { useState } from 'react'
import useAuth from 'app/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Box, styled, useTheme } from '@mui/system'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Paragraph, Span } from 'app/components/Typography'
import './styles.css'

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

const JwtLogin = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        workspace_url: '',
    })
    const [message, setMessage] = useState('')
    const { login } = useAuth()

    const handleChange = ({ target: { name, value } }) => {
        let temp = { ...userInfo }
        temp[name] = value
        setUserInfo(temp)
    }

    const { palette } = useTheme()
    const textError = palette.error.main
    const textPrimary = palette.primary.main

    const handleFormSubmit = async (event) => {
        setLoading(true)
        try {
            await login(
                userInfo.email,
                userInfo.password,
                userInfo.workspace_url
            )
            navigate('/')
        } catch (e) {
            console.log(e)
            setMessage(e?.message || e?.msg)
            setLoading(false)
        }
    }

    return (
        <JWTRoot>
            <Grid
                container
                style={{
                    display: 'flex',
                    alignItems: 'center',

                    justifyContent: 'center',
                }}
            >
                <Grid item lg={7} md={7} sm={7} xs={12}>
                    <ContentBox>
                        <ValidatorForm onSubmit={handleFormSubmit}>
                            <TextValidator
                                sx={{ mb: 3, width: '80%' }}
                                variant="outlined"
                                size="small"
                                label="Email"
                                onChange={handleChange}
                                type="email"
                                name="email"
                                value={userInfo.email}
                                validators={['required', 'isEmail']}
                                errorMessages={[
                                    'this field is required',
                                    'email is not valid',
                                ]}
                            />
                            <TextValidator
                                sx={{ mb: '12px', width: '80%' }}
                                label="Password"
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                name="password"
                                type="password"
                                value={userInfo.password}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextValidator
                                sx={{ mb: 3, width: '80%' }}
                                variant="outlined"
                                size="small"
                                label="workspace_url"
                                onChange={handleChange}
                                type="text"
                                name="workspace_url"
                                value={userInfo.workspace_url}
                                // validators={['required', 'isEmail']}
                                // errorMessages={[
                                //     'this field is required',
                                //     'email is not valid',
                                // ]}
                            />
                            <FormControlLabel
                                sx={{ mb: '12px', maxWidth: 288 }}
                                name="agreement"
                                onChange={handleChange}
                                control={
                                    <Checkbox
                                        size="small"
                                        onChange={({ target: { checked } }) =>
                                            handleChange({
                                                target: {
                                                    name: 'agreement',
                                                    value: checked,
                                                },
                                            })
                                        }
                                        checked={userInfo.agreement || true}
                                    />
                                }
                                label="Remember me"
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
                                        Sign in
                                    </Button>
                                    {loading && (
                                        <StyledProgress
                                            size={24}
                                            className="buttonProgress"
                                        />
                                    )}
                                </Box>
                                <Span sx={{ mr: 1, ml: '20px' }}>or</Span>
                                <Button
                                    sx={{ textTransform: 'capitalize' }}
                                    onClick={() => navigate('/session/signup')}
                                >
                                    Sign up
                                </Button>
                            </FlexBox>
                            <Button
                                sx={{ color: textPrimary }}
                                onClick={() =>
                                    navigate('/session/forgot-password')
                                }
                            >
                                Forgot password?
                            </Button>
                        </ValidatorForm>
                    </ContentBox>
                </Grid>
                <Grid

                className='robomotion_color_bg'
                    // style={{
                    //     backgroundColor: 'rgb(50, 81, 112)',
                    //     height: '50vh',
                    // }}
                    item
                    lg={5}
                    md={5}
                    sm={5}
                    xs={12}
                >
                    
                </Grid>
            </Grid>
        </JWTRoot>
    )
}

export default JwtLogin
