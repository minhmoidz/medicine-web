import React, { useState } from 'react';
import Sidebar from "../../components/siderbar/Siderbar.jsx";
import Navbar from "../../components/navbar/Navbar.jsx"; // Đường dẫn tới file Sidebar
import './drugExport.scss';

const DrugExport = () => {
  const [drugs, setDrugs] = useState([]);
  const [newDrug, setNewDrug] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Thêm thuốc vào danh sách
  const handleAddDrug = () => {
    if (newDrug) {
      setDrugs([...drugs, { name: newDrug, quantity: 1 }]);
      setNewDrug('');
    }
  };

  // Xóa thuốc khỏi danh sách
  const handleDeleteDrug = (index) => {
    const updatedDrugs = drugs.filter((_, i) => i !== index);
    setDrugs(updatedDrugs);
  };

  // Cập nhật số lượng thuốc
  const handleQuantityChange = (index, quantity) => {
    const updatedDrugs = drugs.map((drug, i) =>
      i === index ? { ...drug, quantity } : drug
    );
    setDrugs(updatedDrugs);
  };

  // Lọc thuốc theo từ khóa tìm kiếm
  const filteredDrugs = drugs.filter((drug) =>
    drug.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="drug-export-container">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="main-section">
          <h2>Xuất Thuốc & Hóa Đơn</h2>
          <div className="controls">
            <input
              type="text"
              placeholder="Thêm thuốc mới"
              value={newDrug}
              onChange={(e) => setNewDrug(e.target.value)}
            />
            <button onClick={handleAddDrug}>Thêm Thuốc</button>
            <input
              type="text"
              placeholder="Tìm kiếm thuốc"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="drug-list">
            {filteredDrugs.map((drug, index) => (
              <div key={index} className="drug-item">
                <span>{drug.name}</span>
                <input
                  type="number"
                  value={drug.quantity}
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                />
                <button onClick={() => handleDeleteDrug(index)}>Xóa</button>
              </div>
            ))}
          </div>
          <button className="print-button">In Hóa Đơn</button>
        </div>
      </div>
    </div>
  );
};

export default DrugExport;
