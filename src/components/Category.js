import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useCategories } from '../contexts/CategoriesContext'
import { AddExpenseModal } from './modals/AddExpenseModal';
import { ConfirmModal } from './modals/ConfirmModal'
import { EditExpenseModal } from './modals/EditExpenseModal';
import { Expense } from './Expense';
import { OptionsModal } from './modals/OptionsModal'
import { EditCategoryModal } from './modals/EditCategoryModal';
import { ProgressBar } from 'react-bootstrap';
import '../styles/categoryView.css';

export const CategoryView = () => {
  const {
    expenses,
    isUpdatedCategory, setIsUpdatedCategory,
    isUpdatedAmount, setIsUpdatedAmount,
    getCategoryAmount,
    getBudgetById, getBudgetExpenses,
    deleteExpense, deleteBudget
  } = useCategories()

  const navigate = useNavigate();
  const location = useLocation();
  const [category, setCategory] = useState(false);
  const [showEditModalCategory, setShowEditModalCategory] = useState({ isOpen: false, category: {} });
  const [showDeleteModalCategory, setShowDeleteModalCategory] = useState(false);
  const [showDeleteModalExpense, setShowDeleteModalExpense] = useState({ isOpen: false, expenseID: '' });
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [showEditExpenseModal, setShowEditExpenseModal] = useState({ isOpen: false, expense: {} })
  const [amount, setAmount] = useState(0)

  const { cardId, maxBudget, spendingAmount, name, color, emoji } = location.state ? location.state : { cardId: '', maxBudget: '', spendingAmount: '', name: `Get back to previous tab to reload content`, color: '', emoji: '' }

  useEffect(() => {
    getBudgetExpenses(cardId)
  }, [])

  useEffect(() => {
    if (isUpdatedCategory) {
      setCategory(prev => ({ ...prev, ...getBudgetById(cardId) }))
      setIsUpdatedCategory(false)
    }
  }, [isUpdatedCategory])

  useEffect(() => {
    async function fetchAmount() {
      if (isUpdatedAmount) {
        const categoryAmount = await getCategoryAmount(cardId);
        setAmount(categoryAmount)
        setIsUpdatedAmount(false)
      }
    }
    fetchAmount();
  }, [isUpdatedAmount]);

  return (
    <>
      <div className='category_view custom-stack-2-5 container-limits custom-stack'>
        {
          category ?
            <div className='category_view-info custom-stack-1-5 custom-stack'>
              <div className='category-top flex fs-700'>
                <i
                  className='uil uil-angle-left-b'
                  onClick={() => navigate("/home")}></i>
                {
                  cardId !== 2 &&
                  <OptionsModal
                    handleShowDelete={setShowDeleteModalCategory}
                    handleShowEdit={() => setShowEditModalCategory(prev => ({
                      ...prev,
                      isOpen: true,
                      category: {
                        id: cardId,
                        name: category.name,
                        max: category.maxBudget,
                        color: category.color,
                        emoji: category.emoji
                      }
                    }))}
                  />
                }
              </div>
              <div className='custom-stack-1'>
                <div>
                  <span>{category.emoji}</span>
                </div>
                <h2 className='category_view-title fs-600 fw-500'>{category.name}</h2>
                <div className='custom-stack-0-5'>
                  <div className='category_view-amount flex'>
                    <span className='ff-price'>${amount ? amount : spendingAmount}</span>
                    <span className='ff-price'> / ${category.maxBudget}</span>
                  </div>
                  {maxBudget && (
                    <div className='categ-percent-bar'>
                      <ProgressBar
                        className="rounded-pill"
                        variant={getProgressBarVariant(amount ? amount : spendingAmount, category.maxBudget)}
                        min={0}
                        max={category.maxBudget}
                        now={amount ? amount : spendingAmount}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            :
            <div className='category_view-info custom-stack-1-5 custom-stack'>
              <div className='category-top flex fs-700'>
                <i
                  className='uil uil-angle-left-b'
                  onClick={() => navigate("/home")}></i>
                {
                  cardId !== 2 &&
                  <OptionsModal
                    handleShowDelete={setShowDeleteModalCategory}
                    handleShowEdit={() => setShowEditModalCategory(prev => ({
                      ...prev,
                      isOpen: true,
                      category: {
                        id: cardId,
                        name: name,
                        max: maxBudget,
                        color: color,
                        emoji: emoji
                      }
                    }))}
                  />
                }
              </div>
              <div className='custom-stack-1'>
                <div>
                  <span>{emoji}</span>
                </div>
                <h2 className='category_view-title fs-600 fw-500'>{name}</h2>
                <div className='custom-stack-0-5'>
                  <div className='category_view-amount flex'>
                    <span className='ff-price'>${amount ? amount : spendingAmount}</span>
                    <span className='ff-price'> / ${maxBudget}</span>
                  </div>
                  {maxBudget && (
                    <div className='categ-percent-bar'>
                      <ProgressBar
                        className="rounded-pill"
                        variant={getProgressBarVariant(amount ? amount : spendingAmount, maxBudget)}
                        min={0}
                        max={maxBudget}
                        now={amount ? amount : spendingAmount}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
        }

        <div className='custom-stack-2'>
          <button
            className='btn-custom btn-traslucid ff-remark fs-small fw-600'
            onClick={() => setShowAddExpenseModal(true)}
          >
            Add Expense
          </button>
          <div className='grid categ-expenses'>
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
        defaultCategory={category ? category.id : cardId}
        isDisabled={true}
      />

      <EditExpenseModal
        show={showEditExpenseModal.isOpen}
        handleClose={() => setShowEditExpenseModal(prev => ({ ...prev, isOpen: false }))}
        expense={showEditExpenseModal.expense}
        defaultCategory={category ? category.name : name}
        isDisabled={true}
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