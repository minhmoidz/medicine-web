
import Sidebar from "../../components/siderbar/Siderbar.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import React, { useState } from "react";

import "./medicineCabinet.scss"

const MedicineCabinet = () => {
  // Mẫu dữ liệu thuốc
  const [medicines, setMedicines] = useState([
    {
      supplier: "Nhà cung cấp A",
      name: "Paracetamol",
      quantity: 100,
      expiryDate: "2025-12-01",
      type: "Thuốc giảm đau",
      entryDate: "2023-10-02",
      image: "public/avatar.jpg", // Đường dẫn đến hình ảnh
    },
    {
      supplier: "Nhà cung cấp B",
      name: "Amoxicillin",
      quantity: 50,
      expiryDate: "2024-06-15",
      type: "Thuốc kháng sinh",
      entryDate: "2023-09-11",
      image: "public/avatar.jpg", // Đường dẫn đến hình ảnh
    },
    
    // Thêm các loại thuốc khác tại đây nếu cần
  ]);

  const [editingMedicine, setEditingMedicine] = useState(null);
  const [viewMedicine, setViewMedicine] = useState(null); // Thêm state cho thuốc đang xem
  const [searchTerm, setSearchTerm] = useState(""); // State cho tìm kiếm

  // Hàm xử lý sửa thuốc
  const handleEdit = (medicine) => {
    setEditingMedicine(medicine);
  };

  // Hàm xử lý xóa thuốc
  const handleDelete = (name) => {
    setMedicines(medicines.filter(medicine => medicine.name !== name));
  };

  // Hàm hiển thị thông tin thuốc
  const handleView = (medicine) => {
    setViewMedicine(medicine); // Lưu thông tin thuốc vào state
  };

  // Hàm đóng thông tin thuốc
  const handleCloseView = () => {
    setViewMedicine(null); // Đặt lại state để ẩn thông tin thuốc
  };

  // Hàm lọc thuốc theo từ khóa tìm kiếm
  const filteredMedicines = medicines.filter(medicine => 
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="medicineCabinet">
      <Sidebar />
      <div className="medicineCabinetContainer">
        <Navbar />
        <div className="content">
          <h1 className="title">Tủ Thuốc</h1>
          {/* Ô tìm kiếm */}
          <input 
            type="text" 
            placeholder="Tìm kiếm thuốc..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="searchInput"
          />
          <div className="medicineList">
            {filteredMedicines.map((medicine, index) => (
              <div className="medicineItem" key={index}>
                <img src={medicine.image} alt={medicine.name} className="medicineImage" /> {/* Hiển thị hình ảnh */}
                <h2 className="medicineName">{medicine.name}</h2>
                <p><strong>Nhà cung cấp:</strong> {medicine.supplier}</p>
                <p><strong>Số lượng:</strong> {medicine.quantity}</p>
                <p><strong>Ngày hết hạn:</strong> {medicine.expiryDate}</p>
                <p><strong>Loại thuốc:</strong> {medicine.type}</p>
                <p><strong>Ngày nhập cảnh:</strong> {medicine.entryDate}</p>
                
                {/* Nút Hiển Thị Thông Tin */}
                <button className="view-button" onClick={() => handleView(medicine)}>Xem</button>
                <button className="edit-button" onClick={() => handleEdit(medicine)}>Sửa</button>
                <button className="delete-button" onClick={() => handleDelete(medicine.name)}>Xóa</button>
              </div>
            ))}
          </div>

          {/* Hiển thị thông tin thuốc trong modal */}
          {viewMedicine && (
            <div className="viewMedicineModal">
              <div className="modalContent">
                <h2 className="modalTitle">{viewMedicine.name}</h2>
                <p><strong>Nhà cung cấp:</strong> {viewMedicine.supplier}</p>
                <p><strong>Số lượng:</strong> {viewMedicine.quantity}</p>
                <p><strong>Ngày hết hạn:</strong> {viewMedicine.expiryDate}</p>
                <p><strong>Loại thuốc:</strong> {viewMedicine.type}</p>
                <p><strong>Ngày nhập cảnh:</strong> {viewMedicine.entryDate}</p>
                <button className="closeButton" onClick={handleCloseView}>Đóng</button>
              </div>
            </div>
          )}

          {/* Phần Sửa Thông Tin (nếu cần) */}
          {editingMedicine && (
            <div className="editingForm">
              <h2>Sửa Thông Tin Thuốc</h2>
              <form>
                {/* Thêm các trường thông tin để sửa */}
                <label>Tên:</label>
                <input type="text" defaultValue={editingMedicine.name} />
                <label>Nhà cung cấp:</label>
                <input type="text" defaultValue={editingMedicine.supplier} />
                <label>Số lượng:</label>
                <input type="number" defaultValue={editingMedicine.quantity} />
                <label>Ngày hết hạn:</label>
                <input type="date" defaultValue={editingMedicine.expiryDate} />
                <label>Loại thuốc:</label>
                <input type="text" defaultValue={editingMedicine.type} />
                <label>Ngày nhập cảnh:</label>
                <input type="date" defaultValue={editingMedicine.entryDate} />
                
                {/* Nút Lưu Thay Đổi */}
                <button type="button" onClick={() => setEditingMedicine(null)}>Lưu Thay Đổi</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineCabinet;
