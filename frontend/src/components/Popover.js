import React from 'react';
import { OverlayTrigger } from 'react-bootstrap';

const Popover = ({ placement, id, trigger, children }) => {
  return (
    <>
      <OverlayTrigger
        trigger={trigger}
        key={id}
        placement={placement}
        overlay={
          <Popover id={id}>
            <Popover.Body>{children}</Popover.Body>
          </Popover>
        }
      ></OverlayTrigger>
    </>
  );
};

export default Popover;
