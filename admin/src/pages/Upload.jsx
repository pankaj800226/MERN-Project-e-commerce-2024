// import { useState } from "react"
import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar"
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import img from '../assets/postal.jpg'
const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [file, setFile] = useState()
  const [stock, setStock] = useState('')
  const [categori, setCategory] = useState()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('name', name)
    formData.append('price', price)
    formData.append('file', file)
    formData.append('stock', stock)
    formData.append('categori', categori)

    if (name !== "" && price !== "" && stock !== "" && file !== "" && categori !== "") {
      try {
        axios.post('http://localhost:8080/upload', formData)
          .then((result) => console.log(result))
          .catch((error) => console.log(error))
        toast.success('Upload Successfully')

        setIsLoading(true)
        setTimeout(() => {
          navigate('/manage')
          setIsLoading(false)
        }, 2000)

      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error('All field are required !', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      // alert('All field are required !')


    }
  }

  const categories = [
    'Laptop',
    'Saree',
    'Salwar',
    'cap',
    'Watch',
    'Mobile',
    'Lehenga',
    'ManShoes',
    'ManTShirt',
    'Keyboard',
    'Sandals',
    'Headphones',
  ];
  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main>
        <div className="upload_container">
          <div className="left_section">
            <img src={file ? URL.createObjectURL(file) : img} alt="" />
          </div>
          <div className="upload_section">
            <h3>Manage</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name</label>
                <input type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div>
                <label>Price</label>
                <input type="text"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>

              <div>
                <label>Stock</label>
                <input type="number"
                  onChange={(e) => setStock(e.target.value)}
                  value={stock}
                />
              </div>

              <div>
                <label>Categori</label>
                <select onChange={(e) => setCategory(e.target.value)}>
                  {
                    categories.map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))
                  }
                </select>
              </div>

              <div>
                <label>Photo</label>
                <input type="file"
                  style={{ cursor: "pointer" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <div>
                <button type="submit" disabled={isLoading}>
                  {isLoading ? <div className="loader"></div> : "Upload"}
                </button>
              </div>
            </form>
          </div>

        </div>
      </main>
    </div>
  )
}

export default Upload