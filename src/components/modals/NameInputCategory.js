import React, { useState } from 'react'
import { Form } from "react-bootstrap"

export const NameInputCategory = ({ nameRef, name }) => {
  const [categoryLength, setCategoryNameLength] = useState(() => {
    return name ? name.split(" ").join('').length : 0
  });

  const [isFocused, setIsFocused] = useState(false);
  const [isOverLimit, setIsOverLimit] = useState(false);

  const handleNameCategoryChange = (e) => {
    setCategoryNameLength(e.target.value.split(" ").join('').length);
    setIsOverLimit(categoryLength > 20);
  };

  return (
    <Form.Group className="mb-3" controlId="name">
      <Form.Label>Name</Form.Label>
      <Form.Control
        ref={nameRef}
        type="text"
        required
        maxLength={25}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleNameCategoryChange}
        className={isOverLimit ? "is-invalid" : ""}
        defaultValue={name} />
      {isFocused && (
        <Form.Text className="text-muted">
          {categoryLength}/20 words used
        </Form.Text>
      )}
      <Form.Control.Feedback type="invalid">
        Exceeded the maximum word limit of 20 words.
      </Form.Control.Feedback>
    </Form.Group>
  )
}
