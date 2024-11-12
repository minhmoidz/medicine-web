import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/siderbar/Siderbar"
import "./Phanhoi.css"
const Phanhoi = ()  =>{
    return (
        <div className="page_phan_hoi">
            <Sidebar/>
            <div className="content">
                <Navbar/>
                <div className="main">
                    <h1 className="title">Phan hoi</h1>
                    <div className="main__nav">
                        <button type="button" class="reload"><span role="img" aria-label="reload" class="anticon anticon-reload"><svg viewBox="64 64 896 896" focusable="false" data-icon="reload" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-.7-8.9-4.9-10.3l-56.7-19.5a8 8 0 00-10.1 4.8c-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4A344.77 344.77 0 01655.9 829c-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27A341.5 341.5 0 01279 755.2a342.16 342.16 0 01-73.7-109.4c-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27a341.5 341.5 0 01109.3 73.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c-.1-6.6-7.8-10.3-13-6.2z"></path></svg></span><span class="span-extend">Tải lại</span></button>
                        <div class="tong">Tổng số:<span>19</span></div>
                        
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th >STT</th>
                                <th>Nguoi gui</th>
                                <th>Tieu de</th>
                                <th>Mo ta</th>
                                <th>Thoi gian gui</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Vo Minh Tri</td>
                                <td>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem recusandae quas, harum minima sunt nobis veniam nulla maxime voluptates doloremque odit repellendus corrupti a, voluptatem nisi temporibus adipisci incidunt.</td>
                                <td>Phan hoi xau</td>
                                <td>12/11/2024</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Vo Minh Tri</td>
                                <td>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem recusandae quas, harum minima sunt nobis veniam nulla maxime voluptates dolor</td>
                                <td>Phan hoi xau</td>
                                <td>12/11/2024</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Vo Minh Tri</td>
                                <td>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem recusandae quas, harum minima sunt no.</td>
                                <td>Phan hoi xau</td>
                                <td>12/11/2024</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Vo Minh Tri</td>
                                <td>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem recusandae quas, harum minima sunt.</td>
                                <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas temporibus eos eius laborum iste molestias, necessitatibus dolores perferendis tenetur quo beatae sed recusandae sit animi magni provident doloremque error nulla.</td>
                                <td>12/11/2024</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Phanhoi