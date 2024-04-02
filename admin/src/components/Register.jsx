import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, } from "../firebase/firebase"
import { FaEye, } from "react-icons/fa6"
import { FiEyeOff } from "react-icons/fi";
const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hide, setHide] = useState(false)
  const navigate = useNavigate()
  const registerHandle = async (e) => {
    e.preventDefault()
    if (email === "" || password === "") {
      toast.error('All fields are required')
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      toast.success("User created successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      navigate('/login')
      setEmail('')
      setPassword('')
    } catch (error) {
      console.log(error);
      toast.error('User exiting')
    }
  }

  const hideShowHandler = () => {
    setHide(!hide)
  }
  return (
    <div className="contact_container">
      <form onSubmit={registerHandle}>
        <h2>Signup</h2>

        <div className="form-group">

        </div>

        <div className="form-group">
          <input type="text" placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="form-group">
          <input type={hide ? 'text' : 'password'} placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <label onClick={hideShowHandler}>{hide ? <FaEye /> : <FiEyeOff />}</label>
        </div>

        <div className="form-group">
          <button type='submit'>Register</button>
          <span>
            Already have an account? <Link to="/login">Login</Link></span>
        </div>
      </form>
    </div>
  )
}

export default Register