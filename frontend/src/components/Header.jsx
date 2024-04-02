import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { MdLogout } from 'react-icons/md'
import { FaUserAlt } from 'react-icons/fa'
import { FaShoppingBag, FaSearch } from 'react-icons/fa'
import { useSelector } from "react-redux"
const Header = () => {
    const [show, setShow] = useState(false)
    const CartItem = useSelector((state) => state.cart.items)
    const navigate = useNavigate()
    const dropdownRef = useRef(null)
    const handleShowOpen = () => {
        setShow(prevShow => !prevShow)
    }

    const user = JSON.parse(localStorage.getItem('user'))

    const logout = () => {
        localStorage.clear('user')
        navigate('/login')
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener('mousedown', handleClickOutside)

        return () => {
            window.removeEventListener('mousedown', handleClickOutside)
        }
    })


    return (
        <header>
            <div className="logo">
                <h3><Link to={'/'}>N Shop</Link></h3>
            </div>
            <div className="rightMenu">
                <ul>
                    <li>
                        <Link to="/cart">
                            <FaShoppingBag />
                            <sup>{CartItem.length}</sup>
                        </Link>

                        <Link to="/more">
                            <FaSearch />
                        </Link>
                        <FaUserAlt style={{ cursor: "pointer" }} onClick={handleShowOpen} />
                        {show && (
                            <li
                                ref={dropdownRef}
                                className="dwopsMenu"
                                style={
                                    {
                                        position: "fixed",
                                        right: '0',
                                        background: "#eee",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        margin: "10px",
                                        transition: "all 0.5s",
                                        borderRadius: "5px",

                                    }
                                }
                            >
                                <Link style={{ fontSize: '20px' }} to="/dashboard">User</Link>

                                <button style={{
                                    marginTop: '10px',
                                }} className="logout_btn">
                                    {
                                        user &&
                                        <>
                                            <MdLogout title="Logout" onClick={logout} />
                                        </>

                                    }
                                </button>
                            </li>

                        )}
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header