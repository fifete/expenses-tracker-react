import React from 'react'
import { useCategories } from '../contexts/CategoriesContext'
import { CategoryCard } from './CategoryCard'

export const Categories = ({
  handleShow
}) => {
  const { budgets, getBudgetExpenses } = useCategories()

  return (
    <div className='categories'>
      <div>
        <h3>Categories</h3>
        <button onClick={() => handleShow(true)}>+</button>
      </div>
      <div className='categories-cards'>
        {budgets.map(budget => {
          {/* const amount = getBudgetExpenses(budget.id).reduce(
            (total, expense) => total + expense.amount,
            0
          ) */}
          return (
            <CategoryCard
              // key={budget.id}
              // name={budget.name}
              // amount={amount}
              // max={budget.max}
            />
          )
        })}
      </div>
    </div>
  )
}
