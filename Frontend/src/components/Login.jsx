import { useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function Login() {
    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = () => {

        if (!email || !password) {
            toast.warn('Missing Fields', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    color: "red",
                },
                progressStyle: {
                    background: "red", // Style for the progress bar
                },
                className: 'toast-warning', // Apply a class for the toast content
                icon: '❌', // Set a red icon
            });
        } else {
    
            axios.post("http://localhost:4004/login",{
                email:email,
                password:password
            })
            .then((res) => {
                if(res.status === 200) {
                    toast.success('Logged In successfuly', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    return Promise.reject("Some error occured")
                }
            })
            .catch((err) => {
                toast.warn('Incorrect Password or some error occured', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {
                        color: "red",
                    },
                    progressStyle: {
                        background: "red",
                    },
                    className: 'toast-warning', 
                    icon: '❌',
                });
                
            })
        }
    }
    



    return (
        <div className="signup-card">
            <input type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
            <ToastContainer></ToastContainer>
        </div>

    )
}