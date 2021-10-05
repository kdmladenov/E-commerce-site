import { use } from 'passport';
import { useState } from 'react';
import './styles/Message.css';

const Message = ({ type, children }) => {
  const [showMessage, setShowMessage] = useState(true);

  return (
    showMessage && (
      <div className="message_container">
        <div className={`message ${type}`}>
          {children}
          <i onClick={() => setShowMessage(!showMessage)} className="fa fa-times"></i>
        </div>
      </div>
    )
  );
};

Message.defaultProps = {
  type: 'error'
};

export default Message;
