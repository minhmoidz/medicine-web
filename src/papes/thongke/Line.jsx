import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Data for the line chart
export const data = {
  labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
  datasets: [
    {
      label: 'Doanh Thu',
      data: [1200, 2100, 800, 1600, 700, 1700],
      backgroundColor: '#FC0000FF',
      borderColor: '#2EF35FFF',
      tension: 0.4, // Optional: Adds curve to the line
      fill: true, // Optional: Enables the filling of the line area
    },
    {
        label: 'Số Lượng Thuốc Bán Ra',
        data: [500, 700, 1500, 1000, 900, 1900],
        backgroundColor: '#FF0404FF',
        borderColor: '#2E59F3FF',
        tension: 0.4, // Optional: Adds curve to the line
        fill: true, // Optional: Enables the filling of the line area
    },
    {
        label: 'Số Lượng Thuốc Nhập Vào',
        data: [1000, 3100, 850, 1200, 600, 2100],
        backgroundColor: '#FF0101FF',
        borderColor: '#D2EA17FF',
        tension: 0.4, // Optional: Adds curve to the line
        fill: true, // Optional: Enables the filling of the line area
    },
  ],
};

// Options for the chart
export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Doanh Thu Qua Các Tháng',
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
      },
    },
    y: {
      title: {
        display: true,
      },
      beginAtZero: true, // Optional: Start the Y-axis from 0
    },
  },
};

// LineGraph Component to render the chart
export const LineGraph = () => {
  return <Line data={data} options={options} className="graph" />;
};
