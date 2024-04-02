import { useSelector, useDispatch } from "react-redux"
import { decrement, increment, removeItem } from '../redux/cartSlice'
// import { useNavigate } from "react-router-dom"
import { AiFillDelete } from "react-icons/ai"
import { toast } from "react-toastify"
// import Checkout from "./Checkout"
import { Link } from "react-router-dom"


const Cart = () => {
  const { items } = useSelector((state) => state.cart)
  const dispatch = useDispatch()


  // const navigate = useNavigate();
  // delete from cart
  const removeItems = (itemId) => {
    dispatch(removeItem(itemId))
    toast.success('Cart removed successfully', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }


  // increment items
  const incrementHandle = (itemId, stock) => {
    const checkStock = items.find(item => item._id === itemId)
    if (checkStock && checkStock.quantity < stock) {
      dispatch(increment(itemId))
    } else {
      toast.error('Stock not available please wait some days ', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }

  // decrement items

  const decrementHandle = (itemId) => {
    dispatch(decrement(itemId))
  }

  const calculatePrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }


  return (
    <>

      <div className="cart-container">

        {
          items.length > 0 ? (
            items.map((product) => (
              <div className="product-item" key={product.id}>
                <img src={`http://localhost:8080/Images/${product.photo}`} alt="" />
                <div className="product-details">
                  <div className="product-title">{product.name}</div>
                  <p>₹{product.price}</p>
                </div>
                <div className="btn">
                  <button onClick={() => decrementHandle(product._id)}>-</button>
                  <p>{product.quantity}</p>
                  <button onClick={() => incrementHandle(product._id, product.stock)}>+</button>
                  <button onClick={() => removeItems(product._id)}>
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h1 className='foundData'>No item yet</h1>
          )
        }

        <p>Total Items : {items.length}</p>
      </div>

      {/* <Checkout cartItems={items} /> */}
      <div className="total_amount">
        <p>Total :₹ {calculatePrice()}</p>
        <div className="checkout_btn">
          <Link to={'/checkout'}>Buy Now</Link>
        </div>
      </div>

    </>
  )
}

export default Cart

