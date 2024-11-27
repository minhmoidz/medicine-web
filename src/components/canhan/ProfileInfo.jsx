import React from 'react';
import './ProfileInfo.scss'; // Bạn có thể dùng SCSS

const ProfileInfo = () => {
  return (
    <div className="profile-info">
      <div className="avatar">
        <img
          src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt="User Avatar"
          className="avatar-img"
        />
      </div>
      <div className="user-details">
        <h2>Kim-Jong-un</h2>
        <p>Doctor</p>
        <p><strong>Năm sinh:</strong> 1999</p>
        <p><strong>Mã CCCD: </strong>0352672843</p>
        <p><strong>Quê quán:</strong>Huyện Bình Lục,Tỉnh Hà Nam</p>
        <p><strong>Mã số thuế:</strong>9795205</p>
        <p><strong>Mã bảo hiểm y tế:</strong> 0864952</p>
        <p><strong>Mã nhân viện:</strong> UK183</p>
        <p><strong>Email:</strong> kimjongun@eptit.com</p>
        <p><strong>Trình độ:</strong>Tiến sĩ tâm lý học</p>
        <p><strong>Tốt nghiệp:</strong> Học Viện Bưu chính Viễn thông</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
