import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { auth, } from "../firebase/firebase"
import { FaEye } from "react-icons/fa6"
import { FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hide, setHide] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (email === "" || password === "") {
      toast.error('All fields are required')
    }

    try {
      const users = await signInWithEmailAndPassword(auth, email, password);
      await localStorage.setItem('user', JSON.stringify(users))
      toast.success("Login successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      navigate('/')

    } catch (error) {
      console.log(error);
      toast.error('login failed',)
    }
  }

  const forgetPassword = async () => {

    try {
      await sendPasswordResetEmail(auth, email)
      toast.success("successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } catch (error) {
      console.log(error);
      toast.error('password reset error',)
    }

  }

  const hideShowHandler = () => {
    setHide(!hide)
  }

  return (
    <div className="contact_container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>

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
          <button type='submit'>Login</button>
          <span><Link to="/register">Login</Link></span>
          <span onClick={forgetPassword}>Forget Password</span>
        </div>
      </form>
    </div>
  )
}

export default Login