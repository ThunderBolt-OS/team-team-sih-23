import { Box, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { GET } from '../../api/fetch';

type Props = {};

const RealTimeBandobasScore = ({ }: Props) => {
    const [score, setScore] = useState(84);

    useEffect(() => {
        const bandobastId = localStorage.getItem('bandobastId');

        GET(`algo/bandobast/${bandobastId}`).then(res => {
            console.log("algo/bandobast/", res)
            setScore(parseInt(res.score));
        });
    }, []);

    // // wrap it in useEffect so it only runs once
    // React.useEffect(() => {
    //     // update score every 3 seconds
    //     const intervalId = setInterval(() => {
    //         // updates should be between 80 and 100
    //         setScore(Math.floor(Math.random() * (100 - 80 + 1) + 80));
    //     }, 3000);

    //     // cleanup function
    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // }, []);

    const data = {
        series: [score]
    };

    return (

        <Paper
            style={{
                background: "transparent",
                padding: "16px",
                borderRadius: "8px",
            }}
        >
            <Typography variant='h4' textAlign={'center'} sx={{ mb: 2 }}>
                Real Time Bandobas Security Score
            </Typography>
            <Box
                sx={{
                    height: "150px !important",
                }}
            >
                <ReactApexChart
                    options={{
                        colors: ["#7e57c2"],
                        chart: {
                            animations: {
                                enabled: false,
                            },
                        },
                        plotOptions: {
                            radialBar: {
                                startAngle: -135,
                                endAngle: 135,
                                dataLabels: {
                                    name: {
                                        fontSize: "0px",
                                        offsetY: 120,
                                    },
                                    value: {
                                        offsetY: 4,
                                        fontSize: "35px",
                                        fontWeight: "bold",
                                        color: "#9575cd",
                                    },
                                },
                            },
                        },
                        fill: {
                            type: "gradient",
                            gradient: {
                                shade: "red",
                                shadeIntensity: 0.15,
                                inverseColors: false,
                                opacityFrom: 1,
                                opacityTo: 1,
                                stops: [0, 50, 65, 91],
                            },
                        },
                        stroke: {
                            dashArray: 2,
                        },
                        labels: [""],
                    }}
                    series={data.series}
                    type="radialBar"
                    height={200}
                // background="#000 !important"
                // style={{ background: "#000 !important" }}
                />
            </Box>
        </Paper>
    )
}

export default RealTimeBandobasScore;