import React, { useEffect } from 'react'
import { Grid, Card, Divider } from '@mui/material'
import styled from '@emotion/styled'
import { Box } from '@mui/system'
import DoughnutChart from './Doughnut'
import { useTheme } from '@emotion/react'
import Chart from 'react-apexcharts'
import CircularProgress from '@material-ui/core/CircularProgress'

////////////////////////
import Paper from '@material-ui/core/Paper'
import {
    ArgumentAxis,
    // Chart,
    PieSeries,
    Title,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui'

import { Animation } from '@devexpress/dx-react-chart'

const chartData = [
    { region: 'Asia', val: 3 },
    { region: 'Africa', val: 2 },
    { region: 'Northern America', val: 1 },
    { region: 'Latin America and the Caribbean', val: 3 },
    { region: 'Europe', val: 4 },
    { region: 'Oceania', val: 3 },
]

const CardRoot = styled(Card)(({ theme }) => ({
    marginBottom: '24px',
    padding: '24px !important',
    border: '1px solid #DFE0EB',
    [theme.breakpoints.down('sm')]: {
        paddingLeft: '16px !important',
    },
}))

const CardColumn = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirectiom: 'row',
    columnGap: '10px',
    alignItems: 'center',
    // justifyContent: 'space-between',
}))

interface DonutChartProps {
    series?: number[];
}

export default function Robots(props) {
    const { robotSummary, value, size } = props
    console.log(robotSummary?.on_demand?.connected, 'sjsjhs')
    const { palette } = useTheme()

    useEffect(() => {}, [robotSummary])
    const matchesMobile = false
    const options: ApexOptions = {
        states: {
            hover: {
                filter: {
                    type: 'none',
                },
            },
        },

        labels: ['Development Robots'],
        colors: ['gray'],

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
                            fontSize: '20px',
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: '',
                            fontSize: '42px',
                            color: '#373d3f',
                            formatter: function (w: any) {
                                return w.globals.seriesTotals.reduce(
                                    (a: number, b: number) => {
                                        return `${robotSummary?.development?.connected}/ ${robotSummary?.development?.count} robot(s) connected`
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
            enabled: false,
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
            categories: ['Fav Color'],
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        legend: {
            // show: matchesMobile ? false : true,
            show: false,
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

    const options2: ApexOptions = {
        states: {
            hover: {
                filter: {
                    type: 'none',
                },
            },
        },

        labels: ['On Demand Robots'],
        colors: ['gray'],

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
                            fontSize: '20px',
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: '',
                            fontSize: '42px',
                            color: '#373d3f',
                            formatter: function (w: any) {
                                return w.globals.seriesTotals.reduce(
                                    (a: number, b: number) => {
                                        return `${Number(
                                            robotSummary?.on_demand?.connected
                                        )}/ ${
                                            robotSummary?.on_demand?.count
                                        } robot(s) connected`
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
            enabled: false,
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
            categories: ['Fav Color'],
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        legend: {
            // show: matchesMobile ? false : true,
            show: false,
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

    const options3: ApexOptions = {
        states: {
            hover: {
                filter: {
                    type: 'none',
                },
            },
        },

        labels: ['Production Robots'],
        colors: ['gray'],

        chart: {
            offsetX: matchesMobile ? -20 : -90,
            offsetY: matchesMobile ? 10 : -50,
            stacked: true,
            stackType: '100%',
            toolbar: {
                show: false,
            },
            // events: {
            //     animationEnd: function (ctx: any) {
            //         ctx.toggleDataPointSelection(2)
            //     },
            // },
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
                            fontSize: '20px',
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: '',
                            fontSize: '22px',
                            color: '#373d3f',
                            formatter: function (w: any) {
                                return w.globals.seriesTotals.reduce(
                                    (a: number, b: number) => {
                                        return `${robotSummary?.production?.connected}/ ${robotSummary?.production?.count} \n\n robot(s) connected`
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
            enabled: false,
            style: {
                fontSize: '34px',
            },
            formatter: function (val: number, opts: any) {
                return ``
            },
            dropShadow: {
                enabled: true,
            },
        },
        stroke: {
            width: 0,
        },
        xaxis: {
            categories: ['Fav Color'],
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        legend: {
            // show: matchesMobile ? false : true,
            show: false,
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

    return (
        <CardRoot>
            <Grid lg={2} md={2} sm={2} xs={6}>
                <CardColumn>
                    <img src="/bxs_bot.png" />
                    <Box>Robots</Box>
                </CardColumn>
            </Grid>
            {/* <Grid>
                <Paper>
                    <Chart data={chartData}>
                        <PieSeries
                            valueField="val"
                            argumentField="region"
                            innerRadius={0.6}
                        />
                        <ArgumentAxis />
                        <ValueAxis />
                        <Title text="The Population of Continents and Regions" />
                        <Animation />
                    </Chart>
                </Paper>
            </Grid> */}
            <Grid container spacing={1} style={{ border: '' }}>
                {/* <Divider orientation="vertical" flexItem /> */}
                <Grid
                    style={{
                        height: '400px',
                        width: '100%',
                        paddingLeft: '4rem',
                        borderRight: '1px solid #ccc' 
                    }}
                    lg={3.9}
                    md={4}
                    sm={4}
                    xs={4}
                >
                    {robotSummary && (
                        <Chart
                            series={[31, 0, 0]}
                            height="100%"
                            width="400"
                            options={options}
                            type="donut"
                        />
                    )}

                    <div
                        style={{
                          
                            paddingLeft: '3rem',
                            marginTop: '-100px',
                            alignText: 'center',
                        }}
                    >
                        Development Robots
                    </div>
                </Grid>

                <Divider orientation="vertical" flexItem />

                <Grid
                    style={{
                        height: '400px',
                        width: '100%',
                        paddingLeft: '4rem',
                        borderRight: '1px solid #ccc' 
                    }}
                    lg={3.9}
                    md={4}
                    sm={4}
                    xs={4}
                >
                    {robotSummary && (
                        <Chart
                            series={[31, 0, 0]}
                            height="100%"
                            width="400"
                            options={options2}
                            type="donut"
                        />
                    )}

                    <div style={{ paddingLeft: '3rem', marginTop: '-100px' }}>
                        On Demand Robots
                    </div>
                </Grid>

                <Grid
                    style={{
                        height: '400px',
                        width: '100%',
                      
                        paddingLeft: '4rem',
                    }}
                    lg={3.9}
                    md={4}
                    sm={4}
                    xs={4}
                >
                    <>
                        {robotSummary && (
                            <Chart
                                series={[31, 0, 0]}
                                height="100%"
                                width="400"
                                options={options3}
                                type="donut"
                            />
                        )}
                         <Divider orientation="vertical" flexItem />
                    </>

                    <div style={{ paddingLeft: '3rem', marginTop: '-100px' }}>
                        Production Robots
                    </div>
                </Grid>
            </Grid>
        </CardRoot>
    )
}
