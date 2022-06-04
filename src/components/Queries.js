import React, { useState, useEffect } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

const Queries = () => {

    const user_id = sessionStorage.getItem('user_id')
    const [residence, setResidence] = useState('');
    const [room, setRoom] = useState('');
    const [problem, setProblem] = useState('');
    const [time, setTime] = useState('');
    const [contacts, setContacts] = useState('');
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState('');
    const [queries, setQueries] = useState([]);
    const [change, setChange] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://127.0.0.1:8000/api/getQueries/${user_id}`)
            setQueries(res.data)
        }
        fetchData()
            .catch(console.error)
    }, [change])

    const query = async () => {
        setChange(true)
        const formData = new FormData()
        formData.append('user_id', user_id)
        formData.append('residence', residence)
        formData.append('room', room)
        formData.append('problem', problem)
        formData.append('time', time)
        formData.append('contacts', contacts)

        try {
            console.log('query running')
            const res = await axios.post('http://127.0.0.1:8000/api/query', formData)
            setQueries([...queries, res.data])
            setChange(false)
            setSuccess('Your query was submitted successfully')
            setErrors([])
            setResidence('')
            setRoom('')
            setProblem('')
            setContacts('')
            setTimeout(()=> {
                setSuccess('')
            }, 5000)
            
        } catch (error) {
            console.log(error.response.data)
            setErrors(error.response.data)
            setChange(false)
        }
    }

    const remove = async(id) => {
        try {
            const res = await axios.post(`http://127.0.0.1:8000/api/remove/${id}`)
            const filtered = queries.filter(item => item.id !== id)
            setQueries(filtered)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <div className='be-content'>
            <div className="main-content container-fluid" style={{ paddingTop: 50 }}>
                <div className="row">
                    <div className="col-lg-5">
                        <div className="card card-border-color card-border-color-primary">
                            <div className="card-header card-header-divider">Lodge query</div>
                            <div className="card-body">
                                <div className="form-group pt-2">
                                    <label>Residence/Building</label>
                                    <input className="form-control" onChange={(e) => setResidence(e.target.value)} type="text" placeholder="e.g MBA" value={residence} />
                                    {errors?.residence ? <span className='text-danger'>{errors.residence}</span> : ''}
                                </div>
                                <div className="form-group">
                                    <label >Room Number</label>
                                    <input className="form-control" value={room} onChange={(e) => setRoom(e.target.value)} type="text" placeholder="e.g 0007" />
                                    {errors?.room ? <span className='text-danger'>{errors.room}</span> : ''}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPassword">What is your problem?</label>
                                    <input className="form-control" value={problem} onChange={(e) => setProblem(e.target.value)} type="text" placeholder="e.g Broken Window" />
                                    {errors?.problem ? <span className='text-danger'>{errors.problem}</span> : ''}
                                </div>
                                <div className="form-group">
                                    <label>What time will you be available?</label>
                                    <select className="form-control" onChange={(e) => setTime(e.target.value)}>
                                        <option hidden>Select time</option>
                                        <option value="07H00-08H00">07H00-08H00</option>
                                        <option value="08H00-09H00">08H00-09H00</option>
                                        <option value="09H00-10H00">09H00-10H00</option>
                                        <option value="10H00-11H00">10H00-11H00</option>
                                        <option value="11H00-12H00">11H00-12H00</option>
                                        <option value="12H00-13H00">12H00-13H00</option>
                                        <option value="13H00-14H00">13H00-14H00</option>
                                        <option value="14H00-15H00">14H00-15H00</option>
                                        <option value="15H00-16H00">15H00-16H00</option>
                                        <option value="16H00-17H00">16H00-17H00</option>
                                        <option value="17H00-18H00">17H00-18H00</option>
                                    </select>
                                    {errors?.time ? <span className='text-danger'>{errors.time}</span> : ''}
                                </div>
                                <div className="form-group">
                                    <label>Cell phone number</label>
                                    <input className="form-control" value={contacts} onChange={(e) => setContacts(e.target.value)} type="text" placeholder="e.g 0781234567" />
                                    {errors?.contacts ? <span className='text-danger'>{errors.contacts}</span> : ''}
                                </div>
                                <div className="form-group">
                                    {success ? <div className='alert alert-success text-center'>{success}</div> : ''}

                                </div>
                                <div className="row pt-3">
                                    <div className='col-12'>
                                        <div className="text-right">
                                            <button className="btn btn-space btn-primary" onClick={query} type="reset">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="card card-table">
                            <div className="card-body">
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Queries</th>
                                            <th style={{ textAlign: 'center' }}>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {queries.map((item) => (
                                            <tr>
                                                <td style={{ width: '100%' }}>
                                                    <div className="accordion" id="accordion">
                                                        <div className="card">
                                                            <div className="card-header" id="headingOne">
                                                                <button className="btn" data-toggle="collapse" data-target={`#collapse` + item.id} aria-expanded="true" aria-controls="one"><i className="icon mdi mdi-chevron-right"></i>{item.problem}</button>
                                                            </div>
                                                            <div className="collapse" id={`collapse` + item.id} aria-labelledby="headingOne" data-parent="#accordion">
                                                                <tr>
                                                                    <th>Residence</th>
                                                                    <td>{item.residence}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Room Number</th>
                                                                    <td>{item.room}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Problem</th>
                                                                    <td>{item.problem}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Available time</th>
                                                                    <td>{item.time}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Contacts</th>
                                                                    <td>{item.contacts}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Created at</th>
                                                                    <td>{moment(item.created_at).format('DD MMMM YYYY HH:mm:ss')}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Updated at</th>
                                                                    <td>{moment(item.updated_at).format('DD MMMM YYYY HH:mm:ss')}</td>
                                                                </tr>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center"><span className={item.status == 'Pending' ? 'badge badge-default' : item.status == 'Attended' ? 'badge badge-primary' : 'badge badge-success'}>{item.status}</span></td>
                                                <td><Link to="#" onClick={() => remove(item.id)} className="icon mdi mdi-close"></Link></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Queries