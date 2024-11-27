import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie, Line } from "react-chartjs-2";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Them from "../tableUser/Them.jsx"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import "./kho.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const DrugDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [medicineList, setMedicineList] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const itemsPerPage = 3; // Số thuốc mỗi trang
  const currentDate = new Date();
  const twoWeeksDate = new Date();
  twoWeeksDate.setDate(currentDate.getDate() + 14);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/medicines");
        setMedicineList(response.data);
      } catch (error) {
        toast.error("Không thể tải danh sách thuốc!", { autoClose: 3000 });
        console.error("Error fetching medicines:", error);
      }
    };
    fetchMedicines();
  }, []);

  const expiredMedicines = medicineList.filter(
    (m) => new Date(m.expDate) < currentDate
  );
  const nearlyExpiredMedicines = medicineList.filter(
    (m) =>
      new Date(m.expDate) >= currentDate && new Date(m.expDate) <= twoWeeksDate
  );
  const availableMedicines = medicineList.filter(
    (m) => new Date(m.expDate) > twoWeeksDate
  );

  const filteredMedicines =
    filter === "expired"
      ? expiredMedicines
      : filter === "nearlyExpired"
      ? nearlyExpiredMedicines
      : filter === "available"
      ? availableMedicines
      : medicineList;

  const paginatedMedicines = filteredMedicines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) =>
      direction === "next"
        ? Math.min(prevPage + 1, Math.ceil(filteredMedicines.length / itemsPerPage))
        : Math.max(prevPage - 1, 1)
    );
  };
  const handleDelete = (medicineId) => {
    setData(data.filter((item) => item.medicineId !== medicineId));
    setFilteredData(filteredData.filter((item) => item.medicineId !== medicineId));
    toast.success("Đã xóa thuốc thành công!");
  };
  const handleUpdate = (updatedMedicine) => {
    // Cập nhật thông tin thuốc trong danh sách
    setData((prevData) =>
      prevData.map((item) =>
        item.medicineId === updatedMedicine.medicineId
          ? { ...item, ...updatedMedicine } // Cập nhật thông tin thuốc
          : item
      )
    );
  
    setFilteredData((prevFilteredData) =>
      prevFilteredData.map((item) =>
        item.medicineId === updatedMedicine.medicineId
          ? { ...item, ...updatedMedicine } // Cập nhật thông tin thuốc trong filteredData
          : item
      )
    );
  
    // Thông báo thành công
    toast.success("Thông tin thuốc đã được cập nhật!");
  };
  
  const pieChartData = {
    labels: ["Hết hạn", "Sắp hết hạn", "Còn hạn"],
    datasets: [
      {
        data: [
          expiredMedicines.length,
          nearlyExpiredMedicines.length,
          availableMedicines.length,
        ],
        backgroundColor: ["#FF6384", "#FFCE56", "#36A2EB"],
      },
    ],
  };
  

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { font: { size: 18 } },
      },
      title: { display: true, text: "Tình trạng thuốc", font: { size: 24 } },
    },
  };

  const lineChartData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
    datasets: [
      {
        label: "Lợi nhuận (VNĐ)",
        data: [5000000, 4500000, 4000000, -2000000, 3500000],
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { font: { size: 18 } } },
      title: { display: true, text: "Đánh giá lãi/lỗ", font: { size: 24 } },
    },
  };

  const handleProcessMedicine = async (medicine) => {
    try {
      await axios.post("http://localhost:8080/api/process-medicine", medicine);
      toast.success("Thuốc đã được duyệt thành công!", { autoClose: 3000 });
      setMedicineList((prev) =>
        prev.filter((item) => item.medicineId !== medicine.medicineId)
      );
      setShowPopup(false);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xử lý thuốc!", { autoClose: 3000 });
      console.error("Error processing medicine:", error);
    }
  };

  return (
    <div className="drugDashboard">
      {/* Toast Notification Container */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="colored" 
      />

      {/* Biểu đồ */}
      <div className="topSection">
        <div className="chartContainer">
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
        <div className="chartContainer">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>

      {/* Bộ lọc */}
      <div className="filterButtons">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          Tất cả
        </button>
        <button
          className={filter === "expired" ? "active" : ""}
          onClick={() => setFilter("expired")}
        >
          Hết hạn
        </button>
        <button
          className={filter === "nearlyExpired" ? "active" : ""}
          onClick={() => setFilter("nearlyExpired")}
        >
          Sắp hết hạn
        </button>
        <button
          className={filter === "available" ? "active" : ""}
          onClick={() => setFilter("available")}
        >
          Còn hạn
        </button>
      </div>

      {/* Bảng thuốc */}
      <div className="tableSection">
        <table className="styledTable">
          <thead>
            <tr>
              <th>Tên thuốc</th>
              <th>Loại thuốc</th>
              <th>Hạn sử dụng</th>
              <th>Trạng thái</th>
              <th>Thông tin</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMedicines.map((medicine) => (
              <tr key={medicine.medicineId}>
                <td>{medicine.medicineName}</td>
                <td>{medicine.medicineType}</td>
                <td>{medicine.expDate}</td>
                <td>
                  {new Date(medicine.expDate) < currentDate
                    ? "Hết hạn"
                    : new Date(medicine.expDate) <= twoWeeksDate
                    ? "Sắp hết hạn"
                    : "Còn hạn"}
                </td>
                <td>
                    <button
                      className="viewButton"
                      onClick={() => setSelectedPatient(medicine)}
                    >
                      Chi tiết
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Them
        patient={selectedPatient }
        onClose={() => setSelectedPatient(null)}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
      </div>

      {/* Phân trang */}
      <div className="pagination">
        <button onClick={() => handlePageChange("prev")}>Trước</button>
        <span>Trang {currentPage}</span>
        <button onClick={() => handlePageChange("next")}>Sau</button>
      </div>
    </div>
  );
};

export default DrugDashboard;
