import "./datatable.scss";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./patientInfoModal.scss";

const PatientInfoModal = ({ patient, onClose, onUpdate, onDelete }) => {
  if (!patient) return null;

  const [updatedPatient, setUpdatedPatient] = useState({ ...patient });
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa

  useEffect(() => {
    setUpdatedPatient({ ...patient });
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/patients/${updatedPatient.patientId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPatient),
      });

      if (response.ok) {
        const updatedData = await response.json();
        onUpdate(updatedData);
        toast.success("Cập nhật thành công!"); // Thông báo thành công
        setIsEditing(false);
      } else {
        throw new Error("Cập nhật thất bại. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message); // Thông báo lỗi
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bệnh nhân này không?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/patients/${patient.patientId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          onDelete(patient.patientId);
          toast.success("Xóa thành công!"); // Thông báo thành công
          onClose();
        } else {
          throw new Error("Xóa thất bại. Vui lòng thử lại!");
        }
      } catch (error) {
        console.error(error.message);
        toast.error(error.message); // Thông báo lỗi
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Thông tin bệnh nhân</h3>
        <table>
          <tbody>
            <tr>
              <td>Họ tên:</td>
              <td>
                {isEditing ? (
                  <input
                    type="text"
                    name="patientName"
                    value={updatedPatient.patientName}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{updatedPatient.patientName}</span>
                )}
              </td>
            </tr>
            <tr>
              <td>Mã bệnh nhân:</td>
              <td>
                {isEditing ? (
                  <input
                    type="text"
                    name="patientId"
                    value={updatedPatient.patientId}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{updatedPatient.patientId}</span>
                )}
              </td>
            </tr>
            <tr>
              <td>Giới tính:</td>
              <td>
                {isEditing ? (
                  <input
                    type="text"
                    name="gender"
                    value={updatedPatient.gender}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{updatedPatient.gender}</span>
                )}
              </td>
            </tr>
            <tr>
              <td>Địa chỉ:</td>
              <td>
                {isEditing ? (
                  <input
                    type="text"
                    name="patientAddress"
                    value={updatedPatient.patientAddress}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{updatedPatient.patientAddress}</span>
                )}
              </td>
            </tr>
            <tr>
              <td>Ngày sinh:</td>
              <td>
                {isEditing ? (
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={updatedPatient.dateOfBirth}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{updatedPatient.dateOfBirth}</span>
                )}
              </td>
            </tr>
            <tr>
              <td>Số điện thoại:</td>
              <td>
                {isEditing ? (
                  <input
                    type="tel"
                    name="patientPhone"
                    value={updatedPatient.patientPhone}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{updatedPatient.patientPhone}</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="modal-actions">
          {isEditing ? (
            <>
              <button className="update" onClick={handleSave}>Lưu</button>
              <button className="cancel" onClick={() => setIsEditing(false)}>Hủy</button>
            </>
          ) : (
            <>
              <button className="editButton" onClick={() => setIsEditing(true)}>Chỉnh sửa</button>
              <button className="deleteButton" onClick={handleDelete}>Xóa</button>
            </>
          )}
          <button className="close" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default PatientInfoModal;
