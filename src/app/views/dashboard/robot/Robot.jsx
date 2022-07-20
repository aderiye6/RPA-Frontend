import React, { Fragment, useEffect, useState } from 'react'
import { Box, styled, useTheme } from '@mui/system'

import { Button, Grid, IconButton, Paper, TextField } from '@mui/material'
import { SearchOutlined, UploadFile } from '@mui/icons-material'
import MUITable from '../shared/MUITable'
import MUITable2 from '../shared/MUITable2'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import CreateRobotModal from 'app/components/Modal/CreateRobotModal/CreateRobotModal'
import { Option } from 'antd/lib/mentions'
import UpdateRobotModal from 'app/components/Modal/UpdateRobotModal'
import { getRobots } from 'app/AppServices/apiService/Services'

const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    marginTop: '0',
    paddingLeft: '10px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const tableStyle = {
    // display: "block",
    transitionDuration: '0.3s',
    height: '92%',
    marginTop: '2rem',
}

const addRobotStlye = {
    // backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    // height:'50%'
}

const DashBody = {
    backgroundColor: '#FFFFFF',
    paddingTop: '85px',
    height: '100vh',
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}))

export default function Robot() {
    const [age, setAge] = React.useState('')

    const [showCreateRobot, setshowCreateRobot] = React.useState(false)
    const [showUpdateRobot, setshowUpdateRobot] = React.useState(false)
    const [robotData, setrobotData] = useState()
    const [robotID, setrobotID] = useState()

    const getRobotData = async () => {
        const res = await getRobots()
        console.log(res)
        setrobotData(res?.data?.data)
    }
    useEffect(() => {
      

        getRobotData()
    }, [])

    const CreateRobotModalSetter = (value) => {
        setshowCreateRobot(value)
    }

    const UpdateRobotModalSetter = (value) => {
        setshowUpdateRobot(value)
    }

    const handleChange = (event) => {
        setAge(event.target.value)

    }
    const selectedRobotIDSetter=(value)=>{
        setrobotID(value)
    }

    return (
        <div style={DashBody}>
            <Fragment>
                {/* <Select
                    suffixIcon={<ArrowDropDownCircleTwoTone />}
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select> */}
                {showCreateRobot && (
                    <CreateRobotModal
                        CreateRobotModalSetter={CreateRobotModalSetter}
                        getRobotData={getRobotData}
                    />
                )}
                {showUpdateRobot && (
                    <UpdateRobotModal
                    robotID={robotID}
                    getRobotData={getRobotData}
                        UpdateRobotModalSetter={UpdateRobotModalSetter}
                    />
                )}

                <ContentBox className="analytics">
                    <Box>
                        <img src="/robot22.png" />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            p: 1,
                            m: 1,
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                columnGap: '10px',
                                p: 1,
                                m: 1,
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                            }}
                        >
                            <Box>Show</Box>

                            <Box>
                                {' '}
                                <FormControl
                                    sx={{ m: 1, minWidth: 60 }}
                                    size="small"
                                >
                                    <InputLabel id="demo-simple-select-label">
                                        No
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Age"
                                        onChange={handleChange}
                                        MenuProps={{
                                            style: {
                                                maxHeight: 300,
                                            },
                                        }}
                                    >
                                        <MenuItem defaultValue={1} value={10}>
                                            1
                                        </MenuItem>
                                        <MenuItem value={20}>2</MenuItem>
                                        <MenuItem value={30}>3</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box>entries</Box>

                            <Box>
                                {' '}
                                <TextField
                                    width="150px"
                                    id="standard-bare"
                                    variant="outlined"
                                    defaultValue="Search..."
                                    InputProps={{
                                        style: {
                                            height: '35px',
                                            width: '150%',
                                            paddingLeft: '0px',
                                        },
                                        startAdornment: (
                                            <IconButton>
                                                <SearchOutlined />
                                            </IconButton>
                                        ),
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box style={addRobotStlye}>
                            <Button
                                variant="contained"
                                startIcon={<UploadFile />}
                                onClick={() => setshowCreateRobot(true)}
                            >
                                Add Robot
                            </Button>
                        </Box>
                    </Box>
                    {/* <Box>
                        <MUITable2 />
                    </Box> */}
                    <Grid
                        container
                        rowSpacing={4}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <MUITable2
                            selectedRobotIDSetter={selectedRobotIDSetter}
                            robotData={robotData}
                                UpdateRobotModalSetter={UpdateRobotModalSetter}
                                getRobotData={getRobotData}
                            />
                        </Grid>
                    </Grid>
                </ContentBox>
            </Fragment>
        </div>
    )
}
