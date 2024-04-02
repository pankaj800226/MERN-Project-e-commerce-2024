import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FaCirclePlus } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { RiDislikeFill } from "react-icons/ri";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from 'react-redux'
import { toast } from "react-toastify";

const ProductAllData = () => {
    const { id } = useParams()
    const [productAddData, setPeoductAddData] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        try {
            axios.post(`http://localhost:8080/redirect/${id}`)
                .then((result) => setPeoductAddData(result.data))
                .catch((err) => console.log(err))

        } catch (error) {
            console.log(error);
        }
    }, [id])

    // like 
    const handleLike = async () => {
        try {
            const res = await axios.post(`http://localhost:8080/like/${id}`)
            setPeoductAddData(prevData => ({
                ...prevData,
                likes: res.data.likes

            }))
        } catch (error) {
            console.log(error);
        }
    }
    // unlike 
    const handleUnlike = async () => {
        try {
            const res = await axios.post(`http://localhost:8080/unlike/${id}`)
            setPeoductAddData(prevData => ({
                ...prevData,
                likes: res.data.likes

            }))
        } catch (error) {
            console.log(error);
        }
    }


    const addToCartHandler = (item) => {
        try {
            if (item.stock > 0) {
                dispatch(addToCart(item));
                toast.success('🦄 Wow AddToCart!', {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error('Out Of Stock', {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <>
            <div className="procuct_card_container">
                <div className="image_container_left">
                    <img src={`http://localhost:8080/Images/${productAddData.photo}`} alt="" />

                </div>
                <div className="right_content">
                    <div className="product_name">
                        <h2>{productAddData.name}</h2>
                    </div>
                    <div className="product_price">
                        <h4>₹{productAddData.price}</h4>
                    </div>

                    <div className="like">
                        <FcLike title="like" onClick={handleLike} />
                        <p>Likes : {productAddData.likes}</p>
                        <RiDislikeFill onClick={handleUnlike} />
                    </div>

                    <div className="product_quantity">
                    </div>
                    <div className="product_discription">
                    </div>
                    <div className="product_btn">
                        <button onClick={() => addToCartHandler(productAddData)}><FaCirclePlus /></button>

                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductAllData