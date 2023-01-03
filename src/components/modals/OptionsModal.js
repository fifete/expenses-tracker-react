import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

export const OptionsModal = ({
  handleShowDelete, handleShowEdit, showTooltip
}) => {

  const openTooltip = (
    <Tooltip>
      <div>
        <Button className="btn btn-link p-0" onClick={handleShowEdit}>
          Edit
        </Button>
        <Button className="btn btn-link p-0" onClick={() => handleShowDelete(true)}>
          Delete
        </Button>
      </div>
    </Tooltip>
  );

  return (
    <>
      {showTooltip
        ? <OverlayTrigger
          placement="bottom"
          overlay={openTooltip}
          trigger="click"
        >
          <span>&#8942;</span>
        </OverlayTrigger>
        : <span>&#8942;</span>
      }
    </>
  );
}
