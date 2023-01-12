import React, { useContext, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

const CategoriesContext = React.createContext()

export function useCategories() {
  return useContext(CategoriesContext)
}

export function CategoriesProvider({ children }) {
  const [budgets, setBudgets] = useState([])
  const [expenses, setExpenses] = useState([])

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
      console.log(response)
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
      id,
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
    console.log(UpdatedBudgetResponse)
    ///////////////////////////////
    setBudgets(prevBudgets => {
      let budgetToUpdate = prevBudgets.find(budget => budget.id === id)
      if (budgetToUpdate) {
        budgetToUpdate = { ...UpdatedBudgetResponse }
      }
      return prevBudgets
    })
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
    addExpense,
    deleteExpense,
    updateExpense,
    // setBudgets,
    expenses,
    // setExpenses,
    getBudgetById,
    deleteBudget,
    addBudget,
    updateBudget,
    getBudgetExpenses: getCategoryExpenses
  }

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}