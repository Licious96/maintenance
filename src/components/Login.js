import { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

const Login = () => {

    const navigate = useNavigate();
    const [student_no, setStudent_no] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    const login = async () => {
        const formData = new FormData()
        formData.append('student_no', student_no)
        formData.append('password', password)
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/login', formData)
            console.log(res.data)
            sessionStorage.setItem('user_id', res.data.id)
            navigate('/home')
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    if (sessionStorage.getItem('user_id')) {
        return <Navigate to='/home' />
    }

    return (
        <div class="container">
        <div class="forms">
            <div class="form login">
                <span class="title">Login</span>

                <form action="#">

                    {errors?.msg ? <div className='errorMsg'>{errors.msg}</div> : ''}
                    
                    <div class="input-field">
                        <input type="text" onChange={e => setStudent_no(e.target.value)} placeholder="Enter your student number" required />
                        <i class="uil uil-user"></i>
                    </div>
                    {errors?.student_no ? <span className="text-danger">{errors.student_no}</span> : null}

                    <div class="input-field">
                        <input type="password" onChange={e => setPassword(e.target.value)} class="password" placeholder="Enter your password" required />
                        <i class="uil uil-lock icon"></i>
                        <i class="uil uil-eye-slash showHidePw"></i>                    
                    </div>
                    {errors?.password ? <span className="text-danger">{errors.password}</span> : null}

                    <div class="checkbox-text">
                        <div class="checkbox-content">
                            <input type="checkbox" id="logCheck" />
                            <label for="logCheck" class="text">Remember me</label>
                        </div>
                        
                        <Link to="/forgotPassword" class="text">Forgot password?</Link>
                    </div>

                    <div class="input-field button">
                        <input type="button" value="Login Now" onClick={login} />
                    </div>
                </form>

                <div class="login-signup">
                    <span class="text">Not a member?
                        <Link to="/register" class="text signup-link"> Signup now</Link>
                    </span>
                </div>
            </div>
        </div>
    </div>

    )
}

export default Login
