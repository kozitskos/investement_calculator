import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const WeeklySalesChart = ({ data }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true
            },
            tooltip: {
                enabled: true
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Week'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Bottles Sold'
                }
            }
        }
    };

    const chartData = {
        labels: data.map(item => `Week ${item.week}`),
        datasets: [
            {
                label: 'Bottles Sold',
                data: data.map(item => item.bottlesSold),
                borderColor: '#8884d8',
                backgroundColor: '#8884d8',
                tension: 0.4, // This adds some curve
                fill: false,
                pointRadius: 8, // Similar to activeDot
                pointHoverRadius: 8
            }
        ]
    };

    return <Line options={options} data={chartData} />;
};

export default WeeklySalesChart;
