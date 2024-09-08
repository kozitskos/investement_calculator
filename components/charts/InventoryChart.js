import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const InventoryChart = ({ data }) => {
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
                    text: 'Inventory Level'
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
                display: false
            },
            tooltip: {
                enabled: true
            }
        }
    };

    const chartData = {
        labels: data.weeks, // Assuming data.weeks is an array of week numbers
        datasets: [
            {
                label: 'Inventory',
                data: data.inventoryLevels,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y'
            }
        ]
    };

    return <Line options={options} data={chartData} />;
};

export default InventoryChart;
