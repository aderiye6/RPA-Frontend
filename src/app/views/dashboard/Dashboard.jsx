import React, { Fragment, useEffect, useState } from 'react'
import { Grid, Card } from '@mui/material'

import { Box, styled, useTheme } from '@mui/system'
import FunctionCard from './shared/FunctionCard'
import Robots from './shared/Robots'
import TasksMetric from './shared/TasksMetric'
import { getWorkspaceStats } from 'app/AppServices/apiService/Services'
import Chart from 'react-apexcharts'

////////////////////////

const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
}))

const cardStyle = {
    display: 'block',
    transitionDuration: '0.3s',
    height: '92%',
}

const DashBody = {
    backgroundColor: '#FFFFFF',
    paddingTop: '85px',
    height: '100vh',
}

const Analytics = () => {
    const [statData, setstatData] = useState()
    const [showConsole, setshowConsole] = useState(false)
    const [robotSummary, setrobotSummary] = useState()

    const matchesMobile = false
    const options = {
        states: {
            hover: {
                filter: {
                    type: 'none',
                },
            },
        },

        labels: ['admin', 'member', 'owner', 'limit'],
        colors: ['green', 'orange', 'brown', 'red'],
        fill: {
            colors: ['#F44336', '#eb348c', '#9C27B0', '#4634eb'],
        },

        chart: {
            offsetX: matchesMobile ? -20 : -90,
            offsetY: matchesMobile ? 10 : -50,
            stacked: true,
            stackType: '100%',
            toolbar: {
                show: false,
            },
            events: {
                animationEnd: function (ctx: any) {
                    ctx.toggleDataPointSelection(2)
                },
            },
        },
        plotOptions: {
            pie: {
                customScale: matchesMobile ? 1 : 0.6,
                donut: {
                    size: '65%',
                    labels: {
                        show: true,
                        name: {},
                        value: {
                            fontSize: '30px',
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Total',
                            fontSize: '42px',
                            color: '#373d3f',
                            formatter: function (w: any) {
                                return w.globals.seriesTotals.reduce(
                                    (a: number, b: number) => {
                                        return `${
                                            Number(
                                                statData?.users_summary.admin
                                            ) +
                                            Number(
                                                statData?.users_summary.member
                                            ) +
                                            Number(
                                                statData?.users_summary.owner
                                            )
                                        } / ${Number(
                                            statData?.users_summary.limit
                                        )}`
                                    },
                                    0
                                )
                            },
                        },
                    },
                },
            },
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '34px',
            },
            formatter: function (val: number, opts: any) {
                return `${Math.floor(val)}%`
            },
            dropShadow: {
                enabled: true,
            },
        },
        stroke: {
            width: 0,
        },
        xaxis: {
            categories: ['admin', 'member', 'owner', 'limit'],
            labels: {
                show: true,
            },
            axisBorder: {
                show: true,
            },
            axisTicks: {
                show: true,
            },
        },
        legend: {
            show: matchesMobile ? false : true,
            //   show: false,
            showForSingleSeries: false,
            showForNullSeries: true,
            showForZeroSeries: true,
            position: 'right',
            horizontalAlign: 'center',
            floating: false,
            inverseOrder: false,
            width: undefined,
            height: undefined,
            tooltipHoverFormatter: undefined,
            customLegendItems: [],
            offsetX: 50,
            offsetY: 150,
            labels: {
                colors: undefined,
                useSeriesColors: false,
            },
            itemMargin: {
                horizontal: 0,
                vertical: 10,
            },
            markers: {
                width: 12,
                height: 12,
                strokeWidth: 0,
                strokeColor: '#fff',
                fillColors: undefined,
                radius: 12,
                customHTML: undefined,
                onClick: undefined,
                offsetX: 0,
                offsetY: 0,
            },
        },
    }

    useEffect(() => {
        const getBoardWorkspaceStats = async () => {
            const res = await getWorkspaceStats()
            setstatData(res?.data?.data)
            console.log(res)
            setrobotSummary(res?.data?.data?.robots_summary)
        }

        getBoardWorkspaceStats()
    }, [])

    console.log(statData, 'kddkff')

    return (
        <div style={DashBody}>
            <Fragment>
                <Box style={{ backgroundColor: '' }}>
                    <img src="/Dashboard.png" />
                </Box>
                <ContentBox className="analytics">
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        <Grid item xs={12} md={3}>
                            <FunctionCard
                                name="Flow"
                                count={
                                    statData?.robots
                                        ? `${statData?.flows?.length}`
                                        : 0
                                }
                                content="You can edit, delete, schedule and 
                                share your flows"
                                iconUrl="/Group 98.png"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FunctionCard
                                name="Robot"
                                count={
                                    statData?.robots
                                        ? `${statData?.robots?.length}`
                                        : 0
                                }
                                content="You can edit, delete, schedule and 
                                share your flows"
                                iconUrl="/robot2.png"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FunctionCard
                                name="Schedule"
                                count={
                                    statData?.robots
                                        ? `${statData?.schedules?.length}`
                                        : 0
                                }
                                content="You can edit, delete, schedule and 
                                share your flows"
                                iconUrl="/schedule2.png"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FunctionCard
                                name="Users"
                                count={
                                    statData?.robots
                                        ? `${statData?.users?.length}`
                                        : 0
                                }
                                content="You can edit, delete, schedule and 
                                share your flows"
                                iconUrl="/users2.png"
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Robots
                                robotSummary={robotSummary}
                                size={200}
                                value={20}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <Card
                                style={cardStyle}
                                sx={{ px: 3, py: 2, mb: 3 }}
                            >
                                <TasksMetric />
                            </Card>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <Card sx={{ px: 3, py: 2, mb: 3 }}>
                                <div>
                                    {' '}
                                    <img
                                        src="/contacts4.png"
                                        style={{ marginRight: '0rem' }}
                                    />
                                    <Title style={{ marginLeft: '1rem' }}>
                                        USERS
                                    </Title>
                                </div>

                                <Grid
                                    style={{
                                        height: '300px',
                                        width: '100%',
                                        // border: '2px solid red',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        textAlign: 'center',
                                    }}
                                    // lg={3}
                                    // md={3}
                                    // sm={3}
                                    // xs={3}
                                >
                                    <Chart
                                        style={{
                                            marginLeft: '10rem',
                                            marginTop: '4rem',
                                        }}
                                        // series={[
                                        //     `${Number(
                                        //         statData?.users_summary.admin
                                        //     )}`,
                                        //     1,
                                        //     // `${Number(
                                        //     //     statData?.users_summary.member
                                        //     // )}`,
                                        //     `${Number(
                                        //         statData?.users_summary.owner
                                        //     )}`,
                                        //     `${Number(
                                        //         statData?.users_summary.limit
                                        //     )}`,
                                        // ]}
                                        series={[
                                            statData?.users_summary.admin,
                                            statData?.users_summary.member,
                                            statData?.users_summary.owner,
                                            statData?.users_summary.limit,
                                        ]}
                                        height="100%"
                                        width="400"
                                        options={options}
                                        type="donut"
                                    />
                                </Grid>
                                <Title>Workspace</Title>
                            </Card>
                        </Grid>
                    </Grid>
                </ContentBox>
            </Fragment>
        </div>
    )
}

export default Analytics
