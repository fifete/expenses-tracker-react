import React from 'react'
import '../styles/welcome.css';

export const Welcome = ({
  handleShow
}) => {
  return (
    <div className='welcome flex container-limits' id='welcome'>
      <div className='flex justify-content-between align-items-start'>
        <div>
          <h5 className='fs-small fw-300'>Hello,</h5>
          <span className='name ff-remark fs-500 fw-600'>Daniela</span>
        </div>
        <button className='btn btn-traslucid ff-remark fs-small fw-600'>Log In</button>
      </div>
      <div>
        <h5 className='fs-small fw-300'>Expenses Today</h5>
        <h1 className='ff-price fs-big'>$29.4</h1>
      </div>
      <div className='welcome-buttons flex ff-remark'>
        <div className='welcome-btn-container grid'>
          <span
            className='btn btn-traslucid flex justify-content-center align-items-center'
            onClick={() => handleShow(true)}
          >
            <i className="uil uil-plus fs-icon fw-600"></i>
          </span>
          <p className='fs-smallest'>Expense</p>
        </div>
        <div className='welcome-btn-container grid'>
          <span className='btn btn-traslucid flex justify-content-center align-items-center'>
            <i className="uil uil-graph-bar fs-icon fw-600"></i>
          </span>
          <p className='fs-smallest'>Stats</p>
        </div>
      </div>
    </div>
  )
}
