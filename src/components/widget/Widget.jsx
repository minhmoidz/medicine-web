import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import CountUp from 'react-countup'; // Import thư viện countup
import WarehouseIcon from '@mui/icons-material/Warehouse';

const Widget = ({ type }) => {
  const navigate = useNavigate(); // Hook để điều hướng
  const [expiredMedicinesCount, setExpiredMedicinesCount] = useState(0); // Thuốc hết hạn
  const [totalMedicineStock, setTotalMedicineStock] = useState(0); // Tổng số thuốc hiện có
  const [totalOrders, setTotalOrders] = useState(0); // Tổng đơn xuất thuốc
  const [totalContributions, setTotalContributions] = useState(0); // Tổng nhập thuốc
  const [diff, setDiff] = useState(20); // Tỉ lệ tăng trưởng

  // Gọi API và tính toán các số liệu
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy dữ liệu từ các API
        const [medicinesResponse, ordersResponse, contributionsResponse] = await Promise.all([
          fetch("http://localhost:8080/api/medicines"),
          fetch("http://localhost:8080/api/invoice-details"),
          fetch("http://localhost:8080/api/contributions")
        ]);

        const medicinesData = await medicinesResponse.json();
        const ordersData = await ordersResponse.json();
        const contributionsData = await contributionsResponse.json();

        // Tính toán thuốc hết hạn
        const today = new Date();
        const expiredMedicines = medicinesData.filter((medicine) => {
          const expDate = new Date(medicine.expDate);
          return expDate < today;
        });
        setExpiredMedicinesCount(expiredMedicines.length);

        // Tính tổng số thuốc hiện có
        const totalStock = medicinesData.reduce((acc, medicine) => acc + medicine.quantity, 0);
        setTotalMedicineStock(totalStock);

        // Tính tổng đơn xuất thuốc
        const totalOrders = ordersData.reduce((acc, order) => acc + order.quantityDetails, 0);
        setTotalOrders(totalOrders);

        // Tính tổng nhập thuốc
        const totalContributions = contributionsData.reduce((acc, contribution) => acc + contribution.quantityContribution, 0);
        setTotalContributions(totalContributions);

      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchData();
  }, []); // Chỉ gọi API khi component được mount

  let data;

  switch (type) {
    case "user":
      data = {
        title: "Thuốc hiện có",
        isMoney: false,
        link: "Xem chi tiết",
        route: "/tuthuoc", // Đường dẫn khi nhấn vào
        icon: (
          <MedicationLiquidIcon 
            className="icon"
            style={{
              color: "blue",
              backgroundColor: "rgba(255, 225, 225, 0.2)",
            }}
          />
        ),
        amount: totalMedicineStock // Hiển thị tổng số thuốc hiện có
      };
      break;
    case "order":
      data = {
        title: "Xuất thuốc",
        isMoney: false,
        link: "Xem chi tiết",
        route: "/xuatthuoc",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
        amount: totalOrders // Hiển thị tổng đơn xuất thuốc
      };
      break;
    case "earning":
      data = {
        title: "Nhập thuốc",
        isMoney: false,
        link: "Xem chi tiết",
        route: "/phieunhap",
        icon: (
          <WarehouseIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
        amount: totalContributions // Hiển thị tổng nhập thuốc
      };
      break;
    case "balance":
      data = {
        title: "Thuốc hết hạn",
        isMoney: true,
        link: "Xem chi tiết",
        route: "/khothuoc",
        icon: (
          <WarningAmberIcon
            className="icon"
            style={{
              backgroundColor: "rgba(225, 225, 225, 0.2)",
              color: "red",
            }}
          />
        ),
        amount: expiredMedicinesCount // Hiển thị số thuốc hết hạn
      };
      break;
    default:
      break;
  }

  const handleNavigate = () => {
    if (data?.route) {
      navigate(data.route); // Điều hướng đến trang tương ứng
    }
  };

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && ""} 
          {/* Sử dụng CountUp để hiển thị số liệu từ 0 đến số thực tế */}
          <CountUp start={0} end={data.amount} duration={2.5} separator="," />
        </span>
        <span className="link" onClick={handleNavigate} style={{ cursor: "pointer", color: "blue" }}>
          {data.link}
        </span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;