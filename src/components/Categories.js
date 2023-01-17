import React, { useEffect } from 'react'
import { useCategories } from '../contexts/CategoriesContext'
import { CategoryCard } from './CategoryCard'

export const Categories = ({
  handleShow
}) => {
  const { budgets, getBudgets, getBudgetExpenses } = useCategories()
  useEffect(() => {
    getBudgets();
  }, []);

  let amount

  return (
    <div className='categories'>
      <div>
        <h3>Categories</h3>
        <button onClick={() => handleShow(true)}>+</button>
      </div>
      <div className='categories-cards'>
        {
            budgets.map(budget => {
              {/* const test = getBudgetExpenses(budget.id)
              if (!test) {
                const amount = test.reduce(
                  (total, expense) => total + expense.spendingAmount,
                  0
                )
              } else amount = 0 */}
              amount = 0
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
            })
        }

      </div>
    </div>
  )
}
