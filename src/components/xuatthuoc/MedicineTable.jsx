import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./styles.scss";

const MedicineTable = () => {
  const [medicines, setMedicines] = useState([]);
  const [latestMedicine, setLatestMedicine] = useState(null);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const medicinesPerPage = 14;



const [newMedicine, setNewMedicine] = useState({
  patientName: "",
  patientPhone: "",
  medicineName: "",
  medicineType: "",
  quantityDetails: "",
  dateOfTrans: "",
});

const [isAddModalOpen, setIsAddModalOpen] = useState(false);

// Hàm để mở modal thêm đơn xuất thuốc
const handleAddMedicine = () => {
  setIsAddModalOpen(true);
};

// Hàm xử lý thay đổi trong form nhập liệu
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewMedicine((prev) => ({
    ...prev,
    [name]: value,
  }));
};

// Hàm gửi yêu cầu POST để thêm đơn thuốc mới
const handleAddNewMedicine = () => {
  axios
    .post("http://localhost:8080/api/invoice-details", newMedicine)
    .then((response) => {
      toast.success("Thêm đơn thuốc thành công!");
      // Cập nhật lại danh sách thuốc sau khi thêm
      setMedicines((prevMedicines) => [...prevMedicines, response.data]);
      setIsAddModalOpen(false); // Đóng modal sau khi thêm
      setNewMedicine({
        patientName: "",
        patientPhone: "",
        medicineName: "",
        medicineType: "",
        quantityDetails: "",
        dateOfTrans: "",
      }); // Reset form
    })
    .catch(() => {
      toast.error("Lỗi khi thêm đơn thuốc!");
    });
};

  // Fetch dữ liệu từ API
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/invoice-details")
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          setMedicines(data);
          setLatestMedicine(data[0]); // Lấy đơn thuốc gần nhất
        } else {
          toast.error("Dữ liệu không hợp lệ!");
        }
      })
      .catch(() => {
        toast.error("Lỗi khi lấy dữ liệu!");
      });
  }, []);

  // Xử lý tìm kiếm
  // Xử lý tìm kiếm
const handleSearch = (e) => {
  setSearchTerm(e.target.value.toLowerCase());
};

const filteredMedicines = medicines.filter((medicine) => {
  const invoiceDetailsId = medicine?.invoiceDetailsId?.toString() || "";
  const patientName = medicine?.patientName?.toLowerCase() || "";
  
  return (
    invoiceDetailsId.includes(searchTerm) || patientName.includes(searchTerm)
  );
});


const handleEdit = (medicine) => {
  // Mở form sửa và điền dữ liệu ban đầu
  setSelectedMedicine(medicine);
};

// Hàm để xử lý gửi thông tin đã sửa lên API
const handleUpdate = () => {
  if (selectedMedicine) {
    axios
      .put(`http://localhost:8080/api/invoice-details/${selectedMedicine.invoiceDetailsId}`, selectedMedicine)
      .then((response) => {
        toast.success("Cập nhật thành công!");
        // Cập nhật lại danh sách thuốc sau khi sửa
        setMedicines((prevMedicines) =>
          prevMedicines.map((item) =>
            item.invoiceDetailsId === selectedMedicine.invoiceDetailsId
              ? selectedMedicine
              : item
          )
        );
        setSelectedMedicine(null); // Đóng modal sau khi cập nhật
      })
      .catch(() => {
        toast.error("Lỗi khi cập nhật!");
      });
  }
};

