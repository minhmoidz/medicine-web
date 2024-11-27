import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { toast, ToastContainer } from 'react-toastify'; 
import "react-toastify/dist/ReactToastify.css"; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "./drugDashboard.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DrugDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    medicineName: "",
    medicineType: "",
    supplierName: "",
    supplierPhone: "",
    quantityContribution: "",
  });
  const [selectedMedicine, setSelectedMedicine] = useState(null); 
  const [medicineList, setMedicineList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);  // Trạng thái cho phân trang
  const [medicinesPerPage] = useState(10);  // Số lượng thuốc trên mỗi trang
  const [searchQuery, setSearchQuery] = useState(""); // Trạng thái lưu trữ từ khóa tìm kiếm

  // Lấy danh sách thuốc đã nhập từ API
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/contributions");
        if (Array.isArray(response.data)) {
          setMedicineList(response.data);
        } else {
          throw new Error("Dữ liệu không hợp lệ");
        }
      } catch (error) {
        console.error("Error fetching medicines:", error);
        toast.error("Lỗi khi tải danh sách thuốc.");
      }
    };
    fetchMedicines();
  }, []);
  // Hàm xóa thuốc
  const handleDelete = async (contributionId) => {
    try {
      await axios.delete(`http://localhost:8080/api/contributions/${contributionId}`);
      setMedicineList((prev) => prev.filter(medicine => medicine.contributionId !== contributionId));
      toast.success("Xóa thuốc thành công!");
      setSelectedMedicine(null);  // Đóng modal sau khi xóa
    } catch (error) {
      console.error("Error deleting medicine:", error);
      toast.error("Lỗi khi xóa thuốc.");
    }
  };

  

  // Cập nhật form nhập thuốc
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  // Gửi dữ liệu thuốc mới qua API POST
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/contributions", formData);
      console.log("Data posted successfully:", response.data);
      setMedicineList((prev) => [...prev, response.data]); 
      setFormData({
        medicineName: "",
        medicineType: "",
        supplierName: "",
        supplierPhone: "",
        quantityContribution: "",
      });
      setShowForm(false);
      toast.success("Lưu thuốc thành công!"); 
    } catch (error) {
      console.error("Error posting data:", error);
      toast.error("Lỗi khi lưu thuốc.");
    }
  };
  

  // Xử lý phân trang
  const indexOfLastMedicine = currentPage * medicinesPerPage;
  const indexOfFirstMedicine = indexOfLastMedicine - medicinesPerPage;
  const filteredMedicines = (medicineList || []).filter(medicine =>
    (medicine.medicineName && medicine.medicineName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (medicine.contributionId && medicine.contributionId.toString().includes(searchQuery))
  );
  
  const currentMedicines = filteredMedicines.slice(indexOfFirstMedicine, indexOfLastMedicine);

  const totalPages = Math.ceil(filteredMedicines.length / medicinesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  

  // Dữ liệu biểu đồ cột
  const barChartData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
    datasets: [
      {
        label: "Số thuốc nhập (đơn vị: hộp)",
        data: [150, 200, 180, 220, 170],
        backgroundColor: "#007bff",
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 20, 
          },
          color: "#333",
        },
      },
      title: {
        display: true,
        text: "Số lượng thuốc nhập theo tháng",
        font: {
          size: 25, 
        },
        color: "#000",
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 24,
          },
          color: "#333",
        },
      },
      y: {
        ticks: {
          font: {
            size: 24,
          },
          color: "#333",
        },
      },
    },
  };

  // Dữ liệu biểu đồ tròn
  const pieChartData = {
    labels: ["Giảm đau", "Kháng sinh", "Vitamin", "Thuốc bổ"],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545"],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 24, 
          },
          color: "#333",
        },
      },
      title: {
        display: true,
        text: "Phân loại thuốc nhập theo loại",
        font: {
          size: 26, 
        },
        color: "#000",
      },
    },
  };

  return (
    <div className="drugDashboard">
      {/* Biểu đồ và Thống kê */}
      <div className="topSection">
        <div className="chartContainer">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
        <div className="chartContainer">
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>

      {/* Tìm kiếm thuốc */}
      <div className="searchSection">
        <input 
          type="text" 
          placeholder="Tìm kiếm theo ID hoặc tên thuốc"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <button className="addButton" onClick={() => setShowForm(true)}>
          Nhập thuốc
        </button>

      {/* Bảng thuốc */}
      <div className="tableSection">
        <h3>Danh sách thuốc đã nhập</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên thuốc</th>
              <th>Loại thuốc</th>
              <th>Nhà cung cấp</th>
              <th>Số lượng</th>
              <th>Ngày nhập</th>
              <th>Thông tin</th>
            </tr>
          </thead>
          <tbody>
            {currentMedicines.map((medicine) => (
              <tr key={medicine.contributionId}>
                <td>{medicine.contributionId}</td>
                <td>{medicine.medicineName}</td>
                <td>{medicine.medicineType}</td>
                <td>{medicine.supplierName}</td>
                <td>{medicine.quantityContribution}</td>
                <td>{medicine.entryDate || "Chưa rõ"}</td>
                <td>
                  <button onClick={() => setSelectedMedicine(medicine)}>
                    Thông tin chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Phân trang */}
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Trang trước
          </button>
          <span className="page-info">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Trang sau
          </button>
        </div>
      </div>

      {/* Form nhập thuốc */}
      {showForm && (
  <div className="formOverlay">
    <form className="drugForm" onSubmit={handleSubmit}>
      <h3>Nhập thuốc</h3>
      
      <label>
        Tên thuốc:
        <input
          type="text"
          name="medicineName"
          value={formData.medicineName}
          onChange={handleFormChange}
          required
          pattern="^[a-zA-Z\s]+$" // Chỉ cho phép chữ và khoảng trắng
          title="Tên thuốc chỉ được chứa chữ cái và khoảng trắng"
        />
      </label>
      
      <label>
        Loại thuốc:
        <input
          type="text"
          name="medicineType"
          value={formData.medicineType}
          onChange={handleFormChange}
          required
        />
      </label>
      
      <label>
        Nhà cung cấp:
        <input
          type="text"
          name="supplierName"
          value={formData.supplierName}
          onChange={handleFormChange}
          required
        />
      </label>
      
      <label>
        Số điện thoại:
        <input
          type="text"
          name="supplierPhone"
          value={formData.supplierPhone}
          onChange={handleFormChange}
          required
          pattern="^\d{10,11}$" // Định dạng số điện thoại, chỉ cho phép 10 hoặc 11 chữ số
          title="Số điện thoại phải có 10 hoặc 11 chữ số"
        />
      </label>
      
      <label>
        Số lượng thuốc:
        <input
          type="number"
          name="quantityContribution"
          value={formData.quantityContribution}
          onChange={handleFormChange}
          required
          min="1" // Đảm bảo số lượng lớn hơn hoặc bằng 1
          max="10000" // Giới hạn số lượng tối đa là 10,000
        />
      </label>
      
      <button type="submit">Nhập</button>
      <button type="button" onClick={() => setShowForm(false)}>
        Hủy
      </button>
    </form>
  </div>
)}

             
      {/* Modal hiển thị thông tin chi tiết */}
      {selectedMedicine && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h3>Thông tin chi tiết về thuốc</h3>
            <p><strong>Tên thuốc:</strong> {selectedMedicine.medicineName}</p>
            <p><strong>Loại thuốc:</strong> {selectedMedicine.medicineType}</p>
            <p><strong>Nhà cung cấp:</strong> {selectedMedicine.supplierName}</p>
            <p><strong>Số điện thoại:</strong> {selectedMedicine.supplierPhone}</p>
            <p><strong>Số lượng:</strong> {selectedMedicine.quantityContribution}</p>
            <p><strong>Ngày nhập:</strong> {selectedMedicine.entryDate || "Chưa rõ"}</p>
            <p><strong>Ghi chú:</strong> {selectedMedicine.notes || "Không có ghi chú"}</p>
            <button onClick={() => setSelectedMedicine(null)}>Đóng</button>
            <button onClick={() => handleDelete(selectedMedicine.contributionId)}>Xóa</button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default DrugDashboard;
