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
import { Paragraph } from 'app/components/Typography'
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
    minHeight: '100vh !important',
    '& .card': {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
}))

const StyledProgress = styled(CircularProgress)(() => ({
    position: 'absolute',
    top: '6px',
    left: '25px',
}))

export default function AccountSetUp() {
    const location = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [tempID, settempID] = useState()
    const [userInfo, setUserInfo] = useState({
        robot_name: '',
        password: '',
        workspace_url: '',
        workspace_name: '',
        // tempID
    })
    const [message, setMessage] = useState('')
    const { accountSetup } = useAuth()

    useEffect(() => {
        settempID(location?.state?.data)
    }, [])

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
            const res = await accountSetup(
                userInfo.robot_name,
                userInfo.password,
                userInfo.workspace_url,
                userInfo.workspace_name,
                tempID
            )

            navigate('/')
        } catch (e) {
            setMessage(e?.msg)
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
                <Grid
                    style={{
                        backgroundColor: 'rgb(50, 81, 112)',
                        height: '100vh',
                    }}
                    item
                    lg={5}
                    md={5}
                    sm={5}
                    xs={12}
                >
                    <JustifyBox p={4} height="100%">

                    </JustifyBox>
                </Grid>
                <Grid item lg={7} md={7} sm={7} xs={12}>
                    <ContentBox>
                        <ValidatorForm onSubmit={handleFormSubmit}>
                            <TextValidator
                                sx={{ mb: 3, width: '100%' }}
                                variant="outlined"
                                size="small"
                                label="Robot name"
                                onChange={handleChange}
                                type="text"
                                name="robot_name"
                                value={userInfo.robot_name}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextValidator
                                sx={{ mb: '12px', width: '100%' }}
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
                                sx={{ mb: 3, width: '100%' }}
                                variant="outlined"
                                size="small"
                                label="workspace_url"
                                onChange={handleChange}
                                type="text"
                                name="workspace_url"
                                value={userInfo.workspace_url}
                                validators={['required']}
                                errorMessages={[
                                    'workspace_url field is required',
                                ]}
                            />

                            <TextValidator
                                sx={{ mb: 3, width: '100%' }}
                                variant="outlined"
                                size="small"
                                label="workspace_name"
                                onChange={handleChange}
                                type="text"
                                name="workspace_name"
                                value={userInfo.workspace_name}
                                validators={['required']}
                                errorMessages={[
                                    'workspace_name field is required',
                                ]}
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
                                label="Confirm Valid"
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
                                        Setup
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
        </JWTRoot>
    )
}
