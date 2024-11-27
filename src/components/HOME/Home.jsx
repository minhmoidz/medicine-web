import Widget from "../../components/widget/Widget.jsx";
import Featured from "../../components/featured/Featured.jsx";
import Chart from "../../components/chart/Chart.jsx";
import Table from "../../components/table/Table.jsx";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
        </div>
        <div className="listContainer">
          <div className="listTitle">Hóa đơn giao dịch </div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
