import React, { useRef, useState } from 'react'
import { Form, Modal, Button } from "react-bootstrap"
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import { useCategories } from '../contexts/CategoriesContext';

export const EditExpenseModal = ({
  show, handleClose, defaultCategory, isDisabled
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const descriptionRef = useRef()
  const amountRef = useRef()
  const budgetIdRef = useRef()
  const { budgets } = useCategories()

  function handleSubmit(e) {
    e.preventDefault()
    console.log("updated")
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Category</Form.Label>
            <Form.Select
              disabled={isDisabled}
              defaultValue={defaultCategory ? defaultCategory : 'Uncategorized'}
              ref={budgetIdRef}
            >
              {budgets.map(budget => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
              <option>Uncategorized</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group controlId="formDate">
            <Form.Label>Date and Time</Form.Label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Update
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}
