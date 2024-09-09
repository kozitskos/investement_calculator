// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { ChartOptions, ChartData } from 'chart.js';
// import 'chart.js/auto';

// // Define the shape of the data prop
// interface MonthlySalesRevenueData {
//     months: string[]; // Array of month labels
//     monthlySales: number[]; // Array of monthly sales (bottles sold)
//     monthlyRevenues: number[]; // Array of monthly revenues
// }

// // Define the props for the component
// interface MonthlySalesRevenueChartProps {
//     data: MonthlySalesRevenueData;
// }

// const MonthlySalesRevenueChart: React.FC<MonthlySalesRevenueChartProps> = ({ data }) => {
//     // Type the chart options
//     const options: ChartOptions<'bar'> = {
//         responsive: true,
//         scales: {
//             y: {
//                 type: 'linear',
//                 display: true,
//                 position: 'left',
//             },
//             y1: {
//                 type: 'linear',
//                 display: true,
//                 position: 'right',
//                 grid: {
//                     drawOnChartArea: false, // only want the grid lines for one axis to show up
//                 },
//             },
//         },
//         plugins: {
//             tooltip: {
//                 mode: 'index',
//                 intersect: false,
//             },
//         },
//     };

//     // Type the chart data
//     const chartData: ChartData<'bar'> = {
//         labels: data.months,
//         datasets: [
//             {
//                 label: 'Total Bottles Sold',
//                 data: data.monthlySales,
//                 borderColor: 'rgb(54, 162, 235)',
//                 backgroundColor: 'rgba(54, 162, 235, 0.5)',
//                 yAxisID: 'y',
//                 type: 'bar', // specifies that this dataset will be rendered as a bar
//             },
//             {
//                 label: 'Total Revenue',
//                 data: data.monthlyRevenues,
//                 borderColor: 'rgb(255, 99, 132)',
//                 backgroundColor: 'rgba(255, 99, 132, 0.5)',
//                 yAxisID: 'y1',
//                 type: 'line', // specifies that this dataset will be rendered as a line
//             },
//         ],
//     };

//     return <Bar options={options} data={chartData} />;
// };

// export default MonthlySalesRevenueChart;

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartOptions, ChartData } from 'chart.js';
import 'chart.js/auto';

// Define the shape of the data prop
interface MonthlySalesRevenueData {
    months: string[]; // Array of month labels
    monthlySales: number[]; // Array of monthly sales (bottles sold)
    monthlyRevenues: number[]; // Array of monthly revenues
}

// Define the props for the component
interface MonthlySalesRevenueChartProps {
    data: MonthlySalesRevenueData;
}

const MonthlySalesRevenueChart: React.FC<MonthlySalesRevenueChartProps> = ({ data }) => {
    // Type the chart options
    const options: ChartOptions<'bar' | 'line'> = {
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

    // Type the chart data
    const chartData: ChartData<'bar' | 'line'> = {
        labels: data.months,
        datasets: [
            {
                label: 'Total Bottles Sold',
                data: data.monthlySales,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                yAxisID: 'y',
                type: 'bar', // specifies that this dataset will be rendered as a bar
            },
            {
                label: 'Total Revenue',
                data: data.monthlyRevenues,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y1',
                type: 'line', // specifies that this dataset will be rendered as a line
            },
        ],
    };

    return <Bar options={options} data={chartData} />;
};

export default MonthlySalesRevenueChart;

