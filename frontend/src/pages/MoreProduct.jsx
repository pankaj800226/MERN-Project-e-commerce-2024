import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const MoreProduct = () => {
    const [showData, setShowData] = useState([])
    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState([0, 150000])

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
        axios.post('http://localhost:8080/showData')
            .then((result) => {
                setShowData(result.data)
            })
            .catch(err => console.log(err))
            
    }, [])

    //search function logic
    const filterData = showData.filter(data =>
        data.name.toLowerCase().includes(search.toLowerCase()) &&
        (!selectedCategory || data.categori === selectedCategory) &&
        data.price >= priceRange[0]
    )


    return (
        <>
            <div className="more_product_container">
                <h4>Filter Section</h4>
                <div className="search_filter">
                    <p>Search</p>
                    <input type="text" placeholder="Search"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                </div>

                <div className="category">
                    <p>Categori</p>
                    <select onChange={(e) => setSelectedCategory(e.target.value)}
                        value={selectedCategory}
                    >
                        <option value="">All</option>

                        {
                            categories.map((category) => (
                                <option key={category}>
                                    {category}
                                </option>
                            ))
                        }

                    </select>
                </div>

                <div className="price_Range">
                    <p>Price Range</p>
                    <input type="range"
                        min='0'
                        max='150000'
                        onChange={(e) => setPriceRange([parseInt(e.target.value,)])}
                        value={priceRange[0]}
                        title={priceRange[0]}
                    />
                </div>
            </div>

            {/*  all product show */}

            <div className="home">
                {
                    filterData.length === 0 ? (
                        <div>
                            <h2 style={{ textAlign: "center", marginTop: "3rem" }}> 🙃 Item Not yet  🙃</h2>

                        </div>
                    ) : (

                        filterData.map((product) => (
                            <>
                                <Link to={`/allproduct/${product._id}`}>
                                    <div className="home_section" key={product.id}>
                                        <div>
                                            <img src={`http://localhost:8080/Images/${product.photo}`} alt="" />
                                        </div>
                                        <h2>{product.name}</h2>
                                        <p>₹{product.price}</p>
                                        <div className="AddCart_btn">

                                        </div>

                                    </div>
                                </Link>

                            </>

                        )

                        ))
                }
            </div>
        </>
    )
}

export default MoreProduct