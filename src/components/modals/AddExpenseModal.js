import React, { useRef, useState } from 'react'
import { Form, Modal, Button } from "react-bootstrap"
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import { useCategories } from '../../contexts/CategoriesContext';
import { NameInputExpense } from './NameInputExpense';
import '../../styles/modals.css'

export const AddExpenseModal = ({
  show, handleClose, defaultCategory, isDisabled
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const descriptionRef = useRef()
  const amountRef = useRef()
  const budgetIdRef = useRef()
  const { addExpense, budgets } = useCategories()

  function handleSubmit(e) {
    e.preventDefault()
    addExpense({
      date: selectedDate.toLocaleString().split(',')[0],
      time: selectedDate.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }),
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    })
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-custom ff-remark">
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              max={9999.99}
              step={0.01}
              pattern="^\d+(\.\d{1,2})?$"
              title="Please enter an amount below 10 000"
              onInvalid={(e) => {
                e.target.setCustomValidity("Please enter a valid amount")
              }}
              onInput={(e) => {
                e.target.setCustomValidity("")
              }}
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
            </Form.Select>
          </Form.Group>

          <NameInputExpense
            description=''
            descriptionRef={descriptionRef}
          />

          <Form.Group controlId="formDate" className="mb-3">
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
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}
