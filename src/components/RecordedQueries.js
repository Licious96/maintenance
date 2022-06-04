import React, { useState, useEffect} from 'react'
import axios from 'axios'

const RecordedQueries = () => {

    const [records, setRecords] = useState([]);
    const [sum, setSum] = useState('');
    const [filteredTable, setFilteredTable] = useState([]);
    const [value, setvalue] = useState('');

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/getRecords')
                const sum = await axios.get('http://127.0.0.1:8000/api/getSum')
                setRecords(res.data)
                setSum(sum.data)
            } catch (error) {
                console.log(error.response.data)
            }
        }
        fetchData()
        .catch(console.error)
    }, [])

    const searchTable = (e) => {
        if (e.target.value !== "") {
            setvalue(e.target.value)
            const filteredData = records.filter( item => Object.keys(item).some(k => String(item[k]).toLowerCase().includes(e.target.value.toLowerCase())))
            setFilteredTable([...filteredData])
        }else{
            setvalue(e.target.value)
            setRecords([...records])
        }
    }
    
    return (
        <div className='be-content'>
            <div className="main-content container-fluid">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="card card-table">
                            <div class="card-header row">
                                <div className='col-sm-6'>
                                    Query Records
                                </div>
                                <div class="col-sm-6">
                                    <input class="form-control" type="search" value={value} placeholder="Search" onChange={searchTable} />
                                </div>
                            </div>
                            <div class="card-body">
                                <table class="table table-striped table-hover table-fw-widget">
                                    <thead>
                                        <tr>
                                            <th>Problem</th>
                                            <th>Residence</th>
                                            <th>Problem type</th>
                                            <th>Assigned to</th>
                                            <th>Cost</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            value.length > 0 ?
                                            filteredTable.map( item => (
                                                <tr>
                                                    <td>{item.problem}</td>
                                                    <td>{item.residence}, {item.room}</td>
                                                    <td>{item.problem_type}</td>
                                                    <td>{item.assigned_to}</td>
                                                    <td>R{item.cost}</td>
                                                </tr>
                                            )) :
                                            records.map( item => (
                                                <tr>
                                                    <td>{item.problem}</td>
                                                    <td>{item.residence}, {item.room}</td>
                                                    <td>{item.problem_type}</td>
                                                    <td>{item.assigned_to}</td>
                                                    <td>R{item.cost}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                        <th colSpan={4}>Total</th>
                                        <td><><strong>R{sum}</strong></></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecordedQueries