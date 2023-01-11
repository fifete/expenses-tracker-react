import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useCategories } from '../contexts/CategoriesContext'
import { AddExpenseModal } from './modals/AddExpenseModal';
import { ConfirmModal } from './modals/ConfirmModal'
import { EditExpenseModal } from './modals/EditExpenseModal';
import { Expense } from './Expense';
import { OptionsModal } from './modals/OptionsModal'
import { EditCategoryModal } from './modals/EditCategoryModal';
import { ProgressBar } from 'react-bootstrap';

export const CategoryView = () => {
  const { getBudgetExpenses, deleteExpense, deleteBudget } = useCategories()

  const [showEditModalCategory, setShowEditModalCategory] = useState({ isOpen: false, category: {} });
  const [showDeleteModalCategory, setShowDeleteModalCategory] = useState(false);
  const [showDeleteModalExpense, setShowDeleteModalExpense] = useState({ isOpen: false, expenseID: '' });
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [showEditExpenseModal, setShowEditExpenseModal] = useState({ isOpen: false, expense: {} })

  const navigate = useNavigate();
  const location = useLocation();
  const { cardId, cardName, cardMax, cardAmount, color, emoji } = location.state ? location.state : { cardId: 0, cardName: 'current category', cardMax: 0, cardAmount: 0 }
  const expenses = getBudgetExpenses(cardId)

  return (
    <>
      <div>
        <div>
          <div>
            <i onClick={() => navigate("/home")}>⬅</i>
            <OptionsModal
              handleShowDelete={setShowDeleteModalCategory}
              handleShowEdit={() => setShowEditModalCategory(prev => ({
                ...prev,
                isOpen: true,
                category: { id: cardId, name: cardName, max: cardMax,color, emoji }
              }))}
            />
          </div>
          <div>
            <span>{emoji}</span>
            <h2>{cardName}</h2>
            <div>
              <div>
                <h5>${cardAmount}</h5>
                <h5> / ${cardMax}</h5>
              </div>
              <div className='categ-percent-bar'></div>
              {cardMax && (
                <ProgressBar
                  className="rounded-pill"
                  variant={getProgressBarVariant(cardAmount, cardMax)}
                  min={0}
                  max={cardMax}
                  now={cardAmount}
                />
              )}
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
                  handleShowEdit={() => setShowEditExpenseModal(prev => ({
                    ...prev,
                    isOpen: true,
                    expense: expenseInfo
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
        onConfirm={() => {
          setShowDeleteModalCategory(false)
          navigate("/home");
          deleteBudget(cardId)
        }}
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

      <EditCategoryModal
        show={showEditModalCategory.isOpen}
        handleClose={() => setShowEditModalCategory(prev => ({ ...prev, isOpen: false }))}
        category={showEditModalCategory.category}
      />

      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        defaultCategory={cardName}
        isDisabled={true}
      />

      <EditExpenseModal
        show={showEditExpenseModal.isOpen}
        handleClose={() => setShowEditExpenseModal(prev => ({ ...prev, isOpen: false }))}
        expense={showEditExpenseModal.expense}
        defaultCategory={cardName}
        isDisabled={false}
      />
    </>
  )
}

function getProgressBarVariant(amount, max) {
  const ratio = amount / max
  if (ratio < 0.5) {
    return 'primary'
  } else if (ratio < 0.75) {
    return 'warning'
  }
  return 'danger'
}