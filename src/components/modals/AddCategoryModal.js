import { Form, Modal, Button } from "react-bootstrap"
import React, { useRef, useState } from 'react'
import { useCategories } from "../../contexts/CategoriesContext"
import { PickEmoji } from "./PickEmoji"
import { colors } from "../../data/colors"

export const AddCategoryModal = ({ show, handleClose }) => {
  const nameRef = useRef()
  const maxRef = useRef()
  const colorRef = useRef()
  const { addBudget } = useCategories()
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [selectedEmoji, setSelectedEmoji] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    console.log({
      name: nameRef.current.value,
      max: maxRef.current.value,
      color: colorRef.current.value,
      emoji: selectedEmoji
    })
    addBudget({
      name: nameRef.current.value,
      max: maxRef.current.value,
      emoji: selectedEmoji
    })
    setSelectedEmoji('')
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              required
              min={0}
              step={0.01}
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
              <option>&#128711;</option>
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
