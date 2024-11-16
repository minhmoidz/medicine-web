import "./navbar.scss";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify"; // Import toast from react-toastify

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Bạn có đơn hàng mới!", isRead: false },
    { id: 2, message: "Giảm giá 10% cho đơn hàng tiếp theo!", isRead: false },
    { id: 3, message: "Đơn hàng của bạn đã được giao.", isRead: false },
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false); // State for the chat dropdown
  const [activeConversation, setActiveConversation] = useState(null); // State for active conversation
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0); // Đếm số tin nhắn chưa đọc
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Minh",
      message: "Hi, how are you?",
      isRead: false,
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      conversation: [{ sender: "Minh", message: "Hi, how are you?" }],
    },
    {
      id: 2,
      sender: "Tri",
      message: "Hi?",
      isRead: false,
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      conversation: [
        { sender: "Jane Smith", message: "Can we reschedule our meeting?" },
      ],
    },
    {
      id: 3,
      sender: "Bla",
      message: "Hello!",
      isRead: false,
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      conversation: [{ sender: "Bla", message: "Let's catch up soon!" }],
    },
  ]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  useEffect(() => {
    const unreadMessagesCount = messages.filter((n) => !n.isRead).length;
    setUnreadMessagesCount(unreadMessagesCount);
  }, [messages]);


  useEffect(() => {
    const unreadCount = notifications.filter((n) => !n.isRead).length;
    setUnreadCount(unreadCount);
  }, [notifications]);
  const markAsRead = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id ? { ...message, isRead: true } : message
      )
    );
  };
  

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      isRead: true,
    }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
  };

  const toggleChatDropdown = () => {
    setIsChatOpen(!isChatOpen);
  };

  const showConversation = (id) => {
    const conversation = messages.find((msg) => msg.id === id);
    setActiveConversation(conversation);
  };


  const closeConversation = () => {
    setActiveConversation(null);
  };


  const [newMessage, setNewMessage] = useState(""); 
  const sendMessage = () => {
    if (newMessage.trim()) {
      const updatedMessages = [...messages];
      updatedMessages[0].conversation.push({ sender: "You", message: newMessage }); 
      setMessages(updatedMessages);
      setNewMessage(""); 
      toast.success("Tin nhắn đã được gửi!");
    } else {
      toast.error("Vui lòng nhập tin nhắn!");
    }
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


          <div className="item" onClick={toggleDropdown} style={{ position: "relative" }}>
            <NotificationsNoneOutlinedIcon className="icon" />
            {unreadCount > 0 && <div className="counter">{unreadCount}</div>}
          </div>


          {isDropdownOpen && (
            <div className={`notification-dropdown ${isDropdownOpen ? "open" : ""}`}>
              <button onClick={markAllAsRead}>Đánh dấu tất cả là đã đọc</button>
              <button className="close-btn" onClick={closeDropdown}>×</button>
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


          <div className="item" onClick={toggleChatDropdown}>
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            {unreadMessagesCount > 0 && <div className="counter">{unreadMessagesCount}</div>}
          </div>

          {isChatOpen && (
            <div className="chat-dropdown">
              <button className="close-btn" onClick={toggleChatDropdown}>×</button>
                <ul>
                  {messages.map((msg) => (
                    <li
                      key={msg.id}
                      className={`chat-message ${msg.isRead ? "read" : "unread"}`}
                      onClick={() => {
                        markAsRead(msg.id); 
                        showConversation(msg.id); 
                      }}
                    >
                      <img src={msg.avatar} alt={msg.sender} className="avatar" />
                      <div>
                        <div>{msg.sender}</div>
                        <div>{msg.message}</div>
                      </div>
                    </li>
                  ))}
                </ul>
            </div>          
          )}

          {activeConversation && (
            <div className="conversation-view">
              <button className="close-btn" onClick={closeConversation}>×</button>
              <div className="conversation-header">
                <img src={activeConversation.avatar} alt={activeConversation.sender} className="avatar" />
                <span className="sender">{activeConversation.sender}</span>
              </div>
              <div className="conversation-messages">
                {activeConversation.conversation.map((msg, index) => (
                  <div key={index} className={msg.sender === "You" ? "message-you" : "message-other"}>
                    <div className="message">{msg.message}</div>
                  </div>
                ))}
              </div>
              <div className="send-message">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Gửi tin nhắn..."
                />
                <button onClick={sendMessage}>Gửi</button>
              </div>
            </div>
          )}

          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="avatar"
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