// Các phương thức để cập nhật dữ liệu trong form (ví dụ: khi thay đổi tên bệnh nhân)
const handleChange = (e) => {
  const { name, value } = e.target;
  setSelectedMedicine((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  // Phân trang
  const indexOfLastMedicine = currentPage * medicinesPerPage;
  const indexOfFirstMedicine = indexOfLastMedicine - medicinesPerPage;
  const currentMedicines = filteredMedicines.slice(
    indexOfFirstMedicine,
    indexOfLastMedicine
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Xử lý xóa thuốc
  const handleDelete = (invoiceDetailsId) => {
    axios
      .delete(`http://localhost:8080/api/invoice-details/${invoiceDetailsId}`)
      .then(() => {
        setMedicines(medicines.filter((med) => med.invoicedetailsid !== invoiceDetailsId));
        toast.success("Đã xóa đơn thuốc thành công!");
      })
      .catch(() => {
        toast.error("Không thể xóa đơn thuốc. Vui lòng thử lại!");
      });
  };

  return (
    <div className="medicine-container">
      {/* Biểu đồ và đơn thuốc gần nhất */}
      <div className="dashboard">
        {latestMedicine && (
          <div className="latest-medicine">
            <h3>Đơn thuốc gần nhất</h3>
            <div className="medicine-details">
              <p>
                Bệnh nhân: <span>{latestMedicine?.patientName || "Không có tên"}</span>
              </p>
              <p>
                SĐT: <span>{latestMedicine?.patientPhone || "Không có số điện thoại"}</span>
              </p>
              <p>
                Thuốc: <span>{latestMedicine?.medicineName || "Chưa có thuốc"}</span>
              </p>
              <p>
                Số lượng: <span>{latestMedicine?.quanlityDetails || "Chưa có số lượng"}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Thanh tìm kiếm */}
      <div className="actions">
        <input
          type="text"
          placeholder="Tìm theo ID hoặc tên bệnh nhân..."
          onChange={handleSearch}
        />
        <button className="button" onClick={handleAddMedicine}>Thêm đơn xuất thuốc</button>

      </div>
      
      {/* Bảng danh sách thuốc */}
      <div className="medicine-table">
        <h3>Danh sách xuất thuốc</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Bệnh nhân</th>
              <th>SĐT</th>
              <th>Thuốc</th>
              <th>Loại</th>
              <th>Số lượng</th>
              <th>Ngày</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentMedicines.map((medicine) => (
              <tr key={medicine?.invoiceDetailsId}>
                <td>{medicine?.invoiceDetailsId || "N/A"}</td>
                <td>{medicine?.patientName || "Chưa có tên"}</td>
                <td>{medicine?.patientPhone || "Chưa có số điện thoại"}</td>
                <td>{medicine?.medicineName || "Chưa có thuốc"}</td>
                <td>{medicine?.medicineType || "Chưa có loại thuốc"}</td>
                <td>{medicine?.quantityDetails || "Chưa có số lượng"}</td>
                <td>{medicine?.dateOfTrans || "Chưa có ngày"}</td>
                <td>
                  <button onClick={() => setSelectedMedicine(medicine)}>
                    Thông tin
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Modal thêm đơn thuốc */}
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Thêm đơn xuất thuốc</h2>
            <div className="modal-info">
              <p>
                <strong>Bệnh nhân:</strong>
                <input
                  type="text"
                  name="patientName"
                  value={newMedicine.patientName}
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <strong>SĐT:</strong>
                <input
                  type="text"
                  name="patientPhone"
                  value={newMedicine.patientPhone}
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <strong>Thuốc:</strong>
                <input
                  type="text"
                  name="medicineName"
                  value={newMedicine.medicineName}
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <strong>Loại thuốc:</strong>
                <input
                  type="text"
                  name="medicineType"
                  value={newMedicine.medicineType}
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <strong>Số lượng:</strong>
                <input
                  type="number"
                  name="quantityDetails"
                  value={newMedicine.quantityDetails}
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <strong>Ngày giao dịch:</strong>
                <input
                  type="date"
                  name="dateOfTrans"
                  value={newMedicine.dateOfTrans}
                  onChange={handleInputChange}
                />
              </p>
            </div>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleAddNewMedicine}>
                Thêm
              </button>
              <button onClick={() => setIsAddModalOpen(false)}>Đóng</button>
            </div>
          </div>
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
        <span>
          Trang {currentPage} / {Math.ceil(filteredMedicines.length / medicinesPerPage)}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredMedicines.length / medicinesPerPage)}
        >
          Trang sau
        </button>
      </div>


      {selectedMedicine && (
  <div className="modal">
    <div className="modal-content">
      <h2>Thông tin chi tiết</h2>
      <div className="modal-info">
        <p>
          <strong>ID:</strong>
          {selectedMedicine?.invoiceDetailsId || "N/A"}
        </p>
        <p>
          <strong>Bệnh nhân:</strong>
          <input
            type="text"
            name="patientName"
            value={selectedMedicine?.patientName || ""}
            onChange={handleChange}
            required
            pattern="^[a-zA-Z\s]+$" // Chỉ cho phép chữ và khoảng trắng
            title="Tên bệnh nhân chỉ được chứa chữ cái và khoảng trắng"
          />
        </p>
        <p>
          <strong>SĐT:</strong>
          <input
            type="text"
            name="patientPhone"
            value={selectedMedicine?.patientPhone || ""}
            onChange={handleChange}
            required
            pattern="^\d{10,11}$" // Chỉ cho phép số và có độ dài từ 10 đến 11 ký tự
            title="Số điện thoại phải có 10 hoặc 11 chữ số"
          />
        </p>
        <p>
          <strong>Thuốc:</strong>
          <input
            type="text"
            name="medicineName"
            value={selectedMedicine?.medicineName || ""}
            onChange={handleChange}
            required
            pattern="^[a-zA-Z\s]+$" // Chỉ cho phép chữ và khoảng trắng
            title="Tên thuốc chỉ được chứa chữ cái và khoảng trắng"
          />
        </p>
        <p>
          <strong>Loại:</strong>
          <input
            type="text"
            name="medicineType"
            value={selectedMedicine?.medicineType || ""}
            onChange={handleChange}
            required
            pattern="^[a-zA-Z\s]+$" // Chỉ cho phép chữ và khoảng trắng
            title="Loại thuốc chỉ được chứa chữ cái và khoảng trắng"
          />
        </p>
        <p>
          <strong>Số lượng:</strong>
          <input
            type="number"
            name="quantityDetails"
            value={selectedMedicine?.quantityDetails || ""}
            onChange={handleChange}
            required
            min="1" // Số lượng tối thiểu là 1
            max="10000" // Giới hạn số lượng tối đa là 10,000
            title="Số lượng phải là một số nguyên từ 1 đến 10,000"
          />
        </p>
        <p>
          <strong>Ngày giao dịch:</strong>
          <input
            type="date"
            name="dateOfTrans"
            value={selectedMedicine?.dateOfTrans || ""}
            onChange={handleChange}
            required
          />
        </p>
      </div>
      <div className="modal-actions">
        <button
          className="delete-btn"
          onClick={() => handleDelete(selectedMedicine.invoiceDetailsId)}
        >
          Xóa
        </button>
        <button onClick={() => setSelectedMedicine(null)}>Đóng</button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default MedicineTable;
