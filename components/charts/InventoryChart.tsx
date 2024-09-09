import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartOptions, ChartData } from 'chart.js';
import 'chart.js/auto';

// Define the shape of the data prop
interface InventoryData {
    weeks: string[]; // Array of week labels (could be string or number depending on use case)
    inventoryLevels: number[]; // Array of inventory level values
}

// Define the props for the component
interface InventoryChartProps {
    data: InventoryData;
}

const InventoryChart: React.FC<InventoryChartProps> = ({ data }) => {
    // Type the chart options
    const options: ChartOptions<'line'> = {
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

    // Type the chart data
    const chartData: ChartData<'line'> = {
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
