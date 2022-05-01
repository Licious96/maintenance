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
        }
    }

    if (sessionStorage.getItem('user_id')) {
        return <Navigate to='/home' />
    }

    return (
        <div className="be-splash-screen">
            <div className="be-wrapper be-login">
                <div className="be-content">
                    <div className="main-content container-fluid">
                        <div className="splash-container">
                            <div className="card card-border-color card-border-color-primary">
                                <div className="card-header"><div className="be-navbar-header"><h1 className="page-title">Maintenance App</h1></div><span className="splash-description">Please enter your user information.</span></div>
                                <div className="card-body">
                                    <form>
                                        <div className="login-form">
                                            <span className='text-center text-danger'>{errors.msg}</span>
                                            <div className="form-group">
                                                <input className="form-control" onChange={e => setName(e.target.value)} type="text" placeholder="Surname and Initials" />
                                                {errors?.email ? <span className="text-danger">{errors.name}</span> : null}
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control" onChange={e => setStudent_no(e.target.value)} type="text" placeholder="Student Number" />
                                                {errors?.email ? <span className="text-danger">{errors.student_no}</span> : null}
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control" onChange={e => setEmail(e.target.value)} type="text" placeholder="Email" />
                                                {errors?.email ? <span className="text-danger">{errors.email}</span> : null}
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control" onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                                                {errors?.password ? <span className="text-danger">{errors.password}</span> : null}
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control" onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" />
                                                {errors?.password ? <span className="text-danger">{errors.password}</span> : null}
                                            </div>
                                            <div className="form-group row login-submit">
                                                <div className="col-6"><Link className="btn btn-secondary btn-xl" to="/" type="submit">Login</Link></div>
                                                <div className="col-6"><button type="button" id='btn' className="btn btn-primary btn-xl" onClick={register}><span className='btn_cnts'>Register</span></button></div>
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

export default Register
