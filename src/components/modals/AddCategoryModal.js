import { Form, Modal, Button } from "react-bootstrap"
import React, { useRef, useState } from 'react'
import { useCategories } from "../../contexts/CategoriesContext"
import { PickEmoji } from "./PickEmoji"
import { colors } from "../../data/colors"
import { NameInputCategory } from "./NameInputCategory"

export const AddCategoryModal = ({ show, handleClose }) => {
  const nameRef = useRef()
  const maxRef = useRef()
  const colorRef = useRef()
  const { addBudget } = useCategories()
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [selectedEmoji, setSelectedEmoji] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    addBudget({
      name: nameRef.current.value,
      max: maxRef.current.value,
      emoji: selectedEmoji ? selectedEmoji : '💠',
      color: colorRef.current.value
    }).catch(error => {
      console.log(error.message)
    });
    setSelectedEmoji('')
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-custom ff-remark">
          <NameInputCategory nameRef={nameRef} name='' />

          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              required
              min={0}
              max={99999.99}
              step={0.01}
              pattern="^\d+(\.\d{1,2})?$"
              title="Please enter an amount below 100 000"
              onInvalid={(e) => {
                e.target.setCustomValidity("Please enter a valid amount")
              }}
              onInput={(e) => {
                e.target.setCustomValidity("")
              }}
            />
          </Form.Group>
          <Button className="mb-3" variant="outline-dark" onClick={() => setShowEmojiPicker(true)}>
            {selectedEmoji ? `Selected: ${selectedEmoji}` : 'Select Emoji'}
          </Button>
          <PickEmoji
            show={showEmojiPicker}
            handleClose={() => setShowEmojiPicker(false)}
            setEmoji={setSelectedEmoji}
          />
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Category</Form.Label>
            <Form.Select ref={colorRef}>
              {colors.map(color => (
                <option key={color.id} value={color.hexCode}>
                  {color.icon} {color.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}
