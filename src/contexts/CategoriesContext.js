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

  function updateExpense({ date, description, amount, budgetId, expenseId }) {
    setExpenses(prevExpenses => {
      const expenseToUpdate = prevExpenses.find(expense => expense.id === expenseId)
      if (expenseToUpdate) {
        expenseToUpdate.date = date
        expenseToUpdate.description = description
        expenseToUpdate.amount = amount
        expenseToUpdate.budgetId = budgetId
      }
      return prevExpenses
    })
  }

  function deleteExpense(expenseID) {
    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== expenseID)
    })
  }

  function addBudget({ name, max, emoji, color }) {
    setBudgets(prevBudgets => {
      if (prevBudgets.find(budget => budget.name === name)) {
        return prevBudgets
      }
      return [...prevBudgets, { id: uuidv4(), name, max, emoji, color }]
    })
  }

  function updateBudget({ name, max, id }) {
    setBudgets(prevBudgets => {
      const budgetToUpdate = prevBudgets.find(budget => budget.id === id)
      if (budgetToUpdate) {
        budgetToUpdate.name = name
        budgetToUpdate.max = max
      }
      return prevBudgets
    })
  }

  function deleteBudget(id) {
    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== id)
    })

    setBudgets(prevBudgets => {
      return prevBudgets.filter(budget => budget.id !== id)
    })
  }

  const value = {
    budgets,
    addExpense,
    deleteExpense,
    updateExpense,
    // setBudgets,
    expenses,
    // setExpenses,
    deleteBudget,
    addBudget,
    updateBudget,
    getBudgetExpenses
  }

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}