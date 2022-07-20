
import React, { useState, useEffect, useRef } from 'react'
import './Tutorials.css'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function Tutorials() {

    const [expanded, setExpanded] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }
    return (
        <div className="tutorial_wrapper">
            Quick Start
            <div>
                <Accordion
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Introduction
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            Pending
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <div>
                                <div className="tutorial_accordion_subtitle">
                                    What is Robomotion?
                                </div>
                                <div className="tutorial_accordion_body">
                                    Robomotion is a low-code Robotic Process
                                    Automation (RPA) platform. It is a visual
                                    drag and drop tool to create automations
                                    with native Javascript scripting language
                                    support.
                                </div>
                            </div>
                            <div>
                                <div className="tutorial_accordion_subtitle">
                                    What is RPA?
                                </div>
                                <div className="tutorial_accordion_body">
                                    RPA is a bundle of automation technologies.
                                    It provides you the tools to integrate
                                    applications together. You can think of RPA
                                    like a macro that runs on your desktop, but
                                    it is much more than a mouse and keyboard
                                    recorder. Automations runs on an agent
                                    software that you install into your
                                    computer. These agents are called "software
                                    robots" or "robots" for short.
                                </div>
                            </div>
                            <div>
                                <div className="tutorial_accordion_subtitle">
                                    What is it used for?
                                </div>
                                <div className="tutorial_accordion_body">
                                    It is mostly used for automating web or
                                    desktop applications that does not provide
                                    an API. Periodically login to an application
                                    and enter data you get from mail, excel file
                                    or database. Open a legacy application and
                                    sync data to the new application. Scrape
                                    data from web sites
                                </div>
                            </div>
                            <div>
                                <div className="tutorial_accordion_subtitle">
                                    Who uses it?
                                </div>
                                <div className="tutorial_accordion_body">
                                    Many industries use RPA especially those
                                    that carry out repetitive tasks including
                                    insurance, banking, finance, healthcare and
                                    telecommunications. Here are some uses cases
                                    Accounting uses it for transactional
                                    reporting, operational accounting, bank
                                    reconciliations Human Resources uses it for
                                    onboarding or off boarding employees Supply
                                    Chain Management uses it for procurement,
                                    checking inventory, ordering and payments
                                    Insurance uses it for processing insurance
                                    claims, regulatory compliance .
                                </div>
                            </div>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === 'panel2'}
                    onChange={handleChange('panel2')}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Installing Robot and Web Extensions
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            Pending
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <div>
                                <div className="tutorial_accordion_subtitle">
                                    Installing Robot?
                                </div>
                                <div className="tutorial_accordion_body">
                                    In order to run the automations, you need to
                                    install Robot for your operating system. You
                                    can follow the instructions from our docs
                                </div>
                            </div>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === 'panel3'}
                    onChange={handleChange('panel3')}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Run Your First Flow
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            Pending
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <div>
                                <div className="tutorial_accordion_subtitle">
                                    Follow these steps to run your first flow
                                </div>
                                <div className="tutorial_accordion_body">
                                    Use the most basic nodes: Inject, Debug and
                                    Stop. Create your first flow, drag and drop
                                    these nodes and connect together. Connect
                                    your robot from your operating system and
                                    then press Run from the Flow Designer See
                                    the results in Flow Designer Now you can try
                                    out more advanced flows from our templates
                                    here.
                                </div>
                            </div>
                            
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}
