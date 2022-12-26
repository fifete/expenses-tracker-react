import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export const OptionsModal = ({
  handleShowEdit, handleShowDelete
}) => {
  

  const openTooltip = (
    <Tooltip>
      <div>
        <button className="btn btn-link p-0" onClick={() => handleShowEdit(true)}>Edit</button>
        <button className="btn btn-link p-0" onClick={() => handleShowDelete(true)}>Select</button>
      </div>
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={openTooltip}
      trigger="click"
    >
      <span>&#8942;</span>
    </OverlayTrigger>
  );
}
