import React, { useState } from 'react'
import { AddCategoryModal } from './AddCategoryModal'
import { AddExpenseModal } from './AddExpenseModal'
import { Categories } from './Categories'
import { Welcome } from './Welcome'

export const Home = () => {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)

  return (
    <div className='home'>
      <Welcome
        handleShow={setShowAddExpenseModal}
      />
      <Categories 
        handleShow={setShowAddBudgetModal}
      />
      <AddCategoryModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        defaultCategory=''
        isDisabled={false}
        action="Add"
      />
    </div>
  )
}
