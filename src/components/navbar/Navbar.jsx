import "./navbar.scss";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify"; // Import toast từ react-toastify

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Bạn có đơn hàng mới!", isRead: false },
    { id: 2, message: "Giảm giá 10% cho đơn hàng tiếp theo!", isRead: false },
    { id: 3, message: "Đơn hàng của bạn đã được giao.", isRead: false },
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Hàm toggle dropdown thông báo
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Đóng dropdown khi nhấn nút "X"
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Cập nhật số lượng thông báo chưa đọc
  useEffect(() => {
    const unreadCount = notifications.filter((n) => !n.isRead).length;
    setUnreadCount(unreadCount);
  }, [notifications]);

  // Đánh dấu tất cả thông báo là đã đọc
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      isRead: true,
    }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
  };

  // Thông báo khi người dùng nhận thông báo
  const notify = () => {
    toast("Bạn có thông báo mới!");
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search"></div>
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

          {/* Icon thông báo */}
          <div className="item" onClick={toggleDropdown} style={{ position: "relative" }}>
            <NotificationsNoneOutlinedIcon className="icon" />
            {unreadCount > 0 && <div className="counter">{unreadCount}</div>}
          </div>

          {/* Dropdown thông báo */}
          {isDropdownOpen && (
            <div className={`notification-dropdown ${isDropdownOpen ? "open" : ""}`}>
              <button onClick={markAllAsRead}>Đánh dấu tất cả là đã đọc</button>
              <button className="close-btn" onClick={closeDropdown}>×</button> {/* Nút đóng */}
              <ul>
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={notification.isRead ? "read" : "unread"}
                  >
                    {notification.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
