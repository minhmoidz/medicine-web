import "./siderbar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

import ManIcon from '@mui/icons-material/Man';

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Medical App</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>  
          <p className="title">MENU</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">Quản lý</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Bệnh nhân</span>
            </li>
          </Link>
          <Link to="/tuthuoc" >
            <li>
              <StoreIcon className="icon" />
              <span>Tủ thuốc</span>
            </li>
          </Link>
          <Link to="/phieunhap">
            <li>
              <CreditCardIcon className="icon" />
              <span>Nhập thuốc</span>
            </li>
          </Link>
          <Link to="/xuatthuoc" >
            <li>
              <LocalShippingIcon className="icon" />
              <span>Xuất thuốc</span>
            </li>
          </Link>
          <Link/>
          <Link to="/khothuoc" >
            <li>
              <LocalShippingIcon className="icon" />
              <span>Tồn kho</span>
            </li>
          </Link>
          <Link/>
          <Link to="/khothuoc" >
            <li>
              <ManIcon className="icon" />
              <span>Nhân sự </span>
            </li>
          </Link>
          <p className="title">Số liệu</p>
          <Link to="/thongke">
            <li>
              <InsertChartIcon className="icon" />
              <span>Thống kê</span>
            </li>
          </Link>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Phản hồi </span>
          </li>
          <p className="title">Dịch vụ</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <p className="title">Tài khoản</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Cá nhân</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Cài đặt</span>
          </li>
          <Link to="/login" >
            <li>
              <ExitToAppIcon className="icon" />
              <span>Đăng xuất</span>
            </li>
          </Link>
          <Link/>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;