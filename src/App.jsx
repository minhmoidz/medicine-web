import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/papes/home/Home.jsx";
import Single from "../src/papes/single/Single.jsx";
import New from "../src/papes/new/New.jsx";
import List from "../src/papes/list/List.jsx";
import DrugEntry from "../src/papes/nhapthuoc/DrugEntry.jsx";
import MedicineCabinet from "../src/papes/tu thuoc/MedicineCabinet.jsx";
import Inventory from "../src/papes/tonkho/Inventory.jsx";
import Login from "../src/papes/login/Login.jsx";
import DrugExport from "./papes/xuatthuoc/DrugExport.jsx";
import Canhan from "../src/papes/canhan/canhan.jsx"
import ThongBao from "../src/papes/thongbao/Thongbao.jsx";
import Lich from "../src/papes/Lich/Lich.jsx"
import DrugExport1 from "./papes/xuatthuoc/DrugExport.jsx"
import { useContext } from "react";
import { DarkModeContext } from "../src/context/darkModeContext";
import { productInputs, userInputs } from "../formSource.jsx";
import "../src/style/dark.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import css cho react-toastify


function App() {
  const { darkMode } = useContext(DarkModeContext);

  const notify = () => {
    toast("Bạn có thông báo mới!");
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="/products">
              <Route index element={<MedicineCabinet />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="/phieunhap" element={<DrugEntry />} />
            <Route path="/tuthuoc" element={<MedicineCabinet />} />
            <Route path="/khothuoc" element={<Inventory />} />
            <Route path="/xuatthuoc" element={<DrugExport1/>} />
            <Route path="/canhan" element={<Canhan/>} />
            <Route path="/thongbao" element={<ThongBao/>} />
            <Route path="/lich" element={<Lich/>} />
          </Route>
        </Routes>
      </Router>
      {/* Thêm ToastContainer để quản lý các thông báo */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;