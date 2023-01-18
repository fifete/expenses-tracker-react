import React, { useState } from 'react'
import { Form } from "react-bootstrap"


export const NameInputExpense = ({ descriptionRef, description }) => {
  const [descriptionLength, setDescriptionLength] = useState(() => {
    if (description) {
      return description.split(" ").join('').length;
    } else {
      return 0;
    }
  });

  const [isFocused, setIsFocused] = useState(false);
  const [isOverLimit, setIsOverLimit] = useState(false);

  const handleDescriptionChange = (e) => {
    setDescriptionLength(e.target.value.split(" ").join('').length);
    setIsOverLimit(descriptionLength > 20);
  };

  return (
    <Form.Group className="mb-3" controlId="description">
      <Form.Label>Description</Form.Label>
      <Form.Control
        ref={descriptionRef}
        type="text"
        required
        maxLength={25}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleDescriptionChange}
        className={isOverLimit ? "is-invalid" : ""}
        defaultValue={description} />

      {isFocused && (
        <Form.Text className="text-muted">
          {descriptionLength}/20 words used
        </Form.Text>
      )}
      <Form.Control.Feedback type="invalid">
        Exceeded the maximum word limit of 20 words.
      </Form.Control.Feedback>
    </Form.Group>
  )
}
