import React, { Fragment, useState, useEffect } from 'react'
import { Box, styled, useTheme } from '@mui/system'

import {
    Button,
    Grid,
    IconButton,
    Paper,
    TextField,
    Modal,
    Input,
} from '@mui/material'
import { SearchOutlined, UploadFile } from '@mui/icons-material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import { ValidatorForm } from 'react-material-ui-form-validator'
import { TextValidator } from 'react-material-ui-form-validator'
import './index.css'
import {
    createTrigger,
    getFlows,
    getRobots,
    retrieveFlowData,
} from 'app/AppServices/apiService/Services'
import Loader from 'app/components/Loadable/Loader'
import { notification } from 'antd'

const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    marginTop: '0',
    paddingLeft: '10px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 'max-content',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    p: 2,
}


const addRobotStlye = {
    display: 'flex',
    alignItems: 'center',
    // height:'50%'
}


export default function Search(props) {
    const { action, inviteUserModalSetter, isUser } = props
    const [openModal, setopenModal] = useState(false)
    const [age, setAge] = React.useState('')
    const [triggerStage2, settriggerStage2] = useState(false)
    const [robotData, setrobotData] = useState()
    const [flowsData, setflowsData] = useState()
    const [robotID, setrobotID] = useState()
    const [flowID, setflowID] = useState()
    const [triggerType, settriggerType] = useState()
    const [triggerItem, settriggerItem] = useState()
    const [ProjectName, setprojectName] = useState()
    const [ProjectDescription, setProjectDescription] = useState()
    const [flowVersions, setflowVersions] = useState()
    const [selectedFlowVersion, setselectedFlowVersion] = useState()
    const [message, setmessage] = useState()
    const [loading, setloading] = useState(false)

    const handleChange = (event) => {
        setAge(event.target.value)
    }

    const [directoryPath, setdirectoryPath] = useState()
    const [fileName, setfileName] = useState()
    /////////////////////////
    const [selected, setselected] = useState()

    const countries = [
        { id: '1', name: 'File System', value:'FILE_SYSTEM' },
        // { id: '2', name: 'Mail' },
        // { id: '3', name: 'HTTP' },
    ]

    const states = [
        {
            id: '1',
            countryId: '1',
            name: 'File Created',
            registration: '$25, 000.00',
            renewal: '$25, 000.00',
        },
        {
            id: '2',
            countryId: '1',
            name: 'File Deleted',
            registration: '$250, 000.00',
            renewal: '$50, 000.00',
        },
        {
            id: '3',
            countryId: '2',
            name: 'Received',
            registration: '$200, 000.00',
            renewal: '$50, 000.00',
        },

        {
            id: '6',
            countryId: '3',
            name: 'HTTP In',
            registration: '$100, 000.00',
            renewal: '$40, 000.00',
        },
    ]

    const cities = [
        { id: '1', stateId: '1', name: 'Faridabad' },
        { id: '2', stateId: '1', name: 'Palwal' },
        { id: '3', stateId: '2', name: 'Mandi House' },
        { id: '4', stateId: '2', name: 'kalka Ji' },
        { id: '1', stateId: '3', name: 'Houston' },
        { id: '2', stateId: '3', name: 'Austin' },
        { id: '3', stateId: '4', name: 'Los Angeles' },
        { id: '4', stateId: '4', name: 'Son Diego' },
    ]

    const [country, setCountry] = useState([])
    const [state, setState] = useState([])
    const [city, setCity] = useState([])

    useEffect(() => {
        setCountry(countries)
        const getRobotData = async () => {
            const res = await getRobots()

            setrobotData(res?.data?.data)
        }

        const getFlowData = async () => {
            try {
                const res = await getFlows()

                setflowsData(
                    res?.data?.data.filter(
                        (flow) => flow?.shared_type === 'Private'
                    )
                )
            } catch (err) {
                // setloading(false)
                console.log(err)
            }
        }

        getRobotData()
        getFlowData()
    }, [])

    const triggerTypeChange = (id) => {
        const dt = states.filter((x) => x.countryId === id)
        setState(dt)
        const triggerTyp = countries.filter((x) => x.id === id)

        settriggerType(triggerTyp[0]?.value)
    }

    const triggerItemChange = (id) => {
        const selectedType = states.filter((state) => state.id === id)
        setselected(selectedType[0]?.name)

        const dt = cities.filter((x) => x.stateId === id)

        settriggerItem(selectedType[0]?.name)
        setCity(dt)
    }

    const handlePathChange = ({ target: { name, value } }) => {
        // let temp = { ...userInfo }
        // temp[name] = value
        // setUserInfo(temp)
        setdirectoryPath(value)
    }
    const handleFileNameChange = ({ target: { name, value } }) => {
        // let temp = { ...userInfo }
        // temp[name] = value
        // setUserInfo(temp)
        setfileName(value)
    }

    const { palette } = useTheme()
    const textError = palette.error.main
    const textPrimary = palette.primary.main

    const handleFormSubmit = async (event) => {
        // setLoading(true)
        try {
            // await login(
            //     userInfo.email,
            //     userInfo.password,
            //     userInfo.workspace_url
            // )
            // navigate('/')
        } catch (e) {
            console.log(e)
            // setMessage(e?.message || e?.msg)
            // setLoading(false)
        }
    }

    const createTriggerAction = async () => {
        setloading(true)
        const data = {
            name: ProjectName,
            description: ProjectDescription,
            robot_id: robotID,
            flow_id: flowID,
            flow_version: selectedFlowVersion,
            trigger_type: triggerType,
            trigger_item: triggerItem,
            trigger_properties: {
                directory: directoryPath,
                file_name: fileName,
            },
        }

    

        try {
            const res = await createTrigger(data)
            setopenModal(false) 
            notification.success({
                message:'success',
                description: res?.data?.msg || "trigger created"
            })
            setloading(false)
            console.log(res)
        } catch (err) {
            setloading(false)
            setmessage(err?.response?.data?.msg)
      
        }
    }

    const onSelectflowChange = async (value) => {
        setflowID(value)
        try {
            const res = await retrieveFlowData(value)
            setflowVersions(res?.data?.data)
        } catch (err) {
            console.log(err)
            setmessage(err?.response?.data?.msg)
        }
    }

    return (
        <div style={{ backgroundColor: 'red' }}>
            <Fragment>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // p: 1,
                        // m: 1,
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
                            onClick={() => {
                                isUser
                                    ? inviteUserModalSetter(true)
                                    : setopenModal(true)
                            }}
                            variant="contained"
                            startIcon={<UploadFile />}
                        >
                            {action}
                        </Button>
                    </Box>
                </Box>
                <Modal
                    open={openModal}
                    onClose={() => setopenModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    marginBottom: '2rem',
                                    width: '100%',
                                }}
                            >
                                New Trigger
                            </div>
                        </Typography>
                        <div style={{color:'red'}}>{message}</div>
                        

                        <div
                            container
                            xs={12}
                            spacing={1}
                            className="trigger_modal"
                        >
                            {!triggerStage2 ? (
                                <>
                                    <div>
                                        <div className="trigger_modal">
                                            <div>
                                                <select
                                                    style={{
                                                        width: '100%',
                                                        height: '40px',
                                                    }}
                                                    id="ddlCountry"
                                                    className="form-control select-class"
                                                    onChange={(e) =>
                                                        triggerTypeChange(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="0">
                                                        Select Trigger Type
                                                    </option>
                                                    {country &&
                                                    country !== undefined
                                                        ? country.map(
                                                              (ctr, index) => {
                                                                  return (
                                                                      <option
                                                                          key={
                                                                              index
                                                                          }
                                                                          value={
                                                                              ctr.id
                                                                          }
                                                                      >
                                                                          {
                                                                              ctr.name
                                                                          }
                                                                      </option>
                                                                  )
                                                              }
                                                          )
                                                        : 'No Country'}
                                                </select>
                                            </div>

                                            <br></br>
                                            <div>
                                                <select
                                                    style={{
                                                        width: '100%',
                                                        height: '40px',
                                                    }}
                                                    id="ddlStates"
                                                    className="form-control select-class"
                                                    onChange={(e) =>
                                                        triggerItemChange(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="0">
                                                        Select Trigger Item
                                                    </option>
                                                    {state &&
                                                    state !== undefined
                                                        ? state.map(
                                                              (ctr, index) => {
                                                                  return (
                                                                      <option
                                                                          key={
                                                                              index
                                                                          }
                                                                          value={
                                                                              ctr.id
                                                                          }
                                                                      >
                                                                          {
                                                                              ctr.name
                                                                          }
                                                                      </option>
                                                                  )
                                                              }
                                                          )
                                                        : 'No State'}
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            {selected && (
                                                <>
                                                    <div>Properties</div>

                                                    <div>
                                                        <ValidatorForm
                                                            onSubmit={
                                                                handleFormSubmit
                                                            }
                                                        >
                                                            <TextValidator
                                                                sx={{
                                                                    mb: 3,
                                                                    width: '100%',
                                                                }}
                                                                variant="outlined"
                                                                size="small"
                                                                label="Directory path *"
                                                                onChange={
                                                                    handlePathChange
                                                                }
                                                                type="directory"
                                                                name="directory"
                                                                // defaultValue="C:\\Users\\olade\\Downloads"
                                                                // value={userInfo.email}
                                                                validators={[
                                                                    'required',
                                                                ]}
                                                                errorMessages={[
                                                                    'this field is required',
                                                                ]}
                                                            />

                                                            <TextValidator
                                                                sx={{
                                                                    mb: 3,
                                                                    width: '100%',
                                                                }}
                                                                variant="outlined"
                                                                size="small"
                                                                label="FIle Name *"
                                                                onChange={
                                                                    handleFileNameChange
                                                                }
                                                                type="text"
                                                                name="file_name"
                                                                // value={
                                                                //     userInfo.workspace_url
                                                                // }
                                                                validators={[
                                                                    'required',
                                                                ]}
                                                                errorMessages={[
                                                                    'this field is required',
                                                                ]}
                                                            />
                                                        </ValidatorForm>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <div>
                                            <Box className="create_robot_div">
                                                <Box
                                                    style={{
                                                        marginRight: '1rem',
                                                    }}
                                                    className=""
                                                    onClick={() => {
                                                        setopenModal(false)
                                                    }}
                                                >
                                                    <Button>CANCEL</Button>
                                                </Box>
                                                <Box className="">
                                                    <Button
                                                        onClick={() =>
                                                            settriggerStage2(
                                                                true
                                                            )
                                                        }
                                                        style={{
                                                            Color:
                                                                triggerItem &&
                                                                triggerType &&
                                                                directoryPath &&
                                                                fileName
                                                                    ? 'blue'
                                                                    : 'gray',
                                                        }}
                                                        disabled={
                                                            !triggerItem &&
                                                            !triggerType &&
                                                            !directoryPath &&
                                                            !fileName
                                                        }
                                                    >
                                                        NEXT
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <div className="trigger_modal">
                                            {/* <div style={{color:'red'}} >{message}</div> */}
                                            <Box className="">
                                                <Box>
                                                    {' '}
                                                    <Input
                                                        size="large"
                                                        placeholder="Name *"
                                                        style={{
                                                            width: '100%',
                                                            height: 40,
                                                        }}
                                                        onChange={(e) =>
                                                            setprojectName(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </Box>
                                                <Box>
                                                    {' '}
                                                    <Input
                                                        size="large"
                                                        placeholder="Description *"
                                                        style={{
                                                            width: '100%',
                                                            height: 40,
                                                            marginTop: '20px',
                                                        }}
                                                        onChange={(e) =>
                                                            setProjectDescription(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </Box>
                                            </Box>
                                        </div>
                                        <div>
                                            <select
                                                style={{
                                                    width: '100%',
                                                    height: '40px',
                                                }}
                                                id="ddlStates"
                                                className="form-control select-class"
                                                onChange={(e) =>
                                                    onSelectflowChange(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="0">
                                                    Select flow
                                                </option>
                                                {flowsData &&
                                                flowsData !== undefined
                                                    ? flowsData.map(
                                                          (ctr, index) => {
                                                              return (
                                                                  <option
                                                                      key={
                                                                          index
                                                                      }
                                                                      value={
                                                                          ctr.id
                                                                      }
                                                                  >
                                                                      {ctr.name}
                                                                  </option>
                                                              )
                                                          }
                                                      )
                                                    : 'No State'}
                                            </select>
                                        </div>
                                        <div>
                                            <select
                                                style={{
                                                    width: '100%',
                                                    height: '40px',
                                                    margin: '1rem 0',
                                                }}
                                                id="ddlStates"
                                                className="form-control select-class"
                                                onChange={(e) =>
                                                    setselectedFlowVersion(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="0">
                                                    Select Version
                                                </option>
                                                {flowVersions &&
                                                flowVersions !== undefined
                                                    ? flowVersions.map(
                                                          (ctr, index) => {
                                                              return (
                                                                  <option
                                                                      key={
                                                                          index
                                                                      }
                                                                      value={
                                                                          ctr.version
                                                                      }
                                                                  >
                                                                      {
                                                                          ctr.version
                                                                      }
                                                                  </option>
                                                              )
                                                          }
                                                      )
                                                    : 'No State'}
                                            </select>
                                        </div>

                                        <div>
                                            <select
                                                style={{
                                                    width: '100%',
                                                    height: '40px',
                                                }}
                                                id="ddlStates"
                                                className="form-control select-class"
                                                onChange={(e) =>
                                                    setrobotID(e.target.value)
                                                }
                                            >
                                                <option value="0">
                                                    Select Robot
                                                </option>
                                                {robotData &&
                                                robotData !== undefined
                                                    ? robotData.map(
                                                          (ctr, index) => {
                                                              return (
                                                                  <option
                                                                      key={
                                                                          index
                                                                      }
                                                                      value={
                                                                          ctr.id
                                                                      }
                                                                  >
                                                                      {ctr.name}
                                                                  </option>
                                                              )
                                                          }
                                                      )
                                                    : 'No State'}
                                            </select>
                                        </div>

                                        <div>
                                            <Box className="create_robot_div">
                                                <Box className="">
                                                    <Button
                                                        onClick={() =>
                                                            settriggerStage2(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        Back
                                                    </Button>
                                                </Box>
                                                <Box
                                                    style={{
                                                        marginLeft: '1rem',
                                                        marginRight: '1rem',
                                                    }}
                                                    className=""
                                                >
                                                    <Button
                                                        onClick={() => {
                                                            setopenModal(false)
                                                        }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Box>
                                                <Box className="">
                                                    <Button
                                                        onClick={() =>
                                                            createTriggerAction()
                                                        }
                                                        style={{
                                                            Color:
                                                                flowID ===
                                                                    undefined &&
                                                                robotID ===
                                                                    undefined &&
                                                                selectedFlowVersion ===
                                                                    undefined &&
                                                                ProjectName ===
                                                                    undefined &&
                                                                ProjectDescription ===
                                                                    undefined
                                                                    ? 'blue'
                                                                    : 'gray',
                                                        }}
                                                        disabled={
                                                           ( (flowID ===
                                                                undefined) &&
                                                            (robotID ===
                                                                undefined) &&
                                                            (selectedFlowVersion ===
                                                                undefined) &&
                                                            (ProjectName ===
                                                                undefined) &&
                                                           ( ProjectDescription ===
                                                                undefined))
                                                        }
                                                    >
                                                        {loading? <Loader/> : "Create"}
                                                
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </Box>
                </Modal>
            </Fragment>
        </div>
    )
}
