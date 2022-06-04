import { Link, useNavigate, Navigate, Routes, Route } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment'
import ManageQueries from './ManageQueries';
import RecordQueries from './RecordQueries';
import RecordedQueries from './RecordedQueries';

const Dashboard = () => {

    const navigate = new useNavigate()
    const user_id = sessionStorage.getItem('admin')
    const [user, setUser] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://127.0.0.1:8000/api/getAdmin/${user_id}`)
            setUser(res.data)
        }
        fetchData()
        .catch(console.error)        

    }, [])

    const logout = () => {
        sessionStorage.removeItem('admin')
        navigate('/')

    }

    if (!sessionStorage.getItem('admin')) {
        return <Navigate to="/" />
    }

    return (
        <div className="be-wrapper be-fixed-sidebar">
            <nav className="navbar navbar-expand fixed-top be-top-header">
                <div className="container-fluid">
                    <div className="be-navbar-header"></div>
                    <div className="be-right-navbar">
                        <ul className="nav navbar-nav float-right be-user-nav">
                            <li className="nav-item dropdown">
                                <Link to="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    <img src="assets/img/avatar.png" alt="Avatar" /><span className="user-name">{user.name}</span>
                                </Link>
                                <div className="dropdown-menu" role="menu">
                                    <div className="user-info">
                                        <div className="user-name">{user.name}</div>
                                        <div className="user-position online">Available</div>
                                    </div>
                                    <Link className="dropdown-item" to="#">
                                        <span className="icon mdi mdi-home"></span>Dashboard
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
            <div className="be-left-sidebar">
                <div className="left-sidebar-wrapper">
                    <div className="left-sidebar-spacer">
                        <div className="left-sidebar-scroll">
                            <div className="left-sidebar-content">
                                <ul className="sidebar-elements">
                                    <li className="active">
                                        <Link to="/dashboard">
                                            <i class="icon mdi mdi-home"></i>
                                            <span>Queries</span>
                                        </Link>
                                    </li>
                                    <li className="active">
                                        <Link to='/dashboard/record-queries'>
                                            <i class="icon mdi mdi-plus-circle"></i>
                                            <span>Record Query</span>
                                        </Link>
                                    </li>
                                    <li className="active">
                                        <Link to='/dashboard/recorded-queries'>
                                            <i class="icon mdi mdi-plus-box"></i>
                                            <span>Recorded Queries</span>
                                        </Link>
                                    </li>
                                    <li className="active">
                                        <Link to='#' onClick={logout}>
                                            <i class="icon mdi mdi-power"></i>
                                            <span>Logout</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<ManageQueries />} />
                <Route path="/record-queries" element={<RecordQueries />} />
                <Route path="/recorded-queries" element={<RecordedQueries />} />
            </Routes>
        </div>
    )
}

export default Dashboard
