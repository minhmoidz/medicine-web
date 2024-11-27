import React, { useEffect, useState } from "react";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/invoice-details"); // Thay bằng endpoint API thực tế
        const data = await response.json();

        const transformedData = data.map((item) => ({
          id: item.invoiceDetailsId,
          product: item.medicineName,
          customer: item.patientName,
          date: item.dateOfTrans,
          amount: item.quantityDetails,
          method: "Thanh toán tại quầy",
          status: "Approved",
        }));

        setRows(transformedData);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">ID thuốc</TableCell>
              <TableCell className="tableCell">Tên thuốc</TableCell>
              <TableCell className="tableCell">Tên tài khoản đặt mua</TableCell>
              <TableCell className="tableCell">Ngày giao dịch</TableCell>
              <TableCell className="tableCell">Số lượng</TableCell>
              <TableCell className="tableCell">Loại thanh toán</TableCell>
              <TableCell className="tableCell">Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(0, 8).map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.id}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">{row.product}</div>
                </TableCell>
                <TableCell className="tableCell">{row.customer}</TableCell>
                <TableCell className="tableCell">{row.date}</TableCell>
                <TableCell className="tableCell">{row.amount}</TableCell>
                <TableCell className="tableCell">{row.method}</TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${row.status}`}>{row.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="actionContainer">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/xuatthuoc")} // Thay bằng URL trang nhập thuốc
        >
          Xem thêm
        </Button>
      </div>
    </div>
  );
};

export default List;
