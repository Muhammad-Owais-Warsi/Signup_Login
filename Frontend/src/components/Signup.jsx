import { useState } from "react";
import axios from "axios"
import "../styles/signup.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";







export default function Signup() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {

        if (!username || !email || !password) {
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
                    background: "red", 
                },
                className: 'toast-warning', 
                icon: '❌', 
            });

        } else {
            axios.post("http://localhost:4004/register", {
                username: username,
                email: email,
                password: password
            })

                .then((res) => {
                    if(res.status === 200) {
                        toast.success('Signed Up Successfuly', {
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
                        return Promise.reject("User already exist")
                    }
                })
                .catch((err) => {

                    toast.warn('User already exist or some error occured', {
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



                });
        }


    }


    return (
        <div className="signup-card">
            <input id="username" type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input id="email" type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input id="password" type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
            <ToastContainer></ToastContainer>
        </div>

    )
}