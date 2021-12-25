import React, { useEffect, useState } from 'react';
import './styles/FormComponent.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Button from './Button';
import { saveShippingAddress } from '../actions/cartActions';

const FormComponent = ({
  inputData,
  screen,
  resource,
  resourceId,
  updateAction,
  getDetailsAction,
  successUpdate,
  validateInput
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isFormValid, setIsFormValid] = useState(true);
  const [isResourceLoaded, setIsResourceLoaded] = useState(false);
  const [isResourceUpdated, setIsResourceUpdated] = useState(false);

  const [form, setForm] = useState(inputData);

  const [inputErrors, setInputErrors] = useState(
    Object.keys(form).reduce((acc, key) => {
      return {
        ...acc,
        [key]: ''
      };
    }, {})
  );

  const isInputValid = (input, validations) => {
    if (validations.required && input.length === 0) return false;
    if (validations.minValue && +input <= validations.minValue) return false;
    if (validations.maxValue && +input >= validations.maxValue) return false;
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

    validateInput && setInputErrors({ ...inputErrors, [name]: validateInput[name](value) });
    setForm(updatedForm);
    setIsFormValid(Object.values(updatedForm).every((elem) => elem.valid));
  };

  const handleCancelButton = () => {
    setForm(inputData);
    setIsResourceUpdated(true);
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
      return config.formElement === 'select' ? (
        <select key={id} name={id} value={config?.value} onChange={handleInputChange}>
          <option value="">{`${config?.label}: ${
            config?.label === 'Screen size' && config?.value
              ? `${config?.value} inches`
              : (config?.label === 'System memory' || config?.label === 'Storage capacity') &&
                config?.value
              ? `${config?.value} GB`
              : (config?.label === 'Touch screen' || config?.label === 'Backlit keyboard') &&
                config?.value
              ? `${Boolean(config?.value)}`
              : config?.value || ''
          }`}</option>
          {config.options
            .filter((item) => item?.value?.toString() !== config?.value?.toString())
            .map((item) => (
              <option key={item?.label} value={item?.value}>
                {item?.label}
              </option>
            ))}
        </select>
      ) : (
        <div
          className={`wrapper ${config.value !== '' ? 'filled' : ''} ${
            inputErrors[id] ? 'error' : ''
          } ${config.touched ? 'touched' : ''}`}
          key={id}
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
      updateAction({
        id: resourceId,
        ...data
      })
    );

    screen === 'shipping' && dispatch(saveShippingAddress({ ...data }));

    setIsResourceUpdated(true);

    screen === 'shipping' && history.push('/payment');
  };

  useEffect(() => {
    if (isResourceUpdated) {
      dispatch(getDetailsAction(resourceId));
      setIsResourceUpdated(false);
    } else {
      const updated = Object.keys(form).reduce((acc, key) => {
        return {
          ...acc,
          [key]: { ...form[key], value: resource[key] }
        };
      }, {});
      setForm(updated);
      setIsResourceLoaded(true);
    }
  }, [
    dispatch,
    history,
    resource,
    resourceId,
    successUpdate,
    getDetailsAction,
    isResourceLoaded,
    isResourceUpdated
  ]);

  return (
    <form onSubmit={handleSubmit} className="form_component">
      {formToRender}

      <div className="button_group">
        {Object.values(form).some((input) => input.touched || screen === 'shipping') && (
          <Button classes="yellow rounded" type="submit" disabled={!isFormValid}>
            {screen !== 'shipping' ? 'Save Changes' : 'Proceed to Payment'}
          </Button>
        )}
        {Object.values(form).some((input) => input.touched) && (
          <Button classes="yellow rounded" type="Button" onClick={handleCancelButton}>
            Cancel Changes
          </Button>
        )}
      </div>
    </form>
  );
};

export default FormComponent;
