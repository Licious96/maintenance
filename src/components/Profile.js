import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import CoverPhoto from '../images/user-profile-display.png'
import Avatar from '../images/avatar-150.png'
import axios from "axios";
import '../css/custom.css'

const Profile = ({toggleTheme}) => {

    const [show, setShow] = useState(false);
    const user_id = sessionStorage.getItem('user_id')
    const [user, setUser] = useState({});
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success1, setSuccess1] = useState(false);
    const [success2, setSuccess2] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://127.0.0.1:8000/api/getUser/${user_id}`)
            setUser(res.data)
        }
        fetchData()
        .catch(console.error)
        
    }, [user_id])

    const updatePassword = async(id) => {
        try {
            const form = new FormData()
            form.append('password', password)
            const res = await axios.post(`http://127.0.0.1:8000/api/updatePassword/${id}`, form)
            setError('')
            setSuccess1(true)
            setTimeout(()=> setSuccess1(false), 3000)
        } catch (error) {
            setError(error.response.data)
        }
    }

    const updateEmail = async(id) => {
        try {
            const form = new FormData()
            form.append('email', email)
            const res = await axios.post(`http://127.0.0.1:8000/api/updateEmail/${id}`, form)
            setError('')
            setSuccess2(true)
            setTimeout(()=> setSuccess2(false), 3000)
        } catch (error) {
            setError(error.response.data)
        }
    }

    const uploadPicture = async (param) => {
        try {
            const form = new FormData()
            form.append('id', user_id)
            form.append('image', param)
            const res = await axios.post(`http://127.0.0.1:8000/api/uploadPicture`, form)
            setUser({...user, image: res.data})
        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <div class="be-content">
            <div class="main-content container-fluid" style={{ paddingTop: 50 }}>
                <div class="user-profile">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="user-display">
                                <div class="user-display-bg"><img src={CoverPhoto} alt="Profile Background" /></div>
                                <div class="user-display-bottom">
                                    <div class="user-display-avatar"><img style={{objectFit: 'cover'}} src={user.image ? `http://127.0.0.1:8000/assets/images/${user.image}` : Avatar} alt="Avatar" /></div>
                                    <div class="user-display-info">
                                        <label htmlFor="camera" className="camera">
                                            <span class="icon mdi mdi-camera"></span>
                                        </label>
                                        <input type="file" id="camera" accept="images/*" onChange={e => uploadPicture(e.target.files[0])} />
                                        <div class="" style={{float: 'right'}}>
                                            <label class="mr-2">Dark mode</label>
                                            <div class="switch-button switch-button-xs">
                                                <input type="checkbox" name="swt1" id="swt1" onChange={toggleTheme} />
                                                <span><label for="swt1"></label></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="user-info-list card">
                                <div class="card-body">
                                    <table class="no-border no-strip skills">
                                        <tbody class="no-border-x no-border-y">
                                            <tr>
                                                <td class="icon"><span class="mdi mdi-bookmark"></span></td>
                                                <td class="item">Name<span class="icon s7-portfolio"></span></td>
                                                <td>{user.name}</td>
                                            </tr>
                                            <tr>
                                                <td class="icon"><span class="mdi mdi-account"></span></td>
                                                <td class="item">Student No.<span class="icon s7-gift"></span></td>
                                                <td>{user.student_no}</td>
                                            </tr>
                                            <tr>
                                                <td class="icon"><span class="mdi mdi-email"></span></td>
                                                <td class="item">Email<span class="icon s7-gift"></span></td>
                                                <td>
                                                    <input className="passwordInput" type="email" onChange={e => setEmail(e.target.value)}  defaultValue={user.email}/>
                                                    <Link to="#" title="save" style={{marginLeft: '15px'}} className="mdi mdi-save" onClick={() => updateEmail(user.id)}></Link><br/>
                                                    {error?.email ? <span className="text-danger">{error.email}</span> : ""}
                                                    {success2 ? <span className="text-success">email changed</span> : ""}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="icon"><span class="mdi mdi-lock"></span></td>
                                                <td class="item">Password<span class="icon s7-phone"></span></td>
                                                <td><input className="passwordInput" type={show ? "text" : "password"} onChange={e => setPassword(e.target.value)}  defaultValue={user.password}/>
                                                    <span className={show ? "mdi mdi-eye-off" : "mdi mdi-eye"} onClick={() => setShow(!show)}></span>
                                                    <Link to="#" title="save" style={{marginLeft: '5px'}} className="mdi mdi-save" onClick={() => updatePassword(user.id)}></Link><br/>
                                                    {error?.password ? <span className="text-danger">{error.password}</span> : ""}
                                                    {success1 ? <span className="text-success">password changed</span> : ""}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
       
    )
}

export default Profile
