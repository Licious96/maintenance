import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment'

const RecordQueries = () => {

    const [problem, setProblem] = useState('');
    const [residence, setResidence] = useState('');
    const [room, setRoom] = useState('');
    const [problemType, setProblemType] = useState('');
    const [cost, setCost] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [errors, setErrors] = useState('');
    const [success, setSuccess] = useState(false);

    const recordQuery = async () => {
        const formData = new FormData()
        formData.append('problem', problem)
        formData.append('residence', residence)
        formData.append('room', room)
        formData.append('problem_type', problemType)
        formData.append('assigned_to', assignedTo)
        formData.append('cost', cost)
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/recordQuery', formData)
            console.log(res.data)
            setSuccess(true)
            setProblem('')
            setResidence('')
            setRoom('')
            setAssignedTo('')
            setCost('')
            setErrors('')
            setTimeout(()=> setSuccess(false), 4000)
        } catch (error) {
            console.log(error.response.data)
            setErrors(error.response.data)
        }
    }

    return (
        <div className='be-content'>
            <div className="main-content container-fluid">
                <div className="row">
                    <div class="col-lg-8">
                        <div class="card card-border-color card-border-color-primary">
                            <div class="card-header card-header-divider">Record submitted queries</div>
                            <div class="card-body">
                                <form>
                                    <div class="form-group row mt-2">
                                        <label class="col-3 col-lg-2 col-form-label text-right">Problem</label>
                                        <div class="col-9 col-lg-10">
                                            <input class="form-control" value={problem} onChange={(e) => setProblem(e.target.value)} type="text" placeholder="e.g Broken Window" />
                                        </div>
                                        {errors?.problem ? <span style={{marginLeft: '118px'}} className="text-danger">{errors.problem}</span> : ""}
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-3 col-lg-2 col-form-label text-right">Residence</label>
                                        <div class="col-9 col-lg-10">
                                            <input class="form-control" value={residence} onChange={e => setResidence(e.target.value)} type="text" placeholder="e.g MBA" />
                                        </div>
                                        {errors?.residence ? <span style={{marginLeft: '118px'}} className="text-danger">{errors.residence}</span> : ""}
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-3 col-lg-2 col-form-label text-right">Room number</label>
                                        <div class="col-9 col-lg-10">
                                            <input class="form-control" value={room} onChange={e => setRoom(e.target.value)} type="text" placeholder="e.g 0007" />
                                        </div>
                                        {errors?.room ? <span style={{marginLeft: '118px'}} className="text-danger">{errors.room}</span> : ""}
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-3 col-lg-2 col-form-label text-right">Problem type</label>
                                        <div class="col-9 col-lg-10">
                                            <label class="custom-control custom-radio custom-control-inline">
                                                <input class="custom-control-input" onChange={e => setProblemType('Electrical')} type="radio" name="radio-inline" /><span class="custom-control-label">Electrical</span>
                                            </label>
                                            <label class="custom-control custom-radio custom-control-inline">
                                                <input class="custom-control-input" onChange={e => setProblemType('Plumbing')} type="radio" name="radio-inline" /><span class="custom-control-label">Plumbing</span>
                                            </label>
                                            <label class="custom-control custom-radio custom-control-inline">
                                                <input class="custom-control-input" onChange={e => setProblemType('Other')} type="radio" name="radio-inline" /><span class="custom-control-label">Other</span>
                                            </label>
                                        </div>
                                        {errors?.problem_type ? <span style={{marginLeft: '118px'}} className="text-danger">{errors.problem_type}</span> : ""}
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-3 col-lg-2 col-form-label text-right">Cost</label>
                                        <div class="col-9 col-lg-10">
                                            <input class="form-control" value={cost} onChange={e => setCost(e.target.value)} type="text" placeholder="R0" />
                                        </div>
                                        {errors?.cost ? <span style={{marginLeft: '118px'}} className="text-danger">{errors.cost}</span> : ""}
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-3 col-lg-2 col-form-label text-right">Assigned to</label>
                                        <div class="col-9 col-lg-10">
                                            <input class="form-control" value={assignedTo} onChange={e => setAssignedTo(e.target.value)} type="text" placeholder="Name and Surname" />
                                        </div>
                                        {errors?.assigned_to ? <span style={{marginLeft: '118px'}} className="text-danger">{errors.assigned_to}</span> : ""}
                                    </div>
                                    {success ?
                                    <div class="alert alert-success alert-dismissible" role="alert">
                                        <button class="close" type="button" data-dismiss="alert" aria-label="Close"><span class="mdi mdi-close" aria-hidden="true"></span></button>
                                        <div class="icon"><span class="mdi mdi-check"></span></div>
                                        <div class="message"><strong>Great!</strong> Query recorded successfully.</div>
                                    </div> : ""
                                    }
                                    <div class="row pt-3 mt-1">
                                        <div class="col-sm-6 col-lg-6 pb-4 pb-lg-0">

                                        </div>
                                        <div class="col-sm-6">
                                            <p class="text-right">
                                                <button class="btn btn-space btn-primary" onClick={recordQuery} type="button">Submit</button>
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecordQueries