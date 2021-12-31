import React, { useState } from 'react';
import Avatar from './Avatar';
import { useDispatch } from 'react-redux';
import './styles/InputBoxWithAvatar.css';

const InputBoxWithAvatar = ({
  resourceId,
  currentUserDetails,
  createAction,
  validationMin,
  validationMax,
  placeholder,
  errorMessage
}) => {
  const dispatch = useDispatch();

  const [content, setContent] = useState('');

  const isValid = content.length >= validationMin && content.length < validationMax;

  const inputHandler = (e) => {
    e.preventDefault();

    setContent(e.target.value);
  };

  const keyPressHandler = (e) => {
    e.preventDefault();

    if (e.key === 'Enter' && isValid) {
      dispatch(createAction(resourceId, content));
      setContent('');
    }
  };

  return (
    <div className="input_with_avatar">
      <Avatar
        classes="image_only "
        imageUrl={currentUserDetails?.avatar}
        fullName={currentUserDetails?.fullName}
      />
      <input
        type="textarea"
        value={content}
        placeholder={placeholder}
        onChange={inputHandler}
        onKeyUp={keyPressHandler}
      />
      <p className={content.length > 0 && !isValid && 'show'}>{errorMessage}</p>
    </div>
  );
};

export default InputBoxWithAvatar;
