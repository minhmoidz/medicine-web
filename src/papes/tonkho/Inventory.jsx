import React, { useState } from 'react';
import './inventory.scss'; // Đảm bảo bạn đã tạo file SCSS cho Inventory
import Sidebar from "../../components/siderbar/Siderbar.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";// Đường dẫn đến file Sidebar của bạn

const Inventory = () => {
  const [medicines, setMedicines] = useState([
    // Dữ liệu mẫu về thuốc
    { id: 1, name: 'Paracetamol', quantity: 20, expiryDate: '2025-12-01' },
    { id: 2, name: 'Ibuprofen', quantity: 0, expiryDate: '2024-05-15' },
    { id: 3, name: 'Amoxicillin', quantity: 5, expiryDate: '2023-11-01' },
    { id: 4, name: 'Cough Syrup', quantity: 10, expiryDate: '2026-03-20' },
  ]);

  const generateReport = () => {
    // Hàm xuất báo cáo (có thể sử dụng thư viện như xlsx để xuất ra file Excel)
    console.log('Generating report...');
  };

  const currentDate = new Date().toISOString().split('T')[0];

  const expiredMedicines = medicines.filter(m => m.expiryDate < currentDate);
  const nearlyExpiredMedicines = medicines.filter(m => m.expiryDate >= currentDate && m.quantity < 5);
  const availableMedicines = medicines.filter(m => m.quantity > 0);

  return (
    <div className="inventory">
      <Sidebar />
      <div className="container">
        <Navbar />
        <div className="content">
          <h1>Báo cáo tồn kho thuốc</h1>
          <div className="report">
            <h2>Thuốc có trong kho</h2>
            <ul>
              {availableMedicines.map(m => (
                <li key={m.id}>
                  {m.name} - Số lượng: {m.quantity} - Hạn sử dụng: {m.expiryDate}
                </li>
              ))}
            </ul>
            <h2>Thuốc đã hết hạn</h2>
            <ul>
              {expiredMedicines.map(m => (
                <li key={m.id}>
                  {m.name} - Hạn sử dụng: {m.expiryDate}
                </li>
              ))}
            </ul>
            <h2>Thuốc sắp hết</h2>
            <ul>
              {nearlyExpiredMedicines.map(m => (
                <li key={m.id}>
                  {m.name} - Số lượng: {m.quantity} - Hạn sử dụng: {m.expiryDate}
                </li>
              ))}
            </ul>
            <button onClick={generateReport}>Xuất báo cáo</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
