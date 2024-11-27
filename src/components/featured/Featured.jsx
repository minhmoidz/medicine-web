import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import Chart from "../chart/Chart"; // Import component Chart

const Featured = () => {
  return (
    <div className="featured-container">
      {/* Khung trái - Thông tin chi tiết */}
      <div className="featured-box details-container">
        <div className="top">
          <h1 className="title">Lượng thuốc xuất kho</h1>
          <MoreVertIcon fontSize="small" />
        </div>
        <div className="bottom">
          <div className="featuredChart">
            <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
          </div>
          <p className="title">Lượng thuốc xuất kho</p>
          <p className="amount">
            Tăng <strong>420</strong> tổng chỉ tiêu
          </p>
          <p className="desc">
            Xử lý giao dịch trước đó. Các khoản thanh toán cuối cùng có thể không
            được bao gồm.
          </p>
          <div className="summary">
            <div className="item">
              <div className="itemTitle">Mục tiêu</div>
              <div className="itemResult negative">
                <KeyboardArrowDownIcon fontSize="small" />
                <div className="resultAmount">$12.4k</div>
              </div>
            </div>
            <div className="item">
              <div className="itemTitle">Tuần trước</div>
              <div className="itemResult positive">
                <KeyboardArrowUpOutlinedIcon fontSize="small" />
                <div className="resultAmount">300k</div>
              </div>
            </div>
            <div className="item">
              <div className="itemTitle">Tháng trước</div>
              <div className="itemResult positive">
                <KeyboardArrowUpOutlinedIcon fontSize="small" />
                <div className="resultAmount">150</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Khung phải - Biểu đồ */}
      <div className="featured-box chart-container">
        <div className="top">
          <h1 className="title">Biểu đồ lượng thuốc tiêu thụ</h1>
          <MoreVertIcon fontSize="small" />
        </div>
        <div className="bottom">
          <Chart aspect={2} title="" />
        </div>
      </div>
    </div>
  );
};

export default Featured;
