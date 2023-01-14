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
        to="/other-page"
        state={{
          cardId: id,
          name,
          spendingAmount: amount,
          maxBudget: max,
          color,
          emoji
        }}
      >
        <div>
          <div style={{ border: `1px solid ${color}` }}>
            <span>{emoji}</span>
          </div>
          <p>{name}</p>
          <h2>${amount}</h2>
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