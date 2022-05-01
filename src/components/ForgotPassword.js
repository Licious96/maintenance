import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

const ForgotPassword  = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])

    const login = async () => {
        const formData = new FormData()
        formData.append('email', email)
        try {
            const res = await axios.post(`http://127.0.0.1:8000/api/forgotPassword/${email}`)
        } catch (error) {
            setErrors(error.response.data)
        }
    }
  return (
    <div className="be-splash-screen">
            <div className="be-wrapper be-login">
                <div className="be-content">
                    <div className="main-content container-fluid">
                        <div className="splash-container">
                            <div className="card card-border-color card-border-color-primary">
                                <div className="card-header"><div className="be-navbar-header"><h1 className="page-title">Maintenance App</h1></div><span className="splash-description">Recover your password.</span></div>
                                <div className="card-body">
                                    <form>
                                        <div className="login-form">
                                            <span className='text-center text-danger'>{errors.msg}</span>
                                            <div className="form-group">
                                                <input className="form-control" onChange={e => setEmail(e.target.value)} type="text" placeholder="Email or Student Number" />
                                                {errors?.email ? <span className="text-danger">{errors.email}</span> : null}
                                            </div>
                                            
                                            <div className="form-group row login-submit">
                                                <div className="col-6"><Link className="btn btn-secondary btn-xl" to="/" type="submit">Login</Link></div>
                                                <div className="col-6"><button type="button" id='btn' className="btn btn-primary btn-xl" onClick={login}><span className='btn_cnts'>Get password</span></button></div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ForgotPassword