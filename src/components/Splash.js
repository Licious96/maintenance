import React from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import '../css/custom.css'

const Splash = () => {
  return (
    <section>
        <div className='overlay'></div>
        <div className='splash-content'>
            <div className='splash-info'>
                <h2>Maintenance App <br/><span>UL'S FIRST</span></h2>
                <p>Submit your maintenance queries here and your query will be attended to quickly</p>
                <Link to='/login' className='info-btn'>Login</Link>
            </div>
        </div>
    </section>
  )
}

export default Splash