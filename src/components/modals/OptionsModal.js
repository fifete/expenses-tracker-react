import React, { useState } from 'react';
import '../../styles/optionsModal.css';

export const OptionsModal = ({
  handleShowDelete, handleShowEdit
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const openTooltip = (
    <div className='tooltip-bottom flex fs-smallest' onClick={() => setShowTooltip(false)}>
      <span onClick={handleShowEdit}>
        Edit
      </span>
      <span onClick={() => handleShowDelete(true)}>
        Delete
      </span>
    </div>
  );

  return (
    <>
      {showTooltip && openTooltip}
      <i
        className="uil uil-ellipsis-v"
        onClick={() => setShowTooltip(prev => !prev)}
      ></i>
    </>
  );
}
