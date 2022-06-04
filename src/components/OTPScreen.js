import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../css/style.css'

const OTPScreen = () => {

    const navigate = useNavigate();
    const [otp, setOtp] = useState('')
    const [error, setError] = useState('');

    const login = async () => {
        if (otp !== sessionStorage.getItem('otp')) {
            setError('Your OTP does not match')
        } else {
            const formData = new FormData()
            formData.append('name', sessionStorage.getItem('name'))
            formData.append('student_no', sessionStorage.getItem('student_no'))
            formData.append('email', sessionStorage.getItem('email'))
            formData.append('password', sessionStorage.getItem('password'))
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/otp', formData)
                sessionStorage.setItem('user_id', res.data.id)
                navigate('/home')
            } catch (error) {
                console.log(error.response.data)
            }
        }
    }
    return (
        <div className='body'>
            <div className="container">
                <div className="forms">
                    <div className="form login">
                        <span className="title">Verify OPT</span>

                        <form action="#">

                            {error ? <div className='errorMsg'>{error}</div> : ''}

                            <div className="input-field">
                                <input type="text" onChange={e => setOtp(e.target.value)} placeholder="Enter OTP sent to your email" required />
                                <i className="uil uil-shield-check"></i>
                            </div>

                            <div className="input-field button">
                                <input type="button" value="Verify" onClick={login} />
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default OTPScreen