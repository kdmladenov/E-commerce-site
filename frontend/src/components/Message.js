import { useState } from 'react';
import './styles/Message.css';
import Tooltip from './Tooltip';

const Message = ({ type, children }) => {
  const [showMessage, setShowMessage] = useState(true);

  return (
    showMessage && (
      <div className="message_container">
        <div className={`message ${type}`}>
          {children}
          <Tooltip direction="top" text="Remove">
            <i onClick={() => setShowMessage(!showMessage)} className="fa fa-times"></i>
          </Tooltip>
        </div>
      </div>
    )
  );
};

Message.defaultProps = {
  type: 'error'
};

export default Message;
