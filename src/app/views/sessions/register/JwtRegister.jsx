import useAuth from 'app/hooks/useAuth'
import React, { useState } from 'react'
import { Box, styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { Span } from 'app/components/Typography'
import { Card, Checkbox, FormControlLabel, Grid, Button } from '@mui/material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const ContentBox = styled(JustifyBox)(() => ({
    height: '100%',
    padding: '32px',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const IMG = styled('img')(() => ({
    width: '100%',
}))

const JWTRegister = styled(JustifyBox)(() => ({
    background: '#ffffff',
    height: '100vh !important',
    '& .card': {
        // maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
}))

const JwtRegister = () => {
    const navigate = useNavigate()
    const [state, setState] = useState({})
    const { register } = useAuth()
    const [error, seterror] = useState()

    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleFormSubmit = async (event) => {
        seterror('')
        try {
            const temp_id = await register(
                state.email,
                state.username
                // state.password
            )
            navigate('/verify-otp', { state: { data: temp_id } })
        } catch (err) {
            seterror(err?.msg)
        
        }
    }

    let { username, email, password, agreement } = state

    return (
        <JWTRegister>
            {/* <Card className=""> */}
            <Grid
                container
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Grid
                    style={{ backgroundColor: '#ffffff' }}
                    item
                    lg={7}
                    md={7}
                    sm={7}
                    xs={12}
                >
                    <Box p={4} height="100%">
                        <ValidatorForm onSubmit={handleFormSubmit}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    color: 'red',
                                    padding: '1rem 0',
                                }}
                            >
                                {error}
                            </div>
                            <TextValidator
                                sx={{ mb: 3, width: '80%' }}
                                variant="outlined"
                                size="small"
                                label="Full name"
                                onChange={handleChange}
                                type="text"
                                name="username"
                                value={username || ''}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextValidator
                                sx={{ mb: 3, width: '80%' }}
                                variant="outlined"
                                size="small"
                                label="Email"
                                onChange={handleChange}
                                type="email"
                                name="email"
                                value={email || ''}
                                validators={['required', 'isEmail']}
                                errorMessages={[
                                    'this field is required',
                                    'email is not valid',
                                ]}
                            />
                            {/* <TextValidator
                                    sx={{ mb: '16px', width: '100%' }}
                                    label="Password"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    value={password || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                /> */}
                            <FormControlLabel
                                sx={{ mb: '16px' }}
                                name="agreement"
                                onChange={(e) =>
                                    handleChange({
                                        target: {
                                            name: 'agreement',
                                            value: e.target.checked,
                                        },
                                    })
                                }
                                control={
                                    <Checkbox
                                        size="small"
                                        checked={agreement || false}
                                    />
                                }
                                label="I have read and agree to the terms of service."
                            />
                            <FlexBox>
                                <Button
                                    type="submit"
                                    style={{backgroundColor:'orange', color:'white'}}
                                    // color="primary"
                                    variant="contained"
                                    sx={{ textTransform: 'capitalize' }}
                                >
                                    Sign up
                                </Button>
                                <Span sx={{ mr: 1, ml: '20px' }}>or</Span>
                                <Button
                                    sx={{ textTransform: 'capitalize' }}
                                    onClick={() => navigate('/session/signin')}
                                >
                                    Sign in
                                </Button>
                            </FlexBox>
                        </ValidatorForm>
                    </Box>
                </Grid>
                <Grid

                className='robomotion_color_bg'
                    item
                    lg={5}
                    md={5}
                    sm={5}
                    xs={12}
                >
                    <ContentBox height="100%">
                        {/* <IMG
                            src="/assets/images/illustrations/posting_photo.svg"
                            alt=""
                        /> */}
                    </ContentBox>
                </Grid>
            </Grid>
            {/* </Card> */}
        </JWTRegister>
    )
}

export default JwtRegister
