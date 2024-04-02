import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import axios from "axios";

const ProductManage = () => {
    const [showData, setShowData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios.post('http://localhost:8080/showData')
            .then((result) => setShowData(result.data))
            .catch(err => console.log(err));
    }, [showData]);

    const filteredData = showData.filter(data =>
        data.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="adminContainer">
                <AdminSidebar />
                <main>
                    <div className="manage_container">
                        <div className="search_baar">
                            <div className="bar">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <img src='userprofile.jpg' alt="" />
                            </div>


                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan="6">Data Not Found</td>
                                    </tr>
                                ) : (
                                    filteredData.map((data) => (
                                        <tr key={data._id}>
                                            <td><img src={`http://localhost:8080/Images/${data.photo}`} alt="" /></td>
                                            <td>{data.name.substring(0, 20)}</td>
                                            <td>₹{data.price}</td>
                                            <td>{data.stock}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </>
    );
}

export default ProductManage;
