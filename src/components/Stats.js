import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useCategories } from '../contexts/CategoriesContext';
import '../styles/stats.css'

export const Stats = () => {
  const { getCategoriesAmount, getTotalDailySpent, uid } = useCategories()
  const [categoriesAmount, setcategoriesAmount] = useState([])
  const [totalDailySpent, setTotalDailySpent] = useState(0)
  const navigate = useNavigate();
  const date = new Date().toLocaleString().split(',')[0]

  useEffect(() => {
    async function fetchAmount() {
      const categoriesAmountResponse = await getCategoriesAmount(date);
      setcategoriesAmount(categoriesAmountResponse)
      const dailySpent = await getTotalDailySpent(uid, date)
      setTotalDailySpent(dailySpent)
    }
    fetchAmount();
  }, []);

  return (
    <div className='custom-stack-1-5 container-limits stats'>
      <div className='flex fs-700'>
        <i
          className='uil uil-angle-left-b'
          onClick={() => navigate("/home")}></i>
      </div>
      {
        categoriesAmount.length !== 0 ?
          <>
            <div className='flex stats-top'>
              <h2 className='fs-500'>My expenses</h2>
              <div className='ff-remark fs-smallest'>
                <span>Today</span>
                <i className='uil uil-angle-down'></i>
              </div>
            </div>
            <div className='flex center stats-daily-expense'>
              <span className="ff-price fs-500">${totalDailySpent}</span>
              <PieChart width={150} height={200}>
                <Pie
                  data={categoriesAmount}
                  cx={75}
                  cy={100}
                  innerRadius={60}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="spending_amount"
                >
                  {categoriesAmount.map(category => {
                    return <Cell key={category.id} fill={category.color} />
                  })}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
            <div className='custom-stack-1'>
              {
                categoriesAmount.map(category => (
                  <div className='flex card-custom center stats-category'>
                    <div className='flex center'>
                      <div style={{ backgroundColor: category.color }} className='category-circle'></div>
                      <p className='fs-small fw-500'>{category.name}</p>
                    </div>
                    <span className='ff-price'>${category.spending_amount}</span>
                  </div>
                ))
              }
            </div>
          </> :
          <div class="custom-stack-1-5 stats-fails">
            <h3> No expenses yet</h3>
            <img src='/oh-no.webp' alt='oh no giph' />
          </div>
      }
    </div>
  )
}
