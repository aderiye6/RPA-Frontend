import React from 'react'
import { AppBar, Box, Tab, Tabs, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

export default function RoboConsoleTab(props) {
    //   const classes = useStyles();
    const { data, showimage, ...other } = props
    const [value, setValue] = React.useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        }
    }
    return (
        <>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: '#369FFF',
                        },
                    }}
                >
                    <Tab label="EVENTS" {...a11yProps(0)} />
                    <Tab label="OUTPUTS" {...a11yProps(1)} />
                    <Tab label="VARIABLES" {...a11yProps(2)} />
                    <Tab label="VAULTS" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <div>EVENTS</div>
                {/* <MyFlows /> */}
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div>OUTPUTS</div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div>VARIABLES</div>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <div>VAULTS</div>
            </TabPanel>
        </>
    )
}
