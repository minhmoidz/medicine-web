import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './AchievementsTable.scss'; // Tạo CSS hoặc SCSS

ChartJS.register(RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AchievementsTable = () => {
  const achievements = [
    { id: 1, title: 'Bác sĩ trẻ', year: 2022, organization: 'Doctor Awards' },
    { id: 2, title: 'Chuyên gia tâm lý học', year: 2021, organization: 'Oscar Summit' },
    { id: 3, title: 'Bác sĩ được yêu thích nhất', year: 2020, organization: 'Love Award' },
  ];

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
        max: 10, // Tối đa giá trị trục radar
      },
    },
  };

  return (
    <div className="achievements-container">
      <div className="achievements-table">
        <h3>Thành tự nổi bật</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Year</th>
              <th>Organization</th>
            </tr>
          </thead>
          <tbody>
            {achievements.map((achieve) => (
              <tr key={achieve.id}>
                <td>{achieve.id}</td>
                <td>{achieve.title}</td>
                <td>{achieve.year}</td>
                <td>{achieve.organization}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Biểu đồ tần suất */}
      <div className="chart-area">
        <h3><strong>Biểu đồ tần suất làm việc</strong></h3>
        <Radar data={data} options={options} />
      </div>
    </div>
  );
};

export default AchievementsTable;
