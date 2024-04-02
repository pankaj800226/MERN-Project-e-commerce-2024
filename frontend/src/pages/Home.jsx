import axios from "axios"
import { useEffect, useState } from "react"
import Banner from "./Banner"
// import { FaCirclePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Home = () => {
  const [showData, setShowData] = useState([])
  useEffect(() => {
    axios.post('http://localhost:8080/showData',)
      .then((result) => {
        setShowData(result.data)
      })
      .catch(err => console.log(err))

  }, [])


  const maxProductsToShow = 8;
  const limitedFilterData = showData.slice(0, maxProductsToShow)



  return (
    <>
      <Banner />
      <div className="more">
        <p>Popular Product</p>
        <Link to={'/more'}>More</Link>
      </div>
      <div className="home">
        {
          limitedFilterData.length === 0 ? (
            <div>
              <h2 style={{ textAlign: "center", marginTop: "3rem" }}> 🙃 Item Not yet  🙃</h2>
            </div>
          ) : (

            limitedFilterData.map((product) => (
              <>
                <Link to={`/allproduct/${product._id}`}>
                  <div className="home_section" key={product.id}>
                    <div>
                      <img src={`http://localhost:8080/Images/${product.photo}`} alt="" />
                    </div>
                    <h2>{product.name}</h2>
                    <p>₹{product.price}</p>
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

export default Home