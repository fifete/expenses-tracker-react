import React from 'react'
import { Modal } from "react-bootstrap"
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import '../../styles/pickEmoji.css'

export const PickEmoji = ({ show, handleClose, setEmoji }) => {
  const showSelectedEmoji = (emoji) => {
    setEmoji(emoji)
    handleClose()
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select emoji</Modal.Title>
      </Modal.Header>
      <Picker data={data} onEmojiSelect={e => showSelectedEmoji(e.native)} />
    </Modal>
  )
}
