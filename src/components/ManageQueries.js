import { Link, useNavigate, Navigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment'

const ManageQueries = () => {

    const [queries, setQueries] = useState([]);
    const [change, setChange] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://127.0.0.1:8000/api/getAllQueries/`)
            setQueries(res.data)
        }
        fetchData()
            .catch(console.error)
    }, [change])

    const updateStatus = async (id, status) => {
        setChange(true)
        try {
            const res = await axios.post(`http://127.0.0.1:8000/api/updateStatus/${id}/${status}`)
            setChange(false)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <div className='be-content'>
            <div className="main-content container-fluid">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="card card-table">
                            <div className="card-body">
                                <div className="accordion" id="accordion">
                                    <table className="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>Queries</th>
                                                <th style={{ textAlign: 'center' }}>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {queries.map((item) => (
                                                <tr>
                                                    <td style={{ width: '100%' }}>

                                                        <div className="card">
                                                            <div className="card-header" id="headingOne">
                                                                <button className="btn" data-toggle="collapse" data-target={`#collapse` + item.id} aria-expanded="true" aria-controls={`collapse` + item.id}><i className="icon mdi mdi-chevron-right"></i>{item.problem}, {item.residence}</button>
                                                            </div>
                                                            <div className="collapse" id={`collapse` + item.id} aria-labelledby={`collapse` + item.id} data-parent="#accordion">
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
                                                                    <td>{moment(item.created_at).format('DD MMMM YYYY')}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Updated at</th>
                                                                    <td>{moment(item.updated_at).format('DD MMMM YYYY')}</td>
                                                                </tr>
                                                            </div>
                                                        </div>

                                                    </td>
                                                    <td className="text-center">
                                                        <div class="btn-group btn-hspace">
                                                            <button className={item.status == 'Pending' ? "btn btn-secondary dropdown-toggle" : item.status == 'Attended' ? "btn btn-primary dropdown-toggle" : "btn btn-success dropdown-toggle"} type="button" data-toggle="dropdown">{item.status} <span class="icon-dropdown mdi mdi-chevron-down"></span></button>
                                                            <div class="dropdown-menu" role="menu">
                                                                <Link class="dropdown-item" to="#" onClick={() => updateStatus(item.id, 'Pending')}>Pending</Link>
                                                                <Link class="dropdown-item" to="#" onClick={() => updateStatus(item.id, 'Attended')}>Attended</Link>
                                                                <Link class="dropdown-item" to="#" onClick={() => updateStatus(item.id, 'Resolved')}>Resolved</Link>
                                                            </div>
                                                        </div>
                                                    </td>
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
        </div>
    )
}

export default ManageQueries