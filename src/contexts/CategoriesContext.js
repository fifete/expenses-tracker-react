import React, { useContext, useState } from "react"

const CategoriesContext = React.createContext()

export function useCategories() {
  return useContext(CategoriesContext)
}

export function CategoriesProvider({ children }) {
  const [budgets, setBudgets] = useState([])
  const [expenses, setExpenses] = useState([])

  function getBudgetExpenses(budgetId) {
    return expenses.filter(expense => expense.budgetId === budgetId)
  }

  function addBudget() {
    console.log('budget added')
  }

  const value = {
    budgets,
    // setBudgets,
    // expenses,
    // setExpenses,
    addBudget,
    getBudgetExpenses
  }

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}