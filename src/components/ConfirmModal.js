import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export const ConfirmModal = ({
  title, body, show, action, handleClose, onConfirm
}) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant={action === "delete" ? "danger" : "primary"} onClick={onConfirm}>
            {action}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
