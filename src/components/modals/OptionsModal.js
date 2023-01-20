import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

export const OptionsModal = ({
  handleShowDelete, handleShowEdit
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const openTooltip = (
    <div onClick={() => setShowTooltip(false)}>
      <Button className="btn btn-link p-0" onClick={handleShowEdit}>
        Edit
      </Button>
      <Button className="btn btn-link p-0" onClick={() => handleShowDelete(true)}>
        Delete
      </Button>
    </div>
  );

  return (
    <>
      {showTooltip && openTooltip}
      <span
        className="uil uil-ellipsis-v"
        onClick={() => setShowTooltip(prev => !prev)}
      ></span>
    </>
  );
}
