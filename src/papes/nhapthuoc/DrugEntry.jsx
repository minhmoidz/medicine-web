import "./drugEntry.scss";
import Sidebar from "../../components/siderbar/Siderbar.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import React, { useState } from "react";

const DrugEntry = () => {
  const [drugData, setDrugData] = useState({
    name: "",
    quantity: "",
    supplier: "",
    entryDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDrugData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý ghi nhận giao dịch nhập thuốc và cập nhật tồn kho
    console.log("Drug Entry Data:", drugData);

    // Reset form sau khi ghi nhận
    setDrugData({
      name: "",
      quantity: "",
      supplier: "",
      entryDate: "",
    });
  };

  return (
    <div className="drugEntry">
      <Sidebar />
      <div className="drugEntryContainer">
        <Navbar />
        <div className="content">
          <h1 className="title">Nhập Thuốc</h1>
          <form onSubmit={handleSubmit} className="entryForm">
            <div className="formItem">
              <label>Tên thuốc</label>
              <input
                type="text"
                name="name"
                value={drugData.name}
                onChange={handleChange}
                placeholder="Nhập tên thuốc"
                required
              />
            </div>
            <div className="formItem">
              <label>Số lượng</label>
              <input
                type="number"
                name="quantity"
                value={drugData.quantity}
                onChange={handleChange}
                placeholder="Nhập số lượng"
                required
              />
            </div>
            <div className="formItem">
              <label>Nhà cung cấp</label>
              <input
                type="text"
                name="supplier"
                value={drugData.supplier}
                onChange={handleChange}
                placeholder="Nhập tên nhà cung cấp"
                required
              />
            </div>
            <div className="formItem">
              <label>Ngày nhập</label>
              <input
                type="date"
                name="entryDate"
                value={drugData.entryDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="formItem">
              <label>Hạn sử dụng </label>
              <input
                type="date"
                name="entryDate"
                value={drugData.entryDate}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submitButton">
              Ghi nhận giao dịch
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DrugEntry;
