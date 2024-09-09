import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartOptions, ChartData } from 'chart.js';
import 'chart.js/auto';

// Define the shape of each data item
interface SalesDataItem {
    week: number; // Number representing the week
    bottlesSold: number; // Number of bottles sold
}

// Define the props for the component
interface WeeklySalesChartProps {
    data: SalesDataItem[]; // Array of SalesDataItem objects
}

const WeeklySalesChart: React.FC<WeeklySalesChartProps> = ({ data }) => {
    // Type the chart options
    const options: ChartOptions<'line'> = {
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

    // Type the chart data
    const chartData: ChartData<'line'> = {
        labels: data.map(item => `Week ${item.week}`), // Map weeks to labels
        datasets: [
            {
                label: 'Bottles Sold',
                data: data.map(item => item.bottlesSold), // Map bottlesSold to dataset
                borderColor: '#8884d8',
                backgroundColor: '#8884d8',
                tension: 0.4, // Adds some curve to the line
                fill: false,
                pointRadius: 8, // Sets the point size
                pointHoverRadius: 8 // Sets the point size on hover
            }
        ]
    };

    return <Line options={options} data={chartData} />;
};

export default WeeklySalesChart;
