import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useCategories } from '../contexts/CategoriesContext';
import '../styles/welcome.css';

export const Welcome = ({
  handleShow
}) => {
  let navigate = useNavigate();
  const {
    uid, getTotalDailySpent, isDeletedCategory,
    isUpdatedCategory, isUpdatedAmount,
  } = useCategories()
  const [totalDailySpent, setTotalDailySpent] = useState(0)
  const date = new Date().toLocaleString().split(',')[0]

  useEffect(() => {
    async function fetchAmount() {
      const dailySpent = await getTotalDailySpent(uid, date)
      setTotalDailySpent(dailySpent)
    }
    fetchAmount();
  }, [isUpdatedAmount, isUpdatedCategory, isDeletedCategory]);

  return (
    <div className='welcome flex container-limits' id='welcome'>
      <div className='flex justify-content-between align-items-start'>
        <div>
          <h5 className='fs-small fw-300'>Hello,</h5>
          <span className='name ff-remark fs-500 fw-600'>Welcome!</span>
        </div>
        <button
          className='btn-custom btn-traslucid ff-remark fs-small fw-600'
          onClick={() => {
            console.log('Log In')
            navigate('/coming')
          }}
        >Log In
        </button>
      </div>
      <div>
        <h5 className='fs-small fw-300'>Expenses Today</h5>
        <h1 className='ff-price fs-big'>${totalDailySpent}</h1>
      </div>
      <div className='welcome-buttons flex ff-remark'>
        <div className='welcome-btn-container grid'>
          <span
            className='btn-custom btn-traslucid flex justify-content-center align-items-center'
            onClick={() => navigate('/coming')}
          >
            <i className="uil uil-graph-bar fs-icon fw-600"></i>
          </span>
          <p className='fs-smallest'>Stats</p>
        </div>
        <div className='welcome-btn-container grid'>
          <span
            className='btn-custom btn-traslucid flex justify-content-center align-items-center'
            onClick={() => handleShow(true)}
          >
            <i className="uil uil-plus fs-icon fw-600"></i>
          </span>
          <p className='fs-smallest'>Expense</p>
        </div>
      </div>
    </div>
  )
}
