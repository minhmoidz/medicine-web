import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import "./PatientForm.scss"; // Import SCSS nếu cần tùy chỉnh CSS

const PatientForm = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    gender: "",
    dateOfBirth: "",
    patientAddress: "",
    patientPhone: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gửi dữ liệu đến API
      const response = await axios.post("http://localhost:8080/api/patients", formData);
      toast.success("Thông tin bệnh nhân đã được lưu thành công!");
      setFormData({
        patientName: "",
        gender: "",
        dateOfBirth: "",
        patientAddress: "",
        patientPhone: "",
      });
    } catch (error) {
      console.error("Error posting data:", error);
      toast.error("Lỗi khi lưu thông tin bệnh nhân.");
    }
  };

  return (
    <div className="patientFormWrapper">
      <form className="patientForm" onSubmit={handleSubmit}>
        <h3>Nhập thông tin bệnh nhân</h3>

        <label>
          Tên bệnh nhân:
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleFormChange}
            required
          />
        </label>

        <label>
          Giới tính:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleFormChange}
            required
          >
            <option value="">Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </label>

        <label>
          Ngày sinh:
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleFormChange}
            required
          />
        </label>

        <label>
          Địa chỉ:
          <input
            type="text"
            name="patientAddress"
            value={formData.patientAddress}
            onChange={handleFormChange}
            required
          />
        </label>

        <label>
          Số điện thoại:
          <input
            type="text"
            name="patientPhone"
            value={formData.patientPhone}
            onChange={handleFormChange}
            required
          />
        </label>

        <button type="submit">Lưu thông tin bệnh nhân</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default PatientForm;
