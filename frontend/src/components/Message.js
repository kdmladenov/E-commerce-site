import './styles/Message.css'

const Message = ({ type, children }) => {
  return <div className={`message ${type}`}>{children}</div>;
};

Message.defaultProps = {
  type: 'error'
};

export default Message;
