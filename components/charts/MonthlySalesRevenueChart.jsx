import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const MonthlySalesRevenueChart = ({ data }) => {
    const options = {
        responsive: true,
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            },
        },
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
    };

    const chartData = {
        labels: data.months,
        datasets: [
            {
                label: 'Total Bottles Sold',
                data: data.monthlySales,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                yAxisID: 'y',
                type: 'bar',
            },
            {
                label: 'Total Revenue',
                data: data.monthlyRevenues,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y1',
                type: 'line',
            }
        ],
    };

    return <Bar options={options} data={chartData} />;
};

export default MonthlySalesRevenueChart;
