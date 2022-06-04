import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'
import '../css/style.css'

const ForgotPassword = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [error, setError] = useState('');

    const login = async () => {
        setError('')
        setErrors('')
        if (email === '') {
            console.log(email)
            setError('Please enter your email or student number')
            return
        }

        const formData = new FormData()
        formData.append('email', email)
        try {
            const res = await axios.post(`http://127.0.0.1:8000/api/forgotPassword/${email}`)
            setErrors(res.data)
        } catch (error) {
            setErrors(error.response.data)
        }
    }
    return (
        <div className='body'>
            <div className="container">
                <div className="forms">
                    <div className="form login">
                        <span className="title">Forgot Password</span>

                        <form action="#">

                            {errors?.msg ? <div className='errorMsg'>{errors.msg}</div> : ''}
                            {errors?.sent ? <div className='successMsg'>{errors.sent}</div> : ''}


                            <div className="input-field">
                                <input type="text" onChange={e => setEmail(e.target.value)} placeholder="Enter your email or student number" required />
                                <i className="uil uil-user"></i>
                            </div>
                            {error ? <span className="text-danger">{error}</span> : null}

                            <div className="input-field button">
                                <input type="button" value="Recover" onClick={login} />
                            </div>
                        </form>

                        <div className="login-signup">
                            <span className="text">Got password?
                                <Link to="/" className="text signup-link"> Login</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword