// import { useLocation } from "react-router-dom";
// import AdminSidebar from "../../components/AdminSidebar";
// import { useEffect, useState } from "react";
// const Order = () => {
//     const { state } = useLocation();
//     const orderDetails = state && state.orderDetails;

//     const [selectedOptions, setSelectedOption] = useState({});

//     useEffect(() => {
//         const storedOption = JSON.parse(localStorage.getItem("orderStatus"));
//         setSelectedOption(storedOption || {});
//     }, []);

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'confirm':
//                 return 'green'
//             case 'cancel':
//                 return 'red'
//             case 'delivered':
//                 return 'blue'
//             default: 'black'
//         }
//     }
//     return (
//         <div className="adminContainer">
//             <AdminSidebar />
//             <main>
//                 <div className="order_container_list">
//                     <h2>User Order List</h2>
//                     <h3>ToTal Order{orderDetails.products.length}</h3>
//                     {orderDetails && (
//                         <div className="order_details">
//                             <h3>Order Summary</h3>
//                             <p className="bold">Name: <span>{orderDetails.user.name}</span></p>
//                             <p>Email: <span>{orderDetails.user.email}</span></p>
//                             <p>Shipping Address: <span>{orderDetails.user.address}</span></p>
//                             <p>Pincode: <span>{orderDetails.user.pincode}</span></p>

//                             <h4>Products Details:</h4>

//                             <div className="confirm_order_details">
//                                 {
//                                     orderDetails.products.map((product) => (
//                                         <div key={product.id} className="allData_container">
//                                             <img src={`http://localhost:8080/Images/${product.photo}`} alt="" />
//                                             <div className="userDetails">
//                                                 <p>UserId : {product._id}</p>
//                                                 <p> {product.name} - {product.quantity} x ₹{product.price}</p>
//                                             </div>
//                                             <div>
//                                                 <td style={{ fontWeight: "700", color: getStatusColor(selectedOptions[product._id] || 'select') }}>
//                                                     {selectedOptions[product._id] || 'Select'}
//                                                 </td>
//                                             </div>
//                                         </div>
//                                     ))
//                                 }
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </main>
//         </div>
//     )
// }

// export default Order

import { useLocation } from "react-router-dom"
import AdminSidebar from "../../components/AdminSidebar";
import { useEffect, useState } from "react";

const Order = () => {
    const { state } = useLocation();
    const orderDetails = state && state.orderDetails;
    const [selectedOptions, setSelectedOption] = useState({});

    useEffect(() => {
        const storedOption = JSON.parse(localStorage.getItem("orderStatus"));
        setSelectedOption(storedOption || {});
    }, []);

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
                                            <td style={{ fontWeight: "700", color: getStatusColor(selectedOptions[product._id] || 'select') }}>
                                                {selectedOptions[product._id] || 'Select'}
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