import React from 'react'
import { useCategories } from '../contexts/CategoriesContext'
import { CategoryCard } from './CategoryCard'

export const Categories = ({
  handleShow
}) => {
  const { budgets, getBudgets, getBudgetExpenses } = useCategories()
  const budgetsResponse = getBudgets()

  return (
    <div className='categories'>
      <div>
        <h3>Categories</h3>
        <button onClick={() => handleShow(true)}>+</button>
      </div>
      <div className='categories-cards'>
        {
          budgets ?
            budgets.map(budget => {
              const amount = getBudgetExpenses(budget.id).reduce(
                (total, expense) => total + expense.amount,
                0
              )
              return (
                <CategoryCard
                  key={budget.id}
                  id={budget.id}
                  name={budget.name}
                  amount={amount}
                  emoji={budget.emoji}
                  color={budget.color}
                  max={budget.maxBudget}
                />
              )
            }) :
            <div>Reload Page</div>
        }

      </div>
    </div>
  )
}
