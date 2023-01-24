import React, { useEffect, useState } from 'react'
import { ProgressBar } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useCategories } from '../contexts/CategoriesContext';
import '../styles/categoryCard.css';

export const CategoryCard = ({
  id, name,
  emoji,
  max,
  color
}) => {
  const { getCategoryAmount, isUpdatedAmount, setIsUpdatedAmount } = useCategories()
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    async function fetchAmount() {
      const categoryAmount = await getCategoryAmount(id);
      console.log(categoryAmount)
      setAmount(categoryAmount)
    }
    fetchAmount();
  }, []);

  useEffect(() => {
    async function fetchAmount() {
      if (isUpdatedAmount) {
        const categoryAmount = await getCategoryAmount(id);
        console.log(categoryAmount, 'isUpdatedAmount')
        setAmount(categoryAmount)
        setIsUpdatedAmount(false)
      }
    }
    fetchAmount();
  }, [isUpdatedAmount]);

  return (
    <div>
      <Link
        to="/category"
        state={{
          cardId: id,
          name,
          spendingAmount: amount,
          maxBudget: max,
          color,
          emoji
        }}
        className='flex card-custom category-card link-reset'
      >
        <div>
          <span className='flex card-emoji' style={{ border: `1px solid ${color}` }}>
            {emoji}
          </span>
          <p className='card-name fs-smallest'>{name}</p>
          <h2 className='ff-price fs-600 fw-500'>${amount}</h2>
        </div>
        {max && (
          <div className='categ-percent-bar'>
            <div className="progress">
              <div className="progress-bar" role="progressbar" style={{height: `${getProgressBarVariant(amount, max)}%`, width: '100%'}} aria-valuenow={amount} aria-valuemin="0" aria-valuemax={max}></div>
              <div className="progress-bar-label ff-remark">{getProgressBarVariant(amount, max)}%</div>
            </div>
          </div>
        )}
      </Link>
    </div>
  )
}

function getProgressBarVariant(expensesAmount, max) {
  const percentage = Math.round(expensesAmount / max * 100).toFixed(0)
  const percentageNumber = parseFloat(percentage)
  if(percentageNumber > 100) return 100
  return percentageNumber
}
