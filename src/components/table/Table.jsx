import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 1143155,
      product: "Thuốc bộ thận ",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Minh Tuấn Trần",
      date: "Tháng 9",
      amount: 785,
      method: "Ngân hàng",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "Thuốc sổ",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Nguyễn Văn Á",
      date: "Tháng 6",
      amount: 900,
      method: "Thẻ tín dụng",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "Thuốc tăng cường sinh lý",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Văn B",
      date: "Tháng 4",
      amount: 35,
      method: "Momo",
      status: "Đang chờ",
    },
    {
      id: 2357741,
      product: "Bổ dược gan",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Văn C",
      date: "Tháng 10",
      amount: 920,
      method: "ZaloPay",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "Thuốc cảm",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Văn C",
      date: "Tháng 12",
      amount: 2000,
      method: "Ngân hàng",
      status: "Pending",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID thuốc</TableCell>
            <TableCell className="tableCell">Tên thuốc</TableCell>
            <TableCell className="tableCell">Tên tài khoản đặt mua</TableCell>
            <TableCell className="tableCell">Hạn sử dụng</TableCell>
            <TableCell className="tableCell">Số lượng </TableCell>
            <TableCell className="tableCell">Loại thanh toán</TableCell>
            <TableCell className="tableCell">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
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
  );
};

export default List;