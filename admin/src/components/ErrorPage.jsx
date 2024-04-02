import { Link } from "react-router-dom"

const ErrorPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        flexDirection: "column"
      }}
    ><h2>Page Not Found </h2>
      <div>
        <Link
          to='/'>
          <button
            style={{
              background: 'black',
              color: 'white',
              padding: '1rem 4rem',
              fontSize: '1rem',
              marginTop: '2rem',
              outline: 'none',
              border: 0,
              borderRadius: "10px",
              cursor: "pointer",
            }}>Go-Back </button></Link>
      </div>

    </div>
  )
}

export default ErrorPage