import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useCategories } from '../contexts/CategoriesContext'
import { AddExpenseModal } from './AddExpenseModal';
import { ConfirmModal } from './ConfirmModal'
import { Expense } from './Expense';
import { OptionsModal } from './OptionsModal'

export const CategoryView = () => {
  const { getBudgetExpenses, deleteExpense } = useCategories()
  const [showTooltip, setShowTooltip] = useState(false);
  const [showDeleteModalCategory, setShowDeleteModalCategory] = useState(false);
  const [showDeleteModalExpense, setShowDeleteModalExpense] = useState({ isOpen: false, expenseID: '' });
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)

  const location = useLocation();
  const { cardId, cardName, cardMax, cardAmount } = location.state ? location.state : { cardId: 0, cardName: 'current category', cardMax: 0, cardAmount: 0 }
  const expenses = getBudgetExpenses(cardId)

  React.useEffect(() => {
    setShowTooltip(!showDeleteModalCategory)
  }, [showDeleteModalCategory])
  return (
    <>
      <div>
        <div>
          <div>
            <i>⬅</i>
            <OptionsModal
              handleShowDelete={setShowDeleteModalCategory}
              showTooltip={showTooltip}
            />
          </div>
          <div>
            <i>🍔</i>
            <h2>{cardName}</h2>
            <div>
              <div>
                <h5>${cardAmount}</h5>
                <h5> / ${cardMax}</h5>
              </div>
              <div className='categ-percent-bar'></div>
            </div>
          </div>
        </div>
        <div>
          <button onClick={() => setShowAddExpenseModal(true)}>Add Expense</button>
          <div className='categ-expenses'>
            {
              expenses.map(expenseInfo => (
                <Expense
                  expense={expenseInfo}
                  key={expenseInfo.id}
                  handleShowDelete={() => setShowDeleteModalExpense(prev => ({
                    ...prev,
                    isOpen: true,
                    expenseID: expenseInfo.id
                  }))}
                />
              ))
            }
          </div>
        </div>
      </div>

      <ConfirmModal
        title="Confirm delete"
        body="Do you want to delete this category?"
        show={showDeleteModalCategory}
        handleClose={() => setShowDeleteModalCategory(false)}
        onConfirm={() => console.log('delete clicked')}
      />
      <ConfirmModal
        title="Confirm delete"
        body="Do you want to delete this expense?"
        show={showDeleteModalExpense.isOpen}
        handleClose={() => setShowDeleteModalExpense(prev => ({ ...prev, isOpen: false }))}
        onConfirm={() => {
          setShowDeleteModalExpense(prev => ({ ...prev, isOpen: false }))
          deleteExpense(showDeleteModalExpense.expenseID)
        }}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        defaultCategory={cardName}
        isDisabled={true}
      />
    </>
  )
}
