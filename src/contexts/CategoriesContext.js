import React, { useContext, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

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

  function addExpense({ date, description, amount, budgetId }) {
    setExpenses(prevExpenses => {
      return [...prevExpenses, { id: uuidv4(), description, amount, budgetId, date }]
    })
  }

  function deleteExpense(expenseID) {
    console.log(expenseID)
    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== expenseID)
    })
  }

  function addBudget({ name, max }) {
    setBudgets(prevBudgets => {
      if(prevBudgets.find(budget => budget.name === name)) {
        return prevBudgets
      }
      return [...prevBudgets, { id: uuidv4(), name, max }]
    })
  }

  function deleteBudget() {
    console.log('deleted category')
  }

  const value = {
    budgets,
    addExpense,
    deleteExpense,
    // setBudgets,
    expenses,
    // setExpenses,
    deleteBudget,
    addBudget,
    getBudgetExpenses
  }

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}