import React from 'react'
import '../styles/welcome.css';

export const Welcome = ({
  handleShow
}) => {
  return (
    <div className='welcome' id='welcome'>
      <div>
        <div>
          <h5 className='fs-small fw-300'>Hello,</h5>
          <span className='ff-remark fs-500'>Daniela</span>
        </div>
        <button className='btn ff-remark fs-small'>Log In</button>
      </div>
      <div>
        <h5 className='fs-small fw-300'>Expenses Today</h5>
        <h1 className='ff-price fs-big'>$29.4</h1>
      </div>
      <div className='ff-remark'>
        <div>
          <span onClick={() => handleShow(true)}>+</span>
          <p className='fs-smallest'>Expense</p>
        </div>
        <div>
          <span>+</span>
          <p className='fs-smallest'>Stats</p>
        </div>
      </div>
    </div>
  )
}
