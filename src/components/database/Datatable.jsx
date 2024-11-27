import { useState, useEffect } from "react";
import axios from "axios";
import PatientInfoModal from "./PatientInfoModal.jsx";
import * as XLSX from 'xlsx';

const Datatable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [filters, setFilters] = useState({
    patientId: "",
    patientName: "",
    gender: "",
    patientAddress: "",
  });
  const [error, setError] = useState(null);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(16);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    patientId: "",
    patientName: "",
    gender: "",
    patientAddress: "",
    patientPhone: "",
  });

  // Gọi API để lấy dữ liệu
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/patients");
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Chi tiết lỗi:", error);
        setError("Không thể tải dữ liệu từ API. Vui lòng kiểm tra lại.");
      }
    };
    fetchData();
  }, []);

  const handleDelete = (patientId) => {
    setData(data.filter((item) => item.patientId !== patientId));
    setFilteredData(filteredData.filter((item) => item.patientId !== patientId));
  };

  const handleFilterChange = (e, field) => {
    const { value } = e.target;
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);

    if (value === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (item) =>
          (item.patientId &&
            item.patientId.toString().toLowerCase().includes(value.toLowerCase())) ||
          (item.patientName &&
            item.patientName.toLowerCase().includes(value.toLowerCase()))
      );
      setFilteredData(filtered);
    }
  };

  const handleUpdate = (updatedPatient) => {
    setData((prevData) =>
      prevData.map((patient) =>
        patient.patientId === updatedPatient.patientId ? updatedPatient : patient
      )
    );
  };

  const handleAddPatient = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/patients", newPatient);
      setData([...data, response.data]);
      setFilteredData([...filteredData, response.data]);
      setShowAddPatientModal(false); // Đóng modal sau khi thêm
      setNewPatient({
        patientId: "",
        patientName: "",
        gender: "",
        patientAddress: "",
        patientPhone: "",
      });
    } catch (error) {
      console.error("Lỗi khi thêm bệnh nhân:", error);
    }
  };

  const handleCheckboxChange = (patientId) => {
    if (selectedPatients.includes(patientId)) {
      setSelectedPatients(selectedPatients.filter((patientId) => patientId !== patientId));
    } else {
      setSelectedPatients([...selectedPatients, patientId]);
    }
  };

  const handlePrint = () => {
    const selectedRows = filteredData.filter((row) => selectedPatients.includes(row.patientId));
    window.print();
  };

  const handleExportToExcel = () => {
    const selectedRows = filteredData.filter((row) => selectedPatients.includes(row.patientId));
    const ws = XLSX.utils.json_to_sheet(selectedRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Selected Patients");
    XLSX.writeFile(wb, "selected_patients.xlsx");
  };

  // Phân trang
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredData.slice(indexOfFirstPatient, indexOfLastPatient);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Tạo các nút phân trang
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / patientsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="datatable">
      <h2>Danh sách bệnh nhân</h2>
      <div className="datatableHeader">
        {/* Bộ lọc */}
        <div className="filters">
          <input
            type="text"
            placeholder="Tìm Mã bệnh nhân hoặc Họ tên"
            value={filters.patientId}
            onChange={(e) => handleFilterChange(e, 'patientId')}
          />
        </div>

        {/* Nút Thêm bệnh nhân */}
        <div className="actions">
          <button onClick={() => setShowAddPatientModal(true)} className="addButton">Thêm bệnh nhân</button>
          <button onClick={handlePrint} className="printButton">In báo cáo</button>
          <button onClick={handleExportToExcel} className="exportButton">Xuất Excel</button>
        </div>
      </div>

      <div className="tableSection">
        {error ? (
          <div className="error">{error}</div>
        ) : (
          <table className="datatableTable">
            <thead>
              <tr>
                <th><input type="checkbox" onChange={(e) => setSelectedPatients(e.target.checked ? data.map(item => item.id) : [])} /></th>
                <th>TT</th>
                <th>Mã bệnh nhân</th>
                <th>Họ và tên</th>
                <th>Giới tính</th>
                <th>Địa chỉ</th>
                <th>Số điện thoại</th>
                <th>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((row, index) => (
                <tr key={row.patientId}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedPatients.includes(row.patientId)}
                      onChange={() => handleCheckboxChange(row.patientId)}
                    />
                  </td>
                  <td>{index + 1 + indexOfFirstPatient}</td>
                  <td>{row.patientId}</td>
                  <td>{row.patientName}</td>
                  <td>{row.gender}</td>
                  <td>{row.patientAddress}</td>
                  <td>{row.patientPhone}</td>
                  <td>
                    <div className="cellAction">
                      <span
                        className="viewButton"
                        onClick={() => setSelectedPatient(row)}
                      >
                        Thông tin
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Phân trang */}
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Trang trước</button>
        <span>Trang {currentPage}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length}>Trang sau</button>
      </div>

      <PatientInfoModal
        patient={selectedPatient}
        onClose={() => setSelectedPatient(null)}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

      {/* Modal Thêm Bệnh nhân */}
      {showAddPatientModal && (
  <div className="modal">
    <div className="modalContent">
      <h3>Thêm Bệnh nhân</h3>
      <form>
        <input
          type="text"
          placeholder="Mã bệnh nhân"
          value={newPatient.patientId}
          onChange={(e) => setNewPatient({ ...newPatient, patientId: e.target.value })}
          required
          pattern="^[A-Za-z0-9]+$" // Chỉ cho phép chữ cái và số
          title="Mã bệnh nhân chỉ được chứa chữ và số"
        />
        <input
          type="text"
          placeholder="Họ và tên"
          value={newPatient.patientName}
          onChange={(e) => setNewPatient({ ...newPatient, patientName: e.target.value })}
          required
          pattern="^[A-Za-z\s]+$" // Chỉ cho phép chữ và khoảng trắng
          title="Họ và tên chỉ được chứa chữ cái và khoảng trắng"
        />
        <input
          type="text"
          placeholder="Giới tính"
          value={newPatient.gender}
          onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
          required
          pattern="^(Nam|Nữ)$" // Chỉ cho phép "Nam" hoặc "Nữ"
          title="Giới tính chỉ có thể là 'Nam' hoặc 'Nữ'"
        />
        <input
          type="text"
          placeholder="Địa chỉ"
          value={newPatient.patientAddress}
          onChange={(e) => setNewPatient({ ...newPatient, patientAddress: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Số điện thoại"
          value={newPatient.patientPhone}
          onChange={(e) => setNewPatient({ ...newPatient, patientPhone: e.target.value })}
          required
          pattern="^\d{10,11}$" // Chỉ cho phép số và có độ dài từ 10 đến 11 ký tự
          title="Số điện thoại phải có 10 hoặc 11 chữ số"
        />
        <button type="button" onClick={handleAddPatient}>Thêm</button>
        <button type="button" onClick={() => setShowAddPatientModal(false)}>Hủy</button>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default Datatable;
