import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./xuatthuoc2.scss";
import MedicineTable from "./MedicineTable";
import { Line } from "react-chartjs-2";

const InvoiceTable = () => {
  const [latestMedicine, setLatestMedicine] = useState(null); // Đơn xuất gần nhất
  const [selectedMedicine, setSelectedMedicine] = useState(null); // Thông tin chi tiết (bấm nút "Thông tin")

  // Dữ liệu biểu đồ
  const chartData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
    datasets: [
      {
        label: "Số đơn đã xuất",
        data: [10, 20, 15, 25, 30, 35],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div className="app">
      <div className="chart">
        <h2>Biểu đồ số đơn xuất theo tháng</h2>
        <Line data={chartData} />
      </div>
      <div className="main-content">
        <MedicineTable
          setLatestMedicine={setLatestMedicine}
          setSelectedMedicine={setSelectedMedicine}
        />
        <div className="latest-medicine">
        </div>
      </div>

      {/* Hiển thị thông tin chi tiết */}
      {selectedMedicine && (
        <div className="medicine-details">
          <h3>Thông tin chi tiết</h3>
          <p><strong>Bệnh nhân:</strong> {selectedMedicine.patientname}</p>
          <p><strong>SĐT:</strong> {selectedMedicine.patientphone}</p>
          <p><strong>Thuốc:</strong> {selectedMedicine.medicinename}</p>
          <p><strong>Loại:</strong> {selectedMedicine.medicinetype}</p>
          <p><strong>Số lượng:</strong> {selectedMedicine.quanlitydetails}</p>
          <p><strong>Ngày:</strong> {selectedMedicine.dateoftrans}</p>
          <button onClick={() => setSelectedMedicine(null)}>Đóng</button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default InvoiceTable;
