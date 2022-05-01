import { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

const Register = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [student_no, setStudent_no] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([])
    const [studentError, setStudentError] = useState('');
    const [show, setShow] = useState(false);

    const register = async () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('student_no', student_no)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('password_confirmation', confirmPassword)
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/register', formData)
            console.log(res.data)
            sessionStorage.setItem('user_id', res.data.id)
            navigate('/home')
        } catch (error) {
            setErrors(error.response.data)
            setStudentError('')
            if (error.response.status === 401) {
                setStudentError(error.response.data)
            }
        }
    }

    if (sessionStorage.getItem('user_id')) {
        return <Navigate to='/home' />
    }

    return (
        <div class="container">
            <div class="forms">
                <div class="form login">
                    <span class="title">Register</span>

                    <form action="#">
                        <div class="input-field">
                            <input type="text" onChange={e => setName(e.target.value)} placeholder="Enter your name" required />
                            <i class="uil uil-user"></i>
                        </div>
                        {errors?.name ? <span className="text-danger">{errors.name}</span> : null}

                        <div class="input-field">
                            <input type="text" onChange={e => setStudent_no(e.target.value)} class="password" placeholder="Enter your student number" required />
                            <i class="uil uil-user"></i>
                        </div>
                        {errors?.student_no ? <span className="text-danger">{errors.student_no}</span> : null}
                        <span className="text-danger">{studentError}</span>

                        <div class="input-field">
                            <input type="email" onChange={e => setEmail(e.target.value)} class="password" placeholder="Enter your email" required />
                            <i class="uil uil-envelope icon"></i>
                        </div>
                        {errors?.email ? <span className="text-danger">{errors.email}</span> : null}

                        <div class="input-field">
                            <input type={show ? "text" : "password"} onChange={e => setPassword(e.target.value)} class="password" placeholder="Enter your password" required />
                            <i class="uil uil-lock icon"></i>
                            <i class={show ? "uil uil-eye showHidePw" : "uil uil-eye-slash showHidePw"} onClick={() => setShow(!show)}></i>
                        </div>
                        {errors?.password ? <span className="text-danger">{errors.password}</span> : 'Password should at least contain one uppercase, one lowercase, numbers and one special character'}

                        <div class="input-field">
                            <input type={show ? "text" : "password"} onChange={e => setConfirmPassword(e.target.value)} class="password" placeholder="Confirm your password" required />
                            <i class="uil uil-lock icon"></i>
                            <i class={show ? "uil uil-eye showHidePw" : "uil uil-eye-slash showHidePw"} onClick={() => setShow(!show)}></i>
                        </div>
                        {errors?.password ? <span className="text-danger">{errors.password}</span> : null}

                        <div class="input-field button">
                            <input type="button" value="Register" onClick={register} />
                        </div>
                    </form>

                    <div class="login-signup">
                        <span class="text">Already a member?
                            <Link to="/" class="text signup-link"> Login</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Register
