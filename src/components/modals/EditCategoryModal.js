import { Form, Modal, Button } from "react-bootstrap"

import React, { useRef } from 'react'
import { useCategories } from "../../contexts/CategoriesContext"

export const EditCategoryModal = ({ show, handleClose, category }) => {
  const nameRef = useRef()
  const maxRef = useRef()
  const { updateBudget } = useCategories()
  function handleSubmit(e) {
    e.preventDefault()
    updateBudget({
      name: nameRef.current.value,
      max: maxRef.current.value, 
      id: category.id
    })
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required defaultValue={category.name} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              defaultValue={category.max}
              ref={maxRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Edit
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}
