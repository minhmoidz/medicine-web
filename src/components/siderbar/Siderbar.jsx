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
import FactoryIcon from '@mui/icons-material/Factory';
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
          <Link to="/tuthuoc" style={{ textDecoration: "none" }} >
            <li>
              <StoreIcon className="icon" />
              <span>Tủ thuốc</span>
            </li>
          </Link>
          <Link to="/phieunhap" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Nhập thuốc</span>
            </li>
          </Link>
          <Link to="/xuatthuoc" style={{ textDecoration: "none" }}>
            <li>
              <LocalShippingIcon className="icon" />
              <span>Xuất thuốc</span>
            </li>
          </Link>
          <Link/>
          <Link to="/khothuoc" style={{ textDecoration: "none" }} >
            <li>
              <FactoryIcon  className="icon" />
              <span>Tồn kho</span>
            </li>
          </Link>
          <Link/>
          <p className="title" style={{ textDecoration: "none" }}>Tiện ích</p>
          <Link to="/lich" style={{ textDecoration: "none" }}>
            <li>
              <SettingsSystemDaydreamOutlinedIcon className="icon" />
              <span>Lịch trực</span>
            </li>
          </Link>
          <Link to="/thongbao" style={{ textDecoration: "none" }}>
            <li>
              <NotificationsNoneIcon className="icon" />
              <span>Thông báo</span>
            </li>
          </Link>
          <p className="title" style={{ textDecoration: "none" }}>Tài khoản</p>
          <Link to="/canhan" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Cá nhân</span>
            </li>

          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <li>
              <ExitToAppIcon className="icon" />
              <span>Đăng xuất</span>
            </li>
          </Link>
          <Link/>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;