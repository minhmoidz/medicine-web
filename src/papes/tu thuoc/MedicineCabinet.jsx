import "./medicineCabinet.scss"
import Siderbar from "../../components/siderbar/Siderbar.jsx"
import Navbar from "../../components/navbar/Navbar.jsx"
import Datatable from "../../components/tableUser/TableUser.jsx"

const MedicineCabinet = () => {
  
  return (
    <div className="list">
      <Siderbar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default MedicineCabinet;