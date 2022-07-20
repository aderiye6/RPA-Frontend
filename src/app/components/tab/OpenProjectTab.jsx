import React from 'react'
import { AppBar, Box, Tab, Tabs, Typography } from '@material-ui/core'
// import { TabPanel } from '@material-ui/lab';
import PropTypes from 'prop-types'
import './MUITab.css'
import BillingApplication from 'app/views/dashboard/billing/BillingApplication'
import BillingCompanyInfo from 'app/views/dashboard/billing/BillingCompanyInfo'
import BillingTransactions from 'app/views/dashboard/billing/BillingTransactions'
import Application from 'app/views/dashboard/respositories/Application'
import Package from 'app/views/dashboard/respositories/Package'
import MyFlows from 'app/views/dashboard/flows/myFlows/MyFlows'
import SharedFlows from 'app/views/dashboard/flows/sharedFlows/SharedFlows'

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

export default function OpenProjectTab(props) {
    //   const classes = useStyles();
    const { data, showimage, refetch, refetchSetter, isConsoleProject, ...other } = props
    const [value, setValue] = React.useState(0)
    console.log(props)

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
                    <Tab label="My Flows" {...a11yProps(0)} />
                    <Tab label="Shared Flows" {...a11yProps(1)} />
                 
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <MyFlows refetch={refetch} refetchSetter={refetchSetter} isConsoleProject={isConsoleProject} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SharedFlows refetch={refetch} refetchSetter={refetchSetter} isConsoleProject={isConsoleProject} />
            </TabPanel>
         
        </>
    )
}
