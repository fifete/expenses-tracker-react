import React, { useState } from 'react'
import { AddCategoryModal } from './AddCategoryModal'
import { Categories } from './Categories'
import { Welcome } from './Welcome'

export const Home = () => {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)

  return (
    <div className='home'>
      <Welcome
        setShowAddBudgetModal={setShowAddBudgetModal}
      />
      <Categories />
      <AddCategoryModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
    </div>
  )
}
