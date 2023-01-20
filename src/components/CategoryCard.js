import React from 'react'
import { ProgressBar } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export const CategoryCard = ({
  id, name,
  amount,
  emoji,
  max,
  color
}) => {
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

function getProgressBarVariant(amount, max) {
  const ratio = amount / max
  if (ratio < 0.5) {
    return 'primary'
  } else if (ratio < 0.75) {
    return 'warning'
  }
  return 'danger'
}