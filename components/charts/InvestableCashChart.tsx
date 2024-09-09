import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartOptions, ChartData } from 'chart.js';
import 'chart.js/auto';

// Define the shape of the data prop
interface InvestableCashData {
    weeks: string[]; // Array of week labels as strings
    investableCash: number[]; // Array of investable cash values as numbers
}

// Define the props for the component
interface InvestableCashChartProps {
    data: InvestableCashData;
}

const InvestableCashChart: React.FC<InvestableCashChartProps> = ({ data }) => {
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

    // Type the chart data
    const chartData: ChartData<'line'> = {
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
