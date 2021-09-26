import './styles/Message.css';

const Message = ({ type, children }) => {
  return (
    <div className="message_container">
      <div className={`message ${type}`}>{children}</div>
    </div>
  );
};

Message.defaultProps = {
  type: 'error'
};

export default Message;
