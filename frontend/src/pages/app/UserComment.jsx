import { useState } from "react"
import AdminSidebar from "../../components/AdminSidebar"
import { toast } from "react-toastify"
import axios from "axios"

const UserComment = () => {

    const [comment, setComment] = useState('')
    const handleAdd = async (e) => {
        e.preventDefault()
        if (comment !== '') {
            try {
                await axios.post('http://localhost:8080/feedback', { comment })
                    .then(response => console.log(response))
                    .catch(err => console.log(err))
                toast.success('Comment added successfully')
            } catch (error) {
                console.log(error);
            }

        } else {
            toast.error('Please enter a comment', {
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

        setComment('')

    }


    return (
        <div className="adminContainer">
            <AdminSidebar />
            <main>
                <p className="comment_text">Please enter your feedback and complain !</p>
                <div className="comment_container">
                    <form onSubmit={handleAdd}>
                        <textarea cols="30" rows="10"
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            placeholder="Your_Comments !"
                        ></textarea>
                        <button type="submit">Send Comment</button>
                    </form>
                </div>



            </main>
        </div>
    )
}

export default UserComment