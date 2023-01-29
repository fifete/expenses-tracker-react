import React, { useContext, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

const CategoriesContext = React.createContext()
let uid
if(sessionStorage.getItem('uid')){
  uid = sessionStorage.getItem('uid')
} else {
  uid = uuidv4()
  sessionStorage.setItem('uid', uid)
}

export function useCategories() {
  return useContext(CategoriesContext)
}

export function CategoriesProvider({ children }) {
  const [budgets, setBudgets] = useState([])
  const [expenses, setExpenses] = useState([])
  const [isUpdatedAmount, setIsUpdatedAmount] = useState(false)
  const [isUpdatedCategory, setIsUpdatedCategory] = useState(false)

  async function getCategoryAmount(budgetId) {
    const response = await fetch(`https://expensestrackerapi.up.railway.app/api/CategoryExpenses/${budgetId}`);

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const amount = await response.json();
    console.log(amount)

    return amount.spendingamount
  }

  async function getCategoryExpenses(budgetId) {
    const response = await fetch(`https://expensestrackerapi.up.railway.app/api/Expenses?categoryId=${budgetId}`);

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const expenses = await response.json();
    setExpenses(expenses)
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

    const response = await fetch('https://expensestrackerapi.up.railway.app/api/Expenses', requestOptions);
    if (!response.ok) {
      console.log(response)
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    getCategoryExpenses(budgetId)
    setIsUpdatedAmount(true)
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

    const response = await fetch(`https://expensestrackerapi.up.railway.app/api/Expenses/${expenseId}`, requestOptions);

    if (!response.ok) {
      console.log(response)
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const UpdatedExpenseResponse = await response.json();

    getCategoryExpenses(UpdatedExpenseResponse.categoryId)

    setIsUpdatedAmount(true)
  }

  async function deleteExpense(expenseID) {
    const requestOptions = { method: "DELETE" }

    const response = await fetch(`https://expensestrackerapi.up.railway.app/api/Expenses/${expenseID}`, requestOptions);

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== expenseID)
    })

    setIsUpdatedAmount(true)
  }

  async function getBudgets(uidTemp) {
    const response = await fetch(`https://expensestrackerapi.up.railway.app/api/Categories?UserIdTemp=${uidTemp}`);

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const budgets = await response.json();

    setBudgets(budgets)
  }

  function getBudgetById(budgetId) {
    return budgets.find(budget => budget.id === budgetId)
  }

  async function addBudget({ name, max, emoji, color }) {
    const category = {
      userIdTemp: sessionStorage.getItem('uid'),
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

    const response = await fetch('https://expensestrackerapi.up.railway.app/api/Categories', requestOptions);
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

    const response = await fetch(`https://expensestrackerapi.up.railway.app/api/Categories/${id}`, requestOptions);

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

    setIsUpdatedCategory(true)
  }

  async function deleteBudget(id) {
    const requestOptions = { method: "DELETE" }

    const response = await fetch(`https://expensestrackerapi.up.railway.app/api/Categories/${id}`, requestOptions);

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
    getBudgets,
    addExpense,
    addBudget,
    deleteExpense,
    deleteBudget,
    updateExpense,
    updateBudget,
    getBudgetById,
    getBudgetExpenses: getCategoryExpenses,
    isUpdatedCategory, setIsUpdatedCategory,
    getCategoryAmount,
    isUpdatedAmount, setIsUpdatedAmount
    // expensesAmount, setExpensesAmount
  }

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}