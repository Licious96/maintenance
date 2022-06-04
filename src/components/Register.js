import { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'
import '../css/style.css'

const Register = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [student_no, setStudent_no] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([])
    const [studentError, setStudentError] = useState('');
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [loading, setLoading] = useState(false);

    const register = async () => {
        setLoading(true)
        const formData = new FormData()
        formData.append('name', name)
        formData.append('student_no', student_no)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('password_confirmation', confirmPassword)
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/register', formData)
            setLoading(false)
            sessionStorage.setItem('name', name)
            sessionStorage.setItem('student_no', student_no)
            sessionStorage.setItem('email', email)
            sessionStorage.setItem('password', password)
            sessionStorage.setItem('otp', res.data)
            navigate('/otp')
        } catch (error) {
            setLoading(false)
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
        <div className='body'>

            <div className="container">
                <div className="forms">
                    <div className="form login">
                        <span className="title">Register</span>

                        <form action="#">
                            <div className="input-field">
                                <input type="text" onChange={e => setName(e.target.value)} placeholder="Enter your surname and initials" required />
                                <i className="uil uil-user"></i>
                            </div>
                            {errors?.name ? <span className="text-danger">{errors.name}</span> : null}

                            <div className="input-field">
                                <input type="text" onChange={e => setStudent_no(e.target.value)} className="password" placeholder="Enter your student number" required />
                                <i className="uil uil-user"></i>
                            </div>
                            {errors?.student_no ? <span className="text-danger">{errors.student_no}</span> : null}
                            <span className="text-danger">{studentError}</span>

                            <div className="input-field">
                                <input type="email" onChange={e => setEmail(e.target.value)} className="password" placeholder="Enter your email" required />
                                <i className="uil uil-envelope icon"></i>
                            </div>
                            {errors?.email ? <span className="text-danger">{errors.email}</span> : null}

                            <div className="input-field">
                                <input type={show1 ? "text" : "password"} onChange={e => setPassword(e.target.value)} className="password" placeholder="Enter your password" required />
                                <i className="uil uil-lock icon"></i>
                                <i className={show1 ? "uil uil-eye-slash showHidePw" : "uil uil-eye showHidePw"} onClick={() => setShow1(!show1)}></i>
                            </div>
                            {errors?.password ? <span className="text-danger">{errors.password}</span> : 'Password should at least contain one uppercase, one lowercase, numbers and one special character'}

                            <div className="input-field">
                                <input type={show2 ? "text" : "password"} onChange={e => setConfirmPassword(e.target.value)} className="password" placeholder="Confirm your password" required />
                                <i className="uil uil-lock icon"></i>
                                <i className={show2 ? "uil uil-eye-slash showHidePw" : "uil uil-eye showHidePw"} onClick={() => setShow2(!show2)}></i>
                            </div>
                            {errors?.password ? <span className="text-danger">{errors.password}</span> : null}

                            <div className="input-field">
                                <button type="button" value="Register" className={loading ? 'registerBtn btnLoading' : 'registerBtn'} onClick={register}>
                                    <span className='btnText'>Register</span>
                                </button>
                            </div>
                        </form>

                        <div className="login-signup">
                            <span className="text">Already a member?
                                <Link to="/" className="text signup-link"> Login</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Register
