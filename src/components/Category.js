import React from 'react'
import { useLocation } from 'react-router-dom';
import { useCategories } from '../contexts/CategoriesContext'
import { ConfirmModal } from './ConfirmModal'
import { OptionsModal } from './OptionsModal'

export const CategoryView = () => {
  const { deleteBudget } = useCategories()
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const location = useLocation();
  console.log(location)
  console.log(location.state)
  const {cardId, cardName, cardMax, cardAmount} = location.state? location.state : {cardId: 0, cardName: '', cardMax: 0, cardAmount: 0}

  React.useEffect(() => {
    console.log(showEditModal || showDeleteModal)
    console.log('Boolean', showEditModal, showDeleteModal)
    setShowTooltip(!showEditModal || showDeleteModal)
  }, [showEditModal, showDeleteModal])
  return (
    <>
      <div>
        <div>
          <div>
            <i>⬅</i>
            <OptionsModal
              handleShowEdit={setShowEditModal}
              handleShowDelete={setShowDeleteModal}
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
        action='Edit'
        handleClose={() => setShowEditModal(false)}
        onConfirm={() => console.log('edit clicked')}
      />
      <ConfirmModal
        title="Confirm Delete"
        body="Do you want to delete this item?"
        show={showDeleteModal}
        action='Delete'
        handleClose={() => setShowDeleteModal(false)}
        onConfirm={() => console.log('delete clicked')}
      />
    </>
  )
}
