import "./canhan.scss";
import Siderbar from "../../components/siderbar/Siderbar.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapLocationDot, faPhone,faUserGraduate,faSchool,faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const Canhan = () => {
  const pieData = [
    { name: 'Online Sales', value: 40 },
    { name: 'In-store Sales', value: 35 },
    { name: 'Consultations', value: 25 }
  ];

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56'];

  return (
    <div className="inventory">
      <Siderbar />
      <div className="container">
        <Navbar />
        <div className="layout">
          <div className="content-wrapper">
            <div className="left-content">
              <section className="Widget_widget">
                <div className="widget Profile_profile" style={{ height: '100%', padding: '20px' }}>
                  <div>
                    <img
                      src="https://scontent.fhan19-1.fna.fbcdn.net/v/t1.6435-9/52788164_102737184219239_4280200747464785920_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEMT1Q5xje3Tvf-Tgn03wf2Mxr0kEklnkczGvSQSSWeR8Z9qoSJxSMtls88z7Hc9WXaLoPqiUbICdLaNO4pE2aJ&_nc_ohc=kD2UUwDYGDsQ7kNvgFb8aaM&_nc_zt=23&_nc_ht=scontent.fhan19-1.fna&_nc_gid=AUj11h2LIcRRYsAd7mls8iU&oh=00_AYC-lP91t_XLT6nwSivVgbvXufkLDWmibGpqCkYg3oLdjQ&oe=6758E5C2"
                      style={{ borderRadius: '50%', display: 'block', margin: '0 auto', marginTop:"15px" }}
                      alt="Profile"
                    />
                    <div className="username ">
                      <p className="headline-1 " style={{ fontWeight: "bold" }}>An Le</p>
                      <p className="between" style={{ marginBottom: "20px" }}>Drug Seller</p>
                    </div>
                    <hr />
                    <div className="profile1" style={{ marginBottom: "20px" }}>
                      <FontAwesomeIcon icon={faEnvelope} style={{ height: "20px", marginRight: "10px" }} />
                      <span>lehaianhp12345@gmail.com</span>
                      <br />
                      <FontAwesomeIcon icon={faMapLocationDot} style={{ height: "20px", marginRight: "10px" }} />
                      <span>Ha Dong District</span>
                      <br />
                      <FontAwesomeIcon icon={faPhone} style={{ height: "20px", marginRight: "10px" }} />
                      <span>0342473236</span>
                      <br />
                    </div>
                    <hr />
                    <div className="profile1" style={{ marginBottom: "20px" }}>
                      <FontAwesomeIcon icon={faUserGraduate} style={{ height: "20px", marginRight: "10px" }} />
                      <span>Graduated with a Bachelor's degree in 2027</span>
                      <br />
                      <FontAwesomeIcon icon={faSchool} style={{ height: "20px", marginRight: "10px" }} />
                      <span>Post and Telecommunications institute of technology</span>
                      <br />
                      <FontAwesomeIcon icon={faUserDoctor} style={{ height: "20px", marginRight: "10px" }} />
                      <span>Started working in 2028</span>
                      <br />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="right-profile" style={{ marginTop: '20px' }}>

              <div className="chart-container">
                <h3>Tần Suất Hoạt Động</h3>
                <PieChart width={450} height={450} >
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>


              <div className="achievements-table" style={{marginTop:"100px"}}>
                <table style={{}}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #ddd'}} >
                      <th style={{ height:'10px'}}>Thành Tựu</th>
                      <th>Ngày</th>
                      <th>Thành tích</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #ddd'}}>
                      <td>Top Sales</td>
                      <td>2024-01-15</td>
                      <td>Bán được nhiều sản phẩm nhất tháng 11</td>
                    </tr>
                    <tr >
                      <td>Employee of the Month</td>
                      <td>2024-03-10</td>
                      <td>Xuất sắc hoàn thành công việc được giao</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canhan;
