import React from 'react'
import { ProgressBar } from 'react-bootstrap'

export const CategoryCard = ({
  name,
  amount,
  max
}) => {
  return (
    <div>
      <div>
        <i>🍔</i>
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
    </div>
  )
}

function getProgressBarVariant(amount, max) {
  const ratio = amount/max
  if (ratio < 0.5) {
    return 'primary'
  } else if (ratio < 0.75) {
    return 'warning'
  }
  return 'danger'
}