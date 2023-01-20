import React from 'react'
import '../styles/welcome.css';

export const Welcome = ({
  handleShow
}) => {
  return (
    <div className='welcome container-limits' id='welcome'>
      <div>
        <div>
          <h5 className='fs-small fw-300'>Hello,</h5>
          <span className='name ff-remark fs-500'>Daniela</span>
        </div>
        <button className='btn btn-traslucid ff-remark fs-small'>Log In</button>
      </div>
      <div>
        <h5 className='fs-small fw-300'>Expenses Today</h5>
        <h1 className='ff-price fs-big'>$29.4</h1>
      </div>
      <div className='ff-remark'>
        <div>
          <span
            className='btn btn-traslucid'
            onClick={() => handleShow(true)}
          >
            <i className="uil uil-plus"></i>
          </span>
          <p className='fs-smallest'>Expense</p>
        </div>
        <div>
          <span className='btn btn-traslucid'>
            <i className="uil uil-graph-bar"></i>
          </span>
          <p className='fs-smallest'>Stats</p>
        </div>
      </div>
    </div>
  )
}
