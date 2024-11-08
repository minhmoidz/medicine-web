import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "../src/papes/home/Home.jsx";
import Single from "../src/papes/single/Single.jsx";
import New from "../src/papes/new/New.jsx";
import List from "../src/papes/list/List.jsx"
import DrugEntry from "../src/papes/nhapthuoc/DrugEntry.jsx"
import MedicineCabinet from "../src/papes/tu thuoc/MedicineCabinet.jsx"
import Inventory from "../src/papes/tonkho/Inventory.jsx"
import Login from "../src/papes/login/Login.jsx"
import DrugExport from "../src/papes/xuatthuoc/DrugExport.jsx"
import EmployeeManagement from "../src/papes/nhanvien/EmployeeManagement.jsx"
import { useContext } from "react";
import { DarkModeContext } from "../src/context/darkModeContext";
import { productInputs, userInputs } from "../formSource.jsx";
import "../src/style/dark.scss"


function App(){
  const { darkMode } = useContext(DarkModeContext);
    return (
      <>
        <div className={darkMode ? "app dark" : "app"}>
          <Router>
            <Routes>
              <Route path="/">
                <Route index element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/users">
                  <Route index element={<List/>}/>
                  <Route path=":userId" element={<Single/>}/>
                  <Route path="new" element={<New inputs={userInputs} title="Add New User" />}/>
                </Route>
                <Route path="/products">
                  <Route index element={<MedicineCabinet/>}/>
                  <Route path=":productId" element={<Single/>}/>
                  <Route path="new" element={<New inputs={productInputs} title="Add New Product" />}/>
                </Route>
                <Route path="/login">
                  <Route index element={<Login/>}/>
                  <Route path=":forgot" element={<Single/>}/>
                  <Route path="sign" element={<New inputs={productInputs} title="Add New Product" />}/>
                </Route>
                <Route path="/phieunhap" element={<DrugEntry/>}/>
                <Route path="/tuthuoc" element={<MedicineCabinet/>}/>
                <Route path="/khothuoc" element={<Inventory/>}/>
                <Route path="/xuatthuoc" element={<DrugExport/>}/>
                <Route path="/nhanvien" element={<EmployeeManagement/>}/>
              </Route>
            </Routes>
          </Router>
        </div>
      </>
    );
  }
  
export default App