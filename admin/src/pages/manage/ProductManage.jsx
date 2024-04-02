import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { FiEdit2 } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import axios from "axios";
import { toast } from 'react-toastify'
import { Link } from "react-router-dom";

const ProductManage = () => {
    const [showData, setShowData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios.post('http://localhost:8080/showData')
            .then((result) => setShowData(result.data))
            .catch(err => console.log(err));
    }, [showData]);

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:8080/delete/${id}`)
            .then((result) => {
                console.log(result);
            })

        toast.error('Product deleted', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })

            .catch(err => console.log(err));
    }



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
                                    <th>Edit</th>
                                    <th>Delete</th>
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

                                            <td><Link style={{ color: 'black', }} to={`/edit/${data._id}`}><FiEdit2 title="Edit" /></Link></td>

                                            <td ><MdDelete className="removeProduct" onClick={() => deleteHandler(data._id)} title="Delete" /></td>
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
