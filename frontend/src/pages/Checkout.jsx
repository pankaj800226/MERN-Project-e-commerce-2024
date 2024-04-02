import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import axios from 'axios'
const Checkout = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        addresh: "",
        pincode: "",
        number: "",
    });

    const { items } = useSelector((state) => state.cart)
    const navigate = useNavigate();

    useEffect(() => {
        const userSave = localStorage.getItem('userDetails')
        setUserData(JSON.parse(userSave))

    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleCheckout = () => {
        if (userData.name !== "" && userData.email !== "" && userData.address !== "" && userData.number) {

            // axios.get('http://localhost:8080/shippingInfo', { userData })
            //     .then((result) => console.log(result))
            //     .catch((error) => console.log(error))
            // toast.success(' successfully addresh store')

            const orderDetails = {
                user: userData,
                products: items,
            };
            localStorage.setItem("userDetails", JSON.stringify(userData));
            navigate("/order", { state: { orderDetails } });
        }
        else {
            toast.error("Please fill in all required fields.");
        }
    };

    return (
        <>
            <h2 style={{ textAlign: "center", padding: "10px" }}>Shipping Info</h2>
            <div className="checkout-container">
                <div className="user-details">
                    {/* <form> */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={userData.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={userData.email}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="pincode"
                        required
                        placeholder="pincode"
                        value={userData.pincode}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="number"
                        required
                        placeholder="Number"
                        value={userData.number}
                        onChange={handleChange}
                    />
                    <textarea
                        name="addresh"
                        placeholder="Shipping Address"
                        required
                        value={userData.addresh}
                        onChange={handleChange}
                    ></textarea>
                    {/* </form> */}
                </div>
                <div className="order-summary">
                    <h3>Order Summary</h3>
                    <ul>
                        {items.map((product) => (
                            <li key={product.id}>
                                {product.name} - {product.quantity} x ₹{product.price}
                            </li>
                        ))}
                    </ul>
                </div>
                <button onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
        </>
    );
};

export default Checkout;
