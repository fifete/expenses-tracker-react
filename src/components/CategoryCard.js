import React, { useEffect, useState } from 'react'
import { ProgressBar } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useCategories } from '../contexts/CategoriesContext';

export const CategoryCard = ({
  id, name,
  // expensesAmount,
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
        className='card category-card'
      >
        <div>
          <div style={{ border: `1px solid ${color}` }}>
            <span>{emoji}</span>
          </div>
          <p className='fs-smallest'>{name}</p>
          <h2 className='ff-price fs-600 fw-500'>${amount}</h2>
        </div>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
      </Link>
    </div>
  )
}

function getProgressBarVariant(expensesAmount, max) {
  const ratio = expensesAmount / max
  if (ratio < 0.5) {
    return 'primary'
  } else if (ratio < 0.75) {
    return 'warning'
  }
  return 'danger'
}