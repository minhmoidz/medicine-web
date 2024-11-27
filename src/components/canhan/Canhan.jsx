import React from 'react';
import ProfileInfo from './ProfileInfo.jsx';
import WorkFrequencyChart from './WorkFrequencyChart.jsx';
import AchievementsTable from './AchievementsTable.jsx';
import './name.scss'; // Bạn có thể dùng SCSS

const App = () => {
  return (
    <div className="app-container">
      <div className="layout">
        {/* Phần bên trái: Biểu đồ và bảng */}
        <div className="left-content">
        <AchievementsTable/>
        </div>
    
        {/* Phần bên phải: Thông tin cá nhân */}
        <div className="right-profile">
          <ProfileInfo />
        </div>
      </div>
    </div>
  );
};

export default App;
