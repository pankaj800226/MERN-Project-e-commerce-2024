import { Link, useNavigate } from "react-router-dom"
import { MdDashboard } from 'react-icons/md'
import { useEffect, useState } from "react"
import { CgProfile } from 'react-icons/cg'
import { HiMenuAlt4 } from 'react-icons/hi'
import { MdWatchLater } from 'react-icons/md'
import { useSelector } from "react-redux"
import { FaCar } from "react-icons/fa6"
import { FaComment } from "react-icons/fa"


const AdminSidebar = () => {
    // const CartItem = useSelector((state) => state.cart.items)
    const { items } = useSelector((state) => state.cart)
    const navigate = useNavigate()


    const [show, setShow] = useState(false)
    const [phoneActive, setPhoneActive] = useState(
        window.innerWidth < 1100
    )

    const resizeHandle = () => {
        setPhoneActive(window.innerWidth < 1100)
    };

    useEffect(() => {
        window.addEventListener("resize", resizeHandle);
        return () => {
            window.removeEventListener("resize", resizeHandle);

        }
    }, [])

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        address: "",
    });

    useEffect(() => {
        const userSave = localStorage.getItem('userDetails')
        if (userSave) {
            setUserData(JSON.parse(userSave))
        }
    }, [])

    const handleCheckout = () => {
        const orderDetails = {
            user: userData,
            products: items,
        };
        navigate("/order", { state: { orderDetails } });
    };

    return (
        <>
            {phoneActive && (
                <button id="hambuger" onClick={() => setShow(true)}>
                    <HiMenuAlt4 />
                </button>
            )}
            <aside
                style={

                    phoneActive ? {
                        width: "20rem",
                        height: "100vh",
                        position: "fixed",
                        top: 0,
                        left: show ? 0 : "-20rem",
                        transition: "all 0.5s",
                    }
                        : {}
                }
            >

                <h2>N Shop</h2>
                <div>
                    <h5>Dashboard</h5>
                    <ul>
                        <li
                            style={{
                                backgroundColor: location.pathname.includes("/dashboard")
                                    ? "rgba(0, 115,255,0.1)"
                                    : "#eee",
                            }}
                        >
                            <Link to="/dashboard">
                                <MdDashboard />
                                DashBoard
                            </Link>
                        </li>
                        <li
                            style={{
                                backgroundColor: location.pathname.includes("/manage")
                                    ? "rgba(0, 115,255,0.1)"
                                    : "#eee",
                            }}
                        >
                            <Link to="/manage">
                                <CgProfile />
                                ProductManage
                            </Link>
                        </li>

                        <li
                            style={{
                                backgroundColor: location.pathname.includes("/order")
                                    ? "rgba(0, 115,255,0.1)"
                                    : "#eee",
                                display: "flex",
                                alignItems: 'center',
                                paddingLeft: 10,
                                gap: "10px",
                                cursor: "pointer",
                            }}
                        >


                            <span
                                style={{ marginTop: "5px" }}
                            ><FaCar /></span> <span style={{ cursor: "pointer" }} onClick={handleCheckout}>Order</span>
                        </li>



                    </ul>
                </div>

                {/* second  */}

                <div>
                    <h5>App</h5>
                    <ul>
                        <li
                            style={{
                                backgroundColor: location.pathname.includes("/watch")
                                    ? "rgba(0, 115,255,0.1)"
                                    : "#eee",
                            }}
                        >
                            <Link to="/watch">
                                <MdWatchLater />
                                Watch
                            </Link>
                        </li>

                        <li
                            style={{
                                backgroundColor: location.pathname.includes("/comment")
                                    ? "rgba(0, 115,255,0.1)"
                                    : "#eee",
                            }}
                        >
                            <Link to="/comment">
                                <FaComment />
                                Your_Feedback
                            </Link>
                        </li>

                    </ul>
                </div>

                {phoneActive && (
                    <button id="close_sidebar" onClick={() => setShow(false)}>Close</button>
                )}


            </aside>
        </>
    )
}

export default AdminSidebar