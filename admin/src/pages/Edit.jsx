// import { useState } from "react"
import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar"
import axios from 'axios'
import { toast } from 'react-toastify'

import { useNavigate, useParams } from "react-router-dom";
const Edit = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [categori, setCategory] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const { id } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:8080/edit/' + id, { name, price, stock, categori, })
            .then((result) => console.log(result))
            .catch((error) => console.log(error))
        toast.success('Update Successfully')

        setIsLoading(true)
        setTimeout(() => {
            navigate('/manage')
            setIsLoading(false)
        }, 2000)
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
    useEffect(() => {
        axios.post('http://localhost:8080/redirect/' + id)
            .then((resulr) => {
                setName(resulr.data.name)
                setPrice(resulr.data.price)
                setStock(resulr.data.stock)
                setCategory(resulr.data.categori)
            }).catch((error) => console.log(error))
    }, [id])
    return (
        <div className="adminContainer">
            <AdminSidebar />
            <main>
                <div className="upload_container">
                    <div className="left_section">
                        <img src="http://localhost:8080/Images/file_1709104525257.webp" alt="" />
                    </div>
                    <div className="upload_section">
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
                                {/* <input type="text"
                                    onChange={(e) => setCategory(e.target.value)}
                                    value={categori}
                                >

                                </input> */}

                                <select onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Category</option>
                                    {
                                        categories.map((cat) => (
                                            <option key={cat}>{cat}</option>
                                        ))
                                    }
                                </select>
                                <button type="submit" disabled={isLoading}>
                                    {isLoading ? <div className="loader"></div> : "Update"}
                                </button>

                            </div>
                        </form>
                    </div>

                </div>
            </main>
        </div>
    )
}

export default Edit