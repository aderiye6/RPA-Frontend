import React, { Fragment } from 'react'
import { Box, styled, useTheme } from '@mui/system'

import { Button, Grid, IconButton, Paper, TextField } from '@mui/material'
import { SearchOutlined, UploadFile } from '@mui/icons-material'
import MUITable from '../shared/MUITable'
import MUITable2 from '../shared/MUITable2'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { Select as AntdSelect } from 'antd'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Option } from 'antd/lib/mentions'





const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}))
export default function SearchV2(props) {
    const { action } = props
    const [age, setAge] = React.useState('')

    const handleChange = (event) => {
        setAge(event.target.value)
    }
    return (
        <div style={{ backgroundColor: '' }}>
            {/* <Fragment> */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    // p: 1,
                    // m: 1,
                    bgcolor: 'background.paper',
                    bgcolor: '',
                    borderRadius: 1,
                    marginTop: '1rem',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        columnGap: '10px',
                        // p: 1,
                        // m: 1,
                        // bgcolor: 'background.paper',
                        // bgColor: 'red',
                        width: '100%',
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
                        }}
                    >
                        <Box>Show</Box>

                        <Box>
                            {' '}
                            <FormControl
                                sx={{ m: 1, minWidth: 60 }}
                                // size="small"
                            >
                                <InputLabel id="demo-simple-select-label">
                                    No
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={age}
                                    label="Age"
                                    onChange={handleChange}
                                    MenuProps={{
                                        style: {
                                            // maxHeight: 300,
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
                                    // height: '35px',
                                    // width: '150%',
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

                    <Box>
                        <FormControl style={{ width: '100px' }}>
                            <InputLabel id="demo-simple-select-label">
                                Category
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="Category"
                                onChange={handleChange}
                            >
                                <MenuItem selected defaultValue={10}>
                                    All
                                </MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl style={{ width: '100px' }}>
                            <InputLabel id="demo-simple-select-label">
                                Action
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="Action"
                                onChange={handleChange}
                            >
                                <MenuItem selected defaultValue={10}>
                                    All
                                </MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl style={{ width: '100px' }}>
                            <InputLabel id="demo-simple-select-label">
                                Last
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="Last"
                                onChange={handleChange}
                            >
                                <MenuItem selected defaultValue={10}>
                                    All
                                </MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </Box>
            {/* </Fragment> */}
        </div>
    )
}
