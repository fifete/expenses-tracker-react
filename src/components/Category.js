import React from 'react'
import { useCategories } from '../contexts/CategoriesContext'
import { ConfirmModal } from './ConfirmModal'
import { OptionsModal } from './OptionsModal'

export const CategoryView = () => {
  const { deleteBudget } = useCategories()
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  return (
    <>
      <div>
        <div>
          <div>
            <i>⬅</i>
            <OptionsModal
              // onClick={deleteBudget}
              handleShowEdit={setShowEditModal}
              handleShowDelete={setShowDeleteModal}
            />
          </div>
          <div>
            <i>🍔</i>
            <h2>Food</h2>
            <div>
              <div>
                <h5>$14.5</h5>
                <h5> / $20</h5>
              </div>
              <div className='categ-percent-bar'></div>
            </div>
          </div>
        </div>
        <div>
          <button>Add Expense</button>
          <div className='categ-expenses'>
            <div className='categ-spent'>
              <div className='spent-info'>
                <div>
                  <p>Hamburguer</p>
                  <h5>$5.3</h5>
                </div>
                <div>
                  <p>8:21 pm</p>
                  <p>12/21/2022</p>
                </div>
              </div>
              <div className='spent-edit-tools'>
                <i>🖋</i>
                <i>🗑</i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        title="Confirm Edit"
        body="Do you want to edit this item?"
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        onConfirm={() => console.log('edit clicked')}
      />
      <ConfirmModal
        title="Confirm Delete"
        body="Do you want to delete this item?"
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        onConfirm={() => console.log('delete clicked')}
      />
    </>
  )
}
