import React from 'react'

export const Welcome = ({
  setShowAddBudgetModal
}) => {
  return (
    <div className='home-welcome'>
      <div>
        <h5>Hello,
          <span>Daniela</span>
        </h5>
        <button>Log In</button>
      </div>
      <div>
        <h5>Expenses Today</h5>
        <h1>$29.4</h1>
      </div>
      <div>
        <div>
          <span onClick={() => setShowAddBudgetModal(true)}>+</span>
          <p>Expense</p>
        </div>
        <div>
          <span>+</span>
          <p>Stats</p>
        </div>
      </div>
    </div>
  )
}
