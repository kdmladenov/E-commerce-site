import React, { useEffect, useState } from 'react';
import './styles/Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';
import { useHistory } from 'react-router';
import Loader from '../Loader';
import Message from '../Message';
import validateInput from '../../validations/userValidator';
import Button from '../Button';

const ProfileForm = ({ inputData }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isFormValid, setIsFormValid] = useState(true);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [isUserUpdated, setIsUserUpdated] = useState(false);

  const [form, setForm] = useState(inputData);

  const [inputErrors, setInputErrors] = useState(
    Object.keys(form).reduce((acc, key) => {
      return {
        ...acc,
        [key]: ''
      };
    }, {})
  );

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const isInputValid = (input, validations) => {
    if (validations.required && input.length === 0) return false;
    if (validations.minLength && input.length < validations.minLength) return false;
    if (validations.maxLength && input.length > validations.maxLength) return false;
    if (validations.format && !validations.format.test(input)) return false;

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedForm = { ...form };
    updatedForm[name].value = value;
    updatedForm[name].touched = true;
    updatedForm[name].valid = isInputValid(value, updatedForm[name].validations);

    setInputErrors({ ...inputErrors, [name]: validateInput[name](value) });
    setForm(updatedForm);
    setIsFormValid(Object.values(updatedForm).every((elem) => elem.valid));
  };

  const handleCancelButton = () => {
    setForm(inputData);
    setIsUserUpdated(true);
    setInputErrors(
      Object.keys(form).reduce((acc, key) => {
        return {
          ...acc,
          [key]: ''
        };
      }, {})
    );
  };

  const formToRender = Object.keys(form)
    .map((name) => {
      return {
        id: name,
        config: form[name]
      };
    })
    .map(({ id, config }) => {
      return (
        <div
          className={`wrapper ${config.value ? 'filled' : ''} ${inputErrors[id] ? 'error' : ''} ${
            config.touched ? 'touched' : ''
          }`}
        >
          <label htmlFor={id}>{config.label}</label>
          <div className="underline" />
          {inputErrors[id] && (
            <div className="error_message">{`${config.label} ${inputErrors[id]}`}</div>
          )}
          <input
            type={config.type}
            key={id}
            name={id}
            placeholder={config.value}
            value={config.value}
            onChange={handleInputChange}
          />
        </div>
      );
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = Object.keys(form).reduce((acc, key) => {
      return {
        ...acc,
        [key]: form[key].value
      };
    }, {});

    dispatch(
      updateUserProfile({
        id: userInfo.userId,
        ...data
      })
    );

    setIsUserUpdated(true);
  };

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user?.email || isUserUpdated) {
        dispatch(getUserDetails(userInfo.userId));
        setIsUserUpdated(false);
      } else {
        const formCopy = { ...form };
        Object.keys(formCopy).forEach((key) => (formCopy[key].value = user[key]));

        setForm(formCopy);
        setIsUserLoaded(true);
      }
    }
  }, [dispatch, history, userInfo, user, success, loading, isUserLoaded, isUserUpdated]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <form onSubmit={handleSubmit}>
      {formToRender}
      {Object.values(form).some((input) => input.touched) && (
        <div className="button_group">
          <Button classes="yellow" type="submit" disabled={!isFormValid}>
            Save Changes
          </Button>
          <Button classes="yellow" type="Button" onClick={handleCancelButton}>
            Cancel Changes
          </Button>
        </div>
      )}
    </form>
  );
};

export default ProfileForm;
