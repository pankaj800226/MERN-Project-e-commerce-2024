import { useLocation } from "react-router-dom"
import AdminSidebar from "../../components/AdminSidebar";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { removeItem } from '../../redux/cartSlice'

const Order = () => {
    const { state } = useLocation();
    const dispatch = useDispatch()

    const orderDetails = state && state.orderDetails;
    const [selectedOptions, setSelectedOption] = useState({});

    useEffect(() => {
        const storedOption = JSON.parse(localStorage.getItem("orderStatus"));
        setSelectedOption(storedOption || {});
    }, []);



    const handleOptionChange = (orderId, option) => {
        // You can implement logic here to handle the selected option
        setTimeout(() => {
            setSelectedOption(prevOPtion => ({
                ...prevOPtion,
                [orderId]: option
            }));
        }, 1000)

        localStorage.setItem("orderStatus", JSON.stringify({
            ...selectedOptions,
            [orderId]: option
        }))
    };

    const orderDetailsStatus = [
        "cancel",
        "confirm",
        "delivered",
    ]

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirm':
                return 'green'
            case 'cancel':
                return 'red'
            case 'delivered':
                return 'blue'
            default: 'black'
        }
    }

    const deleteProductHandler = (itemId) => {
        dispatch(removeItem(itemId))
    }
    return (
        <div className="adminContainer">
            < AdminSidebar />
            <main>
                <div className="upload_container">
                    <div className="left_section">
                        <h1>Shipping Info</h1>
                        {
                            orderDetails && (
                                <div>
                                    <h2>Name: {orderDetails.user.name}</h2>
                                    <p>Email : {orderDetails.user.email}</p>
                                    <p>Number : {orderDetails.user.number}</p>
                                    <p>Pincode : {orderDetails.user.pincode}</p>
                                    <p>Addresh : {orderDetails.user.addresh}</p>
                                </div>

                            )
                        }

                    </div>
                    <div className="upload_section">
                        <h3>Product Order List</h3>
                        <h3>ToTal Products : {orderDetails.products.length}</h3>
                        <div className="order_product">
                            {
                                orderDetails.products.map((product) => (
                                    <div key={product.id} className="allData_container">
                                        <img src={`http://localhost:8080/Images/${product.photo}`} alt="" />
                                        <div className="userDetails">
                                            <p>UserId : {product._id}</p>
                                            <p> {product.name} - {product.quantity} x ₹{product.price}</p>
                                        </div>

                                        <div>
                                            {/*order  status color  */}
                                            <select className="orderOption" value={selectedOptions[product._id]} onChange={(e) => handleOptionChange(product._id, e.target.value)}>
                                                <option value="">Select</option>
                                                {
                                                    orderDetailsStatus.map((option) => (
                                                        <option key={option.id}>{option}</option>
                                                    ))
                                                }
                                            </select>

                                            <td style={{ fontWeight: "700", color: getStatusColor(selectedOptions[product._id] || '') }}>
                                                {selectedOptions[product._id] || 'Select'}
                                                <button onClick={() => deleteProductHandler(product._id)}>Remove</button>
                                            </td>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}

export default Order
