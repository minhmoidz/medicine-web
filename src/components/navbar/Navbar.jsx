import "./navbar.scss";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  const [notifications, setNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false); // Trạng thái menu avatar

  const toggleNotificationDropdown = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const closeNotificationDropdown = () => {
    setIsNotificationOpen(false);
  };

  const toggleAvatarMenu = () => {
    setIsAvatarMenuOpen(!isAvatarMenuOpen);
  };

  const fetchExpiredMedicines = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/medicines");
      const expiredMedicines = response.data.filter((medicine) => {
        const today = new Date();
        const expDate = new Date(medicine.expDate);
        return expDate < today;
      });

      const formattedNotifications = expiredMedicines.map((medicine) => ({
        id: medicine.medicineId,
        message: `Thuốc ${medicine.medicineName} đã hết hạn sử dụng!`,
        link: `/medicines/${medicine.medicineId}`,
        isRead: false,
      }));

      setNotifications(formattedNotifications);
      setUnreadCount(formattedNotifications.length);

      if (formattedNotifications.length > 0) {
        toast.info("Bạn có thuốc hết hạn sử dụng. Kiểm tra thông báo!");
      } else {
        toast.success("Không có thuốc nào hết hạn!");
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thuốc hết hạn:", error);
      toast.error("Không thể tải dữ liệu thuốc hết hạn!");
    }
  };

  useEffect(() => {
    fetchExpiredMedicines();
  }, []);

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      isRead: true,
    }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
  };

  const navigateToPage = (link) => {
    window.location.href = "khothuoc";
  };

  const navigateToPersonal = () => {
    window.location.href = "/canhan"; // Đường dẫn đến trang cá nhân
  };

  const navigateToLogout = () => {
    window.location.href = "/login"; // Đường dẫn đến trang đăng xuất
  };
  const handleNotificationClick = (id) => {
  const updatedNotifications = notifications.map((notification) =>
    notification.id === id ? { ...notification, isRead: true } : notification
  );
  setNotifications(updatedNotifications);

  // Giảm số lượng thông báo chưa đọc
  setUnreadCount(updatedNotifications.filter(notification => !notification.isRead).length);
};


  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <ListOutlinedIcon className="icon" />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            Vietnamese
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>

          <div
            className="item"
            onClick={toggleNotificationDropdown}
            style={{ position: "relative" }}
          >
            <NotificationsNoneOutlinedIcon className="icon" />
            {unreadCount > 0 && <div className="counter">{unreadCount}</div>}
          </div>

          {isNotificationOpen && (
            <div
              className={`notification-dropdown ${
                isNotificationOpen ? "open" : ""
              }`}
            >
              <button className="close-btn" onClick={markAllAsRead}></button>
              <button className="close-btn" onClick={closeNotificationDropdown}>X</button>
              
              <ul>
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={notification.isRead ? "read" : "unread"}
                    onClick={() => navigateToPage(notification.link)}
                  >
                    {notification.message}
                  </li>
                ))}
              </ul>
              <hr/>
            </div>
          )}

          <div className="item" style={{ position: "relative" }}>
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="avatar"
              className="avatar"
              onClick={toggleAvatarMenu}
            />
            {isAvatarMenuOpen && (
              <div className="avatar-menu">
                <ul>
                  <li onClick={navigateToPersonal}>Cá nhân</li>
                  <li onClick={navigateToLogout}>Đăng xuất</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
