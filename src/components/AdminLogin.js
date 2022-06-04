import { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'
import '../css/style.css'

const AdminLogin = () => {

    const navigate = useNavigate();
    const [student_no, setStudent_no] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [show, setShow] = useState(false);

    const login = async () => {
        const formData = new FormData()
        formData.append('staff_no', student_no)
        formData.append('password', password)
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/staffLogin', formData)
            sessionStorage.setItem('admin', res.data.id)
            navigate('/dashboard')
        } catch (error) {
            console.log(error.response.data)
            setErrors(error.response.data)
        }
    }

    if (sessionStorage.getItem('admin')) {
        return <Navigate to='/dashboard' />
    }

    return (
        <div className='body'>
            <div className="container">
                <div className="forms">
                    <div className="form login">
                        <span className="title">Admin Login</span>

                        <form action="#">

                            {errors?.msg ? <div className='errorMsg'>{errors.msg}</div> : ''}

                            <div className="input-field">
                                <input type="text" onChange={e => setStudent_no(e.target.value)} placeholder="Enter staff number" required />
                                <i className="uil uil-user"></i>
                            </div>
                            {errors?.staff_no ? <span className="text-danger">{errors.staff_no}</span> : null}

                            <div className="input-field">
                                <input type={show ? "text" : "password"} onChange={e => setPassword(e.target.value)} className="password" placeholder="Enter your password" required />
                                <i className="uil uil-lock icon"></i>
                                <i className={show ? "uil uil-eye showHidePw" : "uil uil-eye-slash showHidePw"} onClick={() => setShow(!show)}></i>
                            </div>
                            {errors?.password ? <span className="text-danger">{errors.password}</span> : null}

                            <div className="checkbox-text">
                                <div className="checkbox-content">
                                    <input type="checkbox" id="logCheck" />
                                    <label htmlFor="logCheck" className="text">Remember me</label>
                                </div>
                                <Link to="/forgotPassword" className="text">Forgot password?</Link>
                            </div>

                            <div className="input-field button">
                                <input type="button" value="Login Now" onClick={login} />
                            </div>
                        </form>

                        <div className="login-signup">
                            <span className="text">Not an admin?
                                <Link to="/" className="text signup-link"> Login as user</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AdminLogin
