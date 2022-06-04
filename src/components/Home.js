import React, { useState, useEffect } from 'react'
import { Link, useNavigate, Navigate, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Queries from './Queries'
import Profile from './Profile'
import Avatar from '../images/avatar-150.png'

const Home = () => {

    const navigate = new useNavigate()
    const user_id = sessionStorage.getItem('user_id')
    const [user, setUser] = useState({});
    const [theme, setTheme] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://127.0.0.1:8000/api/getUser/${user_id}`)
            setUser(res.data)
        }
        fetchData()
        .catch(console.error)
        
    }, [user_id])

    const logout = () => {
        sessionStorage.removeItem('user_id')
        navigate('/')

    }

    if (!sessionStorage.getItem('user_id')) {
        return <Navigate to="/" />
    }

    const toggleTheme = () => {
        setTheme(theme === "" ? "dark" : "") 
    }

    return (
        <div className="be-wrapper be-fixed-sidebar" id={theme}>
            <nav className="navbar navbar-expand fixed-top be-top-header" >
                <div className="container-fluid">
                    <div className="be-navbar-header"><h1 className="page-title">Welcome, {user.name}</h1></div>
                    <div className="be-right-navbar">
                        <ul className="nav navbar-nav float-right be-user-nav">
                            <li className="nav-item dropdown">
                                <Link to="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    <img src={user.image ? `http://127.0.0.1:8000/assets/images/${user.image}` : Avatar} alt="Avatar" /><span className="user-name">{user.name}</span>
                                </Link>
                                <div className="dropdown-menu" role="menu">
                                    <div className="user-info">
                                        <div className="user-name">{user.name}</div>
                                        <div className="user-position online">Available</div>
                                    </div>
                                    <Link className="dropdown-item" to="/home/profile">
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
            <div className="be-left-sidebar" style={{ paddingTop: 40 }}>
                    <div className="left-sidebar-wrapper">
                        <div className="left-sidebar-spacer">
                            <div className="left-sidebar-scroll">
                                <div className="left-sidebar-content">
                                    <ul className="sidebar-elements">
                                        <li className="active">
                                            <Link to="/home">
                                                <i class="icon mdi mdi-home"></i>
                                                <span>Queries</span>
                                            </Link>
                                        </li>
                                        <li className="active">
                                            <Link to='/home/profile'>
                                                <i class="icon mdi mdi-account"></i>
                                                <span>Profile</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Routes>
                    <Route path="/" element={<Queries />} />
                    <Route path="/profile" element={<Profile toggleTheme={toggleTheme} />} />
                </Routes>
        </div>
    )
}

export default Home