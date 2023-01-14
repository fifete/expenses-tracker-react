import React, { useContext, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

const CategoriesContext = React.createContext()

export function useCategories() {
  return useContext(CategoriesContext)
}

export function CategoriesProvider({ children }) {
  const [budgets, setBudgets] = useState([])
  const [expenses, setExpenses] = useState([])
  const [isUpdatedCategory, setIsUpdatedCategory] = useState(false)

  function getCategoryExpenses(budgetId) {
    return expenses.filter(expense => expense.categoryId === budgetId)
  }

  async function addExpense({ date, time, description, amount, budgetId }) {
    const expense = {
      categoryId: budgetId,
      description: description,
      amount: amount,
      date: date,
      time: time        
    }

    const requestOptions = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(expense)
    }

    const response = await fetch('https://localhost:7285/api/Expenses', requestOptions);
    if (!response.ok) {
      console.log(response)
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const expenseResponse = await response.json();
    console.log(expenseResponse)
    setExpenses(prevExpenses => {
      return [...prevExpenses, expenseResponse]
    })
  }

  async function updateExpense({ date, time, description, amount, expenseId }) {
    const updatedExpense = {
      date,
      time,
      amount,
      description
    }

    const requestOptions = {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedExpense)
    }

    const response = await fetch(`https://localhost:7285/api/Expenses/${expenseId}`, requestOptions);

    if (!response.ok) {
      console.log(response)
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    setExpenses(prevExpenses => {
      const expenseToUpdate = prevExpenses.find(expense => expense.id === expenseId)
      if (expenseToUpdate) {
        expenseToUpdate.date = date
        expenseToUpdate.description = description
        expenseToUpdate.amount = amount
      }
      return prevExpenses
    })
  }

  async function deleteExpense(expenseID) {
    const requestOptions = { method: "DELETE" }

    const response = await fetch(`https://localhost:7285/api/Expenses/${expenseID}`, requestOptions);

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== expenseID)
    })
  }

  function getBudgetById(budgetId) {
    return budgets.find(budget => budget.id === budgetId)
  }

  async function addBudget({ name, max, emoji, color }) {
    const category = {
      userIdTemp: uuidv4(),
      name,
      maxBudget: max,
      spendingAmount: 0,
      emoji,
      color
    }

    const requestOptions = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(category)
    }

    const response = await fetch('https://localhost:7285/api/Categories', requestOptions);
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const addBudgetResponse = await response.json();
    setBudgets(prevBudgets => {
      if (prevBudgets.find(budget => budget.name === name)) {
        return prevBudgets
      }
      return [...prevBudgets, addBudgetResponse]
    })
  }

  async function updateBudget({ name, max, color, emoji, id }) {
    const updatedCategory = {
      name,
      maxBudget: max,
      emoji,
      color
    }

    const requestOptions = {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedCategory)
    }

    const response = await fetch(`https://localhost:7285/api/Categories/${id}`, requestOptions);

    if (!response.ok) {
      console.log(response)
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const UpdatedBudgetResponse = await response.json();

    setBudgets(prevBudgets => {
      const budgetToUpdate = prevBudgets.find(budget => budget.id === id)
      if (budgetToUpdate) {
        budgetToUpdate.name = UpdatedBudgetResponse.name
        budgetToUpdate.maxBudget = UpdatedBudgetResponse.maxBudget
        budgetToUpdate.emoji = UpdatedBudgetResponse.emoji
        budgetToUpdate.color = UpdatedBudgetResponse.color 
      }
      return prevBudgets
    })

    setIsUpdatedCategory(prev => !prev)
  }

  async function deleteBudget(id) {
    const requestOptions = { method: "DELETE" }

    const response = await fetch(`https://localhost:7285/api/Categories/${id}`, requestOptions);

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== id)
    })

    setBudgets(prevBudgets => {
      return prevBudgets.filter(budget => budget.id !== id)
    })
  }

  const value = {
    budgets,
    expenses,
    addExpense,
    addBudget,
    deleteExpense,
    deleteBudget,
    updateExpense,
    updateBudget,
    // setBudgets,
    // setExpenses,
    getBudgetById,
    getBudgetExpenses: getCategoryExpenses,
    isUpdatedCategory
  }

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}