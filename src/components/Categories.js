import React, { useEffect } from 'react'
import { useCategories } from '../contexts/CategoriesContext'
import { CategoryCard } from './CategoryCard'
import '../styles/categories.css';

export const Categories = ({
  handleShow
}) => {
  const { budgets, getBudgets } = useCategories()
  useEffect(() => {
    getBudgets();
  }, []);

  return (
    <div className='categories container-limits'>
      <div>
        <h3 className='fs-500'>Categories</h3>
        <span
          className="uil uil-plus-circle"
          onClick={() => handleShow(true)}
        ></span>
      </div>
      <div className='categories-cards'>
        {
          budgets.map(budget => {
            return (
              <CategoryCard
                key={budget.id}
                id={budget.id}
                name={budget.name}
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
