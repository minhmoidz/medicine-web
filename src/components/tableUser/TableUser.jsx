import "./tableUser.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Them from "./Them.jsx";
import * as XLSX from "xlsx";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend,BarElement } from "chart.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);
import { Line } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TableUser = () => {
  const [medicineList, setMedicineList] = useState([]);
  const [patients, setPatients] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [filters, setFilters] = useState({ medicineId: "", medicineName: "" });
  const [error, setError] = useState(null);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(14);

  // Thống kê tổng quan
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalTypes, setTotalTypes] = useState(0);
  const [maxStock, setMaxStock] = useState(0);
  const [minStock, setMinStock] = useState(0);
  const imageList = [
    "public/avatar.jpg",
    "public/avatar.jpg",
  
  ];
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    medicineName: "",
    medicineType: "",
    supplierName: "",
    supplierPhone: "",
    quantityContribution: "",});

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
      const response = await axios.post("http://localhost:8080/api/medicines", formData);
      console.log("Data posted successfully:", response.data);
      setMedicineList((prev) => [...prev, response.data]); 
      setFormData({
        medicineName: "",
        medicineType: "",
        entryDate: "",
        expDate: "",
        quantity: "",
      });
      setShowForm(false);
      toast.success("Lưu thuốc thành công!"); 
    } catch (error) {
      console.error("Error posting data:", error);
      toast.error("Lỗi khi lưu thuốc.");
    }
  };

  // Gọi API để lấy dữ liệu
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/medicines");
        setData(response.data);
        setFilteredData(response.data);
        // Cập nhật thống kê tổng quan
        const totalQuantity = response.data.reduce((sum, item) => sum + item.quantity, 0);
        const uniqueTypes = new Set(response.data.map((item) => item.medicineName)).size;
        const maxQuantity = Math.max(...response.data.map((item) => item.quantity));
        const minQuantity = Math.min(...response.data.map((item) => item.quantity));

        setTotalProducts(totalQuantity);
        setTotalTypes(uniqueTypes);
        setMaxStock(maxQuantity);
        setMinStock(minQuantity);
      } catch (error) {
        console.error("Chi tiết lỗi:", error);
        setError("Không thể tải dữ liệu từ API. Vui lòng kiểm tra lại.");
        toast.error("Không thể tải dữ liệu từ API.");
      }
    };
    fetchData();
  }, []);

  const handleDelete = (medicineId) => {
    setData(data.filter((item) => item.medicineId !== medicineId));
    setFilteredData(filteredData.filter((item) => item.medicineId !== medicineId));
    toast.success("Đã xóa thuốc thành công!");
  };
  

  const handleFilterChange = (e, field) => {
    const { value } = e.target;
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);

    if (value === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        (item.medicineId &&
          item.medicineId.toString().toLowerCase().includes(value.toLowerCase())) ||
        (item.medicineName &&
          item.medicineName.toLowerCase().includes(value.toLowerCase()))
      );
      setFilteredData(filtered);
    }
  };

  const handleCheckboxChange = (medicineId) => {
    if (selectedPatients.includes(medicineId)) {
      setSelectedPatients(selectedPatients.filter((id) => id !== medicineId));
    } else {
      setSelectedPatients([...selectedPatients, medicineId]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportToExcel = () => {
    const selectedRows = filteredData.filter((row) =>
      selectedPatients.includes(row.medicineId)
    );
    const ws = XLSX.utils.json_to_sheet(selectedRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Medicines");
    XLSX.writeFile(wb, "selected_medicines.xlsx");
  };

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredData.slice(indexOfFirstPatient, indexOfLastPatient);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / patientsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Biểu đồ thống kê
  const chartData = {
    labels: filteredData.map((item) => item.medicineName), // Xác định các nhãn trục X (Tên thuốc)
    datasets: [
      {
        label: "Số lượng thuốc", // Đặt tên cho dòng
        data: filteredData.map((item) => item.quantity), // Dữ liệu cho trục Y (Số lượng thuốc)
        fill: false, // Không tô màu dưới đường
        borderColor: "rgba(75,192,192,1)", // Màu đường
        tension: 0.1, // Làm mượt đường biểu đồ (tăng giá trị để tạo độ cong)
        pointRadius: 5, // Tăng kích thước các điểm trên đường
      },
    ],
  };
  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Tên thuốc",
        },
      },
      y: {
        title: {
          display: true,
          text: "Số lượng",
        },
      },
    },
  };
  const handleSave = async () => {
    console.log("Dữ liệu gửi đi:", formData); // Debug
  
    try {
      // Gọi API để cập nhật dữ liệu
      const response = await fetch(`http://localhost:8080/api/medicines/${formData.medicineId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      // Log trạng thái API và nội dung trả về để kiểm tra
      console.log("Trạng thái API:", response.status);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Phản hồi API:", errorText);
        throw new Error("Cập nhật thất bại!"); // Ném lỗi nếu API không trả về OK
      }
  
      const updatedData = await response.json();
      console.log("Cập nhật thành công:", updatedData);
  
      // Gọi callback cập nhật danh sách ở cấp cha (onUpdate và onRefresh)
      onUpdate(updatedData); // Cập nhật dữ liệu trong danh sách hiện tại
      if (onRefresh) onRefresh(); // Làm mới toàn bộ danh sách nếu cần
  
      // Thoát chế độ chỉnh sửa và thông báo thành công
      setIsEditing(false);
      toast.success("Cập nhật thành công!");
    } catch (error) {
      // Thông báo lỗi khi có lỗi xảy ra
      console.error(error);
      toast.error("Có lỗi xảy ra: " + error.message);
    }
  };
  const handleUpdate = (updatedPatient) => {
    // Cập nhật lại danh sách bệnh nhân (hoặc thuốc) sau khi sửa
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.medicineId === updatedPatient.medicineId
          ? updatedPatient
          : patient
      )
    );
  
    // Cập nhật lại dữ liệu lọc nếu cần
    setFilteredData((prevData) =>
      prevData.map((item) =>
        item.medicineId === updatedPatient.medicineId
          ? updatedPatient
          : item
      )
    );
  
    toast.success("Cập nhật thành công!");
  };
  const fetchAllMedicines = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/medicines");
      const data = await response.json();
      setData(data); // Update with setData instead of setMedicines
    } catch (error) {
      console.error("Không thể tải danh sách thuốc:", error);
      toast.error("Không thể tải danh sách thuốc!");
    }
  };
  
  return (
    <div className="datatable">
      <h2>Tủ thuốc</h2>
      <div className="dashboard">
        {/* Biểu đồ thống kê */}
        <div className="chartSection">
          <h3>Biểu đồ thống kê số lượng thuốc</h3>
          <Line data={chartData} options={{ responsive: true }} />
        </div>
        {/* Phần Tổng quan */}
        <div className="summarySection">
          <div className="summaryItem">
            <div className="icon">📦</div>
            <strong>Tổng số sản phẩm:</strong>
            <span>{totalProducts}</span>
          </div>
          <div className="summaryItem">
            <div className="icon">💊</div>
            <strong>Tổng số loại thuốc:</strong>
            <span>{totalTypes}</span>
          </div>
          <div className="summaryItem">
            <div className="icon">⬆️</div>
            <strong>Thuốc tồn kho lớn nhất:</strong>
            <span>{maxStock}</span>
          </div>
          <div className="summaryItem">
            <div className="icon">⬇️</div>
            <strong>Thuốc tồn kho thấp nhất:</strong>
            <span>{minStock}</span>
          </div>
        </div>
      </div>

      {/* Bộ lọc tìm kiếm */}
      <div className="filters">
        <input
          type="text"
          placeholder="Tìm Mã thuốc hoặc Tên thuốc"
          value={filters.medicineId}
          onChange={(e) => handleFilterChange(e, "medicineId")}
        />
      </div>

      {/* Nút In và Xuất Excel */}
      <div className="actions1">
        <button onClick={handlePrint} className="printButton">
          In báo cáo
        </button>
        <button onClick={handleExportToExcel} className="exportButton">
          Xuất Excel
        </button>
        <button className="addButton" onClick={() => setShowForm(true)}>
          Nhập thuốc
      </button>
      </div>
      

      

      
      {/* Hiển thị bảng dữ liệu */}
      <div className="tableSection">
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <table className="datatableTable">
          <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      setSelectedPatients(
                        e.target.checked ? data.map((item) => item.medicineId) : []
                      )
                    }
                  />
                </th>
                <th>Số thứ tự</th>
                <th>Mã số thuốc</th>
                <th>Tên thuốc</th>
                <th>Số lượng</th>
                <th>Loại thuốc</th> {/* Thêm cột hình ảnh */}
                <th>Ngày sản xuất</th>
                <th>Ngày hết hạn</th>
                <th>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((row, index) => (
                <tr key={row.medicineId}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedPatients.includes(row.medicineId)}
                      onChange={() => handleCheckboxChange(row.medicineId)}
                    />
                  </td>
                  <td>{index + 1 + indexOfFirstPatient}</td>
                  <td>{row.medicineId}</td>
                  <td>{row.medicineName}</td>
                  <td>{row.quantity}</td>
                  <td>{row.medicineType}</td>
                  <td>{row.entryDate}</td>
                  <td>{row.expDate}</td>
                  <td>
                    <button
                      className="viewButton"
                      onClick={() => setSelectedPatient(row)}
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

        </table>
      )}
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
          pattern="^[a-zA-Z\s]+$" // Chỉ cho phép chữ cái và khoảng trắng
          title="Tên thuốc chỉ được chứa chữ cái và khoảng trắng, không được chứa số"
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
          pattern="^[a-zA-Z\s]+$" // Chỉ cho phép chữ cái và khoảng trắng
          title="Loại thuốc chỉ được chứa chữ cái và khoảng trắng, không được chứa số"
        />
      </label>
      
      <label>
        Ngày nhập thuốc:
        <input
          type="date"
          name="entryDate"
          value={formData.entryDate}
          onChange={handleFormChange}
          required
        />
      </label>
      
      <label>
        Ngày hết hạn:
        <input
          type="date"
          name="expDate"
          value={formData.expDate}
          onChange={handleFormChange}
          required
          min={formData.entryDate} // Đảm bảo ngày hết hạn phải sau ngày nhập
          title="Ngày hết hạn phải sau ngày nhập"
        />
      </label>
      
      <label>
        Số lượng thuốc:
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleFormChange}
          required
          min="1" // Số lượng tối thiểu là 1
          max="10000" // Giới hạn số lượng tối đa là 10,000
          title="Số lượng phải là một số nguyên từ 1 đến 10,000"
        />
      </label>
      
      <button type="submit">Nhập</button>
      <button type="button" onClick={() => setShowForm(false)}>
        Hủy
      </button>
    </form>
  </div>
)}

       
        {/* Phân trang */}
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Trang trước
        </button>
        
        {/* Hiển thị số trang hiện tại trên tổng số trang */}
        <span className="page-info">
          Trang {currentPage} / {pageNumbers.length}
        </span>

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
        >
          Trang sau
        </button>
      </div>
        {/* Hiển thị chi tiết */}
        <Them
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
          onUpdate={handleUpdate} // Truyền callback cập nhật
          onDelete={handleDelete} // Callback xóa
          onRefresh={fetchAllMedicines}
        />
    </div>
  );
};

export default TableUser;








