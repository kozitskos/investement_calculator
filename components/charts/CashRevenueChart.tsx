import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartOptions, ChartData } from 'chart.js';
import 'chart.js/auto';

// Define the shape of the data prop
interface ChartDataProps {
    months: string[]; // Array of months as strings
    cashOnHand: number[]; // Array of cash on hand values as numbers
    netRevenue: number[]; // Array of net revenue values as numbers
}

// Define the props for the component
interface CashRevenueChartProps {
    data: ChartDataProps;
}

const CashRevenueChart: React.FC<CashRevenueChartProps> = ({ data }) => {
    // Type the chart options
    const options: ChartOptions<'line'> = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            y: { // Defining the y-axis for Cash on Hand and Net Revenue
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Cash on Hand / Net Revenue ($)'
                }
            },
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Months'
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

    // Type the chart data
    const chartData: ChartData<'line'> = {
        labels: data.months, // Assuming data.months is an array of month labels
        datasets: [
            {
                label: 'Cash on Hand',
                data: data.cashOnHand,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                yAxisID: 'y'
            },
            {
                label: 'Net Revenue',
                data: data.netRevenue,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y'
            }
        ]
    };

    return <Line options={options} data={chartData} />;
};

export default CashRevenueChart;
