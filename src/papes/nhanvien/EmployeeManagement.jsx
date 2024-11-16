import React, { useState } from 'react';
import './employeeManagement.scss';
import Sidebar from "../../components/siderbar/Siderbar.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      department: 'Kế Toán',
      specialization: 'Kế toán viên',
      dob: '1990-05-20',
      startDate: '2015-01-15',
      image: 'public/avatar.jpg',
      workFrequency: [5, 2, 3, 4, 6],
    },
    {
      id: 2,
      name: 'Trần Thị B',
      department: 'Nhân Sự',
      specialization: 'Chuyên viên nhân sự',
      dob: '1985-10-10',
      startDate: '2017-03-01',
      image: 'public/avatar.jpg',
      workFrequency: [4, 4, 5, 3, 2],
    },
  ]);
  
  const [newEmployee, setNewEmployee] = useState({
    id: '',
    name: '',
    department: '',
    specialization: '',
    dob: '',
    startDate: '',
    image: '',
    workFrequency: [],
  });

  const [editingIndex, setEditingIndex] = useState(-1);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding or updating employee
  const handleSaveEmployee = () => {
    if (editingIndex >= 0) {
      const updatedEmployees = employees.map((emp, index) =>
        index === editingIndex ? { ...newEmployee, id: emp.id } : emp
      );
      setEmployees(updatedEmployees);
    } else {
      setEmployees([...employees, { ...newEmployee, id: employees.length + 1 }]);
    }
    setNewEmployee({ id: '', name: '', department: '', specialization: '', dob: '', startDate: '', image: '', workFrequency: [] });
    setEditingIndex(-1);
  };

  // Handle delete employee
  const handleDeleteEmployee = (index) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
  };

  // Handle edit employee
  const handleEditEmployee = (index) => {
    setNewEmployee(employees[index]);
    setEditingIndex(index);
  };

  // Handle view employee info
  const handleViewInfo = (index) => {
    const employee = employees[index];
    alert(`Thông tin chi tiết của ${employee.name}:\nBộ phận: ${employee.department}\nChuyên ngành: ${employee.specialization}\nNgày sinh: ${employee.dob}\nNgày vào làm: ${employee.startDate}`);
  };

  // Statistics
  const totalEmployees = employees.length;
  const leftEmployees = employees.filter(emp => emp.startDate < '2021-01-01').length; // Ví dụ về cách xác định nhân viên đã nghỉ
  const potentialEmployees = employees.filter(emp => emp.workFrequency.reduce((a, b) => a + b, 0) > 20).length; // Nhân viên có tần suất công việc cao

  return (
    <div className="employee-management-container">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="main-section">
          <h2>Quản Lý Nhân Sự</h2>
          <input
            type="text"
            placeholder="Tìm kiếm nhân viên"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="controls">
            <input
              type="text"
              placeholder="Tên nhân viên"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Bộ phận"
              value={newEmployee.department}
              onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
            />
            <input
              type="text"
              placeholder="Chuyên ngành"
              value={newEmployee.specialization}
              onChange={(e) => setNewEmployee({ ...newEmployee, specialization: e.target.value })}
            />
            <input
              type="date"
              placeholder="Ngày sinh"
              value={newEmployee.dob}
              onChange={(e) => setNewEmployee({ ...newEmployee, dob: e.target.value })}
            />
            <input
              type="date"
              placeholder="Ngày vào làm"
              value={newEmployee.startDate}
              onChange={(e) => setNewEmployee({ ...newEmployee, startDate: e.target.value })}
            />
            <input
              type="text"
              placeholder="Link hình ảnh"
              value={newEmployee.image}
              onChange={(e) => setNewEmployee({ ...newEmployee, image: e.target.value })}
            />
            <button onClick={handleSaveEmployee}>{editingIndex >= 0 ? 'Cập nhật' : 'Thêm'}</button>
          </div>
          <div className="employee-list">
            {filteredEmployees.map((employee, index) => (
              <div key={employee.id} className="employee-item">
                <img src={employee.image} alt={employee.name} />
                <div>
                  <h4>{employee.name}</h4>
                  <p>Bộ phận: {employee.department}</p>
                  <p>Chuyên ngành: {employee.specialization}</p>
                  <p>Ngày sinh: {employee.dob}</p>
                  <p>Ngày vào làm: {employee.startDate}</p>
                  <button onClick={() => handleViewInfo(index)}>Xem Thông Tin</button>
                  <button onClick={() => handleEditEmployee(index)}>Sửa</button>
                  <button onClick={() => handleDeleteEmployee(index)}>Xóa</button>
                </div>
              </div>
            ))}
          </div>
          <div className="statistics">
            <h3>Thống Kê Nhân Sự</h3>
            <p>Tổng số nhân sự: {totalEmployees}</p>
            <p>Số nhân viên đã nghỉ việc: {leftEmployees}</p>
            <p>Số nhân viên tiềm năng: {potentialEmployees}</p>
            {/* Biểu đồ tần suất làm việc có thể được thêm vào đây */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;
