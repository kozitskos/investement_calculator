import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const InvestableCashChart = ({ data }) => {
    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Investable Cash ($)'
                }
            },
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Weeks'
                }
            }
        },
        plugins: {
            legend: {
                display: true
            },
            tooltip: {
                enabled: true
            }
        }
    };

    const chartData = {
        labels: data.weeks,
        datasets: [
            {
                label: 'Investable Cash',
                data: data.investableCash,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                yAxisID: 'y'
            }
        ]
    };

    return <Line options={options} data={chartData} />;
};

export default InvestableCashChart;
