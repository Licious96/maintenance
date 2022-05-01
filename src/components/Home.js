import React, { useState, useEffect } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

const Home = () => {

    const navigate = new useNavigate()
    const user_id = sessionStorage.getItem('user_id')
    const [user, setUser] = useState({});

    useEffect(() => {
        
        axios.get(`http://127.0.0.1:8000/api/getUser/${user_id}`)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    setUser(res.data)
                }
            }).catch(err => {
                console.log(err)
            });
    }, [user_id])

    const logout = () => {
        sessionStorage.removeItem('user_id')
        navigate('/')
        
    }

    if (!sessionStorage.getItem('user_id')) {
        return <Navigate to="/" />
    }

    return (
        <div className="be-wrapper be-fixed-sidebar">
            <nav className="navbar navbar-expand fixed-top be-top-header">
                <div className="container-fluid">
                    <div className="be-navbar-header"><h1 className="page-title">Welcome, {user.name}</h1></div>
                    <div className="be-right-navbar">
                        <ul className="nav navbar-nav float-right be-user-nav">
                            <li className="nav-item dropdown">
                                <Link to="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    <img src="assets/img/avatar.png" alt="Avatar" /><span className="user-name">name</span>
                                </Link>
                                <div className="dropdown-menu" role="menu">
                                    <div className="user-info">
                                        <div className="user-name">{user.name}</div>
                                        <div className="user-position online">Available</div>
                                    </div>
                                    <Link className="dropdown-item" to="#">
                                        <span className="icon mdi mdi-face"></span>Account
                                    </Link>
                                    <Link className="dropdown-item" to="#">
                                        <span className="icon mdi mdi-settings"></span>Settings
                                    </Link>
                                    <Link className="dropdown-item" to="#" onClick={logout} >
                                        <span className="icon mdi mdi-power"></span>Logout
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Home