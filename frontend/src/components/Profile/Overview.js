import React, { useEffect, useState } from 'react';
import './styles/About.css';
import { USER } from '../../constants/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';
import { useHistory } from 'react-router';
import Loader from '../Loader';
import Message from '../Message';

const Overview = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isFormValid, setIsFormValid] = useState(true);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  const [form, setForm] = useState({
    fullName: {
      label: 'Full Name',
      placeholder: 'Your full name...',
      value: '',
      validations: {
        required: true,
        minLength: USER.MIN_FULL_NAME_LENGTH,
        maxLength: USER.MAX_FULL_NAME_LENGTH
      },
      valid: true
    },
    email: {
      label: 'Email',
      placeholder: 'Your email name...',
      value: '',
      validations: {
        required: true,
        minLength: USER.MIN_EMAIL_LENGTH,
        maxLength: USER.MAX_EMAIL_LENGTH,
        format: USER.EMAIL_REGEX
      },
      valid: true
    }
  });

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = Object.keys(form).reduce((acc, elementKey) => {
      return {
        ...acc,
        [elementKey]: form[elementKey].value
      };
    }, {});

    dispatch(
      updateUserProfile({
        id: userInfo.userId,
        ...data
      })
    );
  };

  const isInputValid = (input, validations) => {
    if (validations.required && input.length === 0) {
      return false;
    }
    if (validations.minLength && input.length <= validations.minLength) {
      return false;
    }
    if (validations.maxLength && input.length >= validations.maxLength) {
      return false;
    }
    if (validations.format && !validations.format.test(input)) {
      return false;
    }

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedForm = { ...form };
    updatedForm[name].value = value;
    updatedForm[name].valid = isInputValid(value, updatedForm[name].validations);

    setForm(updatedForm);

    const formValid = Object.values(updatedForm).every((elem) => elem.valid);
    setIsFormValid(formValid);
  };

  const overviewToRender = Object.keys(form)
    .map((name) => {
      return {
        id: name,
        config: form[name]
      };
    })
    .map(({ id, config }) => {
      const isValidCSSClass = config.valid ? 'valid' : 'invalid';

      return (
        <div className='wrapper'>
          <label htmlFor={id}>{config.label}</label>
          <input
            type="text"
            key={id}
            name={id}
            className={isValidCSSClass}
            placeholder={config.value}
            value={config.value}
            onChange={handleInputChange}
          />
        </div>
      );
    });

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user?.email) {
        dispatch(getUserDetails(userInfo.userId));
      } else {
        const formCopy = form;
        Object.keys(formCopy).forEach((key) => (formCopy[key].value = user[key]));

        setForm(formCopy);
        setIsUserLoaded(true);
      }
    }
  }, [dispatch, history, userInfo, user, success, loading, isUserLoaded]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <form onSubmit={handleSubmit}>
      {overviewToRender}
      <button type="submit" disabled={!isFormValid}>
        Submit
      </button>
    </form>
  );
};

export default Overview;
