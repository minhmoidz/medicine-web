import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WorkFrequencyChart = () => {
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Work Hours',
        data: [8, 6, 7, 5, 9, 4, 3],
        backgroundColor: 'rgba(112, 73, 253, 0.4)',
        borderColor: '#7049fd',
        borderWidth: 2,
        pointBackgroundColor: '#7049fd',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 10, // Bạn có thể điều chỉnh giá trị tối đa cho trục radar
      },
    },
  };

  return (
    <div className="chart-container">
      <h3><strong>Bảng năng suất làm việc</strong></h3>
      <Radar data={data} options={options} />
    </div>
  );
};

export default WorkFrequencyChart;
