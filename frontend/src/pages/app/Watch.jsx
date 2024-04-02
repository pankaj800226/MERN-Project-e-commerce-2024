import { useEffect, useState } from "react"
import AdminSidebar from "../../components/AdminSidebar"

const Watch = () => {

    const [time, setTime] = useState(new Date())

    useEffect(() => {

        const interval = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(interval)

    }, [])

    return (
        <div className="adminContainer">
            <AdminSidebar />
            <main>
                <h2
                style={{
                    padding:'10px',
                    letterSpacing:'1px',
                }}
                >Digital Watch</h2>
                <div

                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '80vh',
                    }}
                >
                    <h2
                        style={{

                            backgroundColor: 'rgba(44, 104, 255)',
                            color: 'white',
                            borderRadius: '10px',
                            padding: '1rem',
                            cursor: 'pointer',
                        }}
                    >{time.toLocaleTimeString()}</h2>
                </div>
            </main>
        </div>
    )
}

export default Watch