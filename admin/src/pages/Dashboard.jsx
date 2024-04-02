import { useEffect, useState } from "react"
import AdminSidebar from "../components/AdminSidebar"
import axios from "axios"
import { FaCirclePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

const Dashboard = () => {

    const [showData, setShowData] = useState([])
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalStock, setTotalStock] = useState(0)
    const CartItem = useSelector((state) => state.cart.items)


    useEffect(() => {
        axios.post('http://localhost:8080/showData')
            .then((result) => {
                setShowData(result.data)

                const totalPrice = result.data.reduce((account, product) => {
                    return account + product.price;
                }, 0)
                setTotalPrice(totalPrice)

                const totalstocks = result.data.reduce((account, product) => {
                    return account + product.stock
                }, 0)
                setTotalStock(totalstocks)

            }).catch(err => console.log(err));
    }, [])



    return (
        <div className="adminContainer">
            <AdminSidebar />
            <main>
                <div className="dashboard">
                    <div className="bar">
                        {/* <h2>THIS IS A FULL STACK - N-SHOP APPLICATION </h2> */}
                        <input type="text" placeholder="Search" />
                        <Link style={{ color: "black" }} className="upload_baar" to='/upload'><FaCirclePlus title="Add Product" /></Link>
                    </div>
                </div>

                <div className="user_section_bar">
                    <div className="section_bar" title={`Total Price : ${totalPrice}`}
                        style={{
                            backgroundColor: '#ffc300',
                            width: "180px",
                            height: " 180px",
                            borderRadius: "50%",
                        }}
                    >
                        <div>

                            <h2>Total Product Price</h2>
                            <p>₹{totalPrice}</p>
                        </div>

                    </div>

                    <div className="section_bar" title={`Total Product : ${showData.length}`}
                        style={{
                            backgroundColor: '#ff5733',
                            width: "180px",
                            height: " 180px",
                            borderRadius: "50%",
                            color: "whitesmoke"

                        }}
                    >
                        <div>
                            <h2>Total Product</h2>
                            <p>{showData.length}</p>
                        </div>
                    </div>

                    <div className="section_bar" title={`Product Stock available : ${totalStock}`}
                        style={{
                            backgroundColor: '#c70039',
                            width: "180px",
                            height: " 180px",
                            borderRadius: "50%",
                            color: "whitesmoke"

                        }}
                    >
                        <div>
                            <h2>Stock available</h2>
                            <p>{totalStock}</p>

                        </div>
                    </div>

                    <div className="section_bar" title={`Total Order : ${CartItem.length}`}
                        style={{
                            backgroundColor: 'salmon',
                            width: "180px",
                            height: " 180px",
                            borderRadius: "50%",


                        }}
                    >
                        <div>
                            <h2>Total Order</h2>
                            <p>{CartItem.length}</p>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard