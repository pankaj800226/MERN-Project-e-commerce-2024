import { useEffect, useState } from "react"
import AdminSidebar from "../../components/AdminSidebar"
import toast from "react-hot-toast"
import { AiFillDelete } from 'react-icons/ai'

const UserComment = () => {

    const storedTasks = localStorage.getItem("task")
        ? JSON.parse(localStorage.getItem("task")) : []


    const [title, setTitle] = useState('')
    const [task, setTask] = useState(storedTasks)

    console.log(task);

    const handleAdd = (e) => {
        e.preventDefault()
        if (title.trim() !== '') {
            setTask([...task, { title }])
            setTitle('')
            toast.success('Added ')
        } else {
            toast.error('Please enter a title')
        }
    }
    // remove task 
    const handleDelete = (index) => {
        const deleteFilter = task.filter((val, i) => {
            return i !== index
        })

        setTask(deleteFilter)

    }

    useEffect(() => {
        localStorage.setItem("task", JSON.stringify(task))
    }, [task])

    return (
        <div className="adminContainer">
            <AdminSidebar />
            <main>

                <div className="comment_container">
                    <form onSubmit={handleAdd}>
                        <input type="text" placeholder="Your_Comment"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        <button type="submit">Add</button>
                    </form>
                </div>
                <div className="task_diaplay">
                    {
                        task.map((data, index) => (
                            <div key={index} className="all_task_show">
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <p
                                        style={{ fontWeight: '700px' }}
                                    >{data.title}</p>
                                    <AiFillDelete
                                        style={{
                                            fontSize: "1.5rem",
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => handleDelete(index)} />
                                </div>

                            </div>
                        ))
                    }
                </div>


            </main>
        </div>
    )
}

export default UserComment