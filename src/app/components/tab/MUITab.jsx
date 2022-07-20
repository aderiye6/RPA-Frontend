import React from 'react'
import { AppBar, Box, Tab, Tabs, Typography } from '@material-ui/core'
// import { TabPanel } from '@material-ui/lab';
import PropTypes from 'prop-types'
import './MUITab.css'
import BillingApplication from 'app/views/dashboard/billing/BillingApplication'
import BillingCompanyInfo from 'app/views/dashboard/billing/BillingCompanyInfo'
import BillingTransactions from 'app/views/dashboard/billing/BillingTransactions'

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

export default function MUITab(props) {
    //   const classes = useStyles();
    const { data, showimage, ...other } = props
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
                    <Tab label="Application" {...a11yProps(0)} />
                    <Tab label="Company Info" {...a11yProps(1)} />
                    <Tab label="Transaction" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <BillingApplication />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <BillingCompanyInfo />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <BillingTransactions />
            </TabPanel>
        </>
    )
}
