import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const CombinedChart = ({ investableCashData, inventoryData }) => {
    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            yLeft: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Investable Cash ($)'
                },
                grid: {
                    drawOnChartArea: false, // only want the grid lines for this axis to show
                }
            },
            yRight: {
                type: 'linear',
                display: true,
                position: 'right',
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
                display: true
            },
            tooltip: {
                enabled: true
            }
        }
    };

    const chartData = {
        labels: investableCashData.weeks, // Assuming weeks array is the same for both datasets
        datasets: [
            {
                label: 'Investable Cash',
                data: investableCashData.investableCash,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                yAxisID: 'yLeft'
            },
            {
                label: 'Inventory',
                data: inventoryData.inventoryLevels,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'yRight'
            }
        ]
    };

    return <Line options={options} data={chartData} />;
};

export default CombinedChart;
