import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import './styles/FormComponent.css';
import { saveShippingAddress } from '../state/actions/cartActions';

import Button from './Button';
import FormComponentProps from '../models/components/FormComponentProps';
import ValidationsType from '../models/ValidationsType';
import FormInputDataType from '../models/FormInputDataType';
import FormToRenderType from '../models/FormToRenderType';
import UserType from '../models/UserType';
import ProductType from '../models/ProductType';

const FormComponent: React.FC<FormComponentProps> = ({
  inputData,
  screen,
  resource,
  resourceId,
  subResourceId,
  updateAction,
  createAction,
  authorizationAction,
  getDetailsAction,
  successUpdate,
  validateInput,
  resetPasswordToken,
  mode
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isFormValid, setIsFormValid] = useState(true);
  const [isResourceLoaded, setIsResourceLoaded] = useState(false);
  const [isResourceUpdated, setIsResourceUpdated] = useState(false);

  const [form, setForm] = useState<FormInputDataType>(inputData);

  const [inputErrors, setInputErrors] = useState<{ [key: string]: string }>(
    Object.keys(form).reduce((acc, key) => {
      return {
        ...acc,
        [key]: ''
      };
    }, {})
  );

  const isInputValid = (input: string, validations: ValidationsType) => {
    if (validations.required && input.length === 0) return false;
    if (validations.minValue && +input <= validations.minValue) return false;
    if (validations.maxValue && +input >= validations.maxValue) return false;
    if (validations.minLength && input.length < validations.minLength) return false;
    if (validations.maxLength && input.length > validations.maxLength) return false;
    if (validations.format && !validations.format.test(input)) return false;

    return true;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    match?: string
  ) => {
    const { name, value } = e.target;

    const updatedForm = { ...form };
    updatedForm[name].value = value;
    updatedForm[name].touched = true;
    updatedForm[name].valid = isInputValid(value, updatedForm[name].validations);

    validateInput && setInputErrors({ ...inputErrors, [name]: validateInput[name](value, match) });
    setForm(updatedForm);
    setIsFormValid(
      Object.values(updatedForm).every((elem) =>
        mode === 'create' && elem.validations.required ? elem.touched && elem.valid : elem.valid
      )
    );
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
    .map((name: keyof typeof form) => {
      return {
        key: name.toString(),
        config: form[name]
      };
    })
    .map(({ key, config }: FormToRenderType) => {
      return config.formElement === 'select' ? (
        <select key={key} name={key} value={config?.value} onChange={(e) => handleInputChange(e)}>
          <option value="">{`${config?.label}: ${
            config?.label === 'Screen size' && config?.value
              ? `${config?.value} inches`
              : (config?.label === 'System memory' || config?.label === 'Storage capacity') &&
                config?.value
              ? `${config?.value} GB`
              : (config?.label === 'Touch screen' || config?.label === 'Backlit keyboard') &&
                config?.value
              ? `${Boolean(+config?.value)}`
              : config?.value || ''
          }`}</option>
          {config.options
            ?.filter((item) => item?.value !== config?.value)
            .map((item) => (
              <option key={item?.label} value={item?.value}>
                {item?.label}
              </option>
            ))}
        </select>
      ) : (
        <div
          className={`wrapper ${config.value !== '' ? 'filled' : ''} ${
            inputErrors[key] ? 'error' : ''
          } ${config.touched ? 'touched' : ''}`}
          key={key}
        >
          <label htmlFor={key}>{config.label}</label>
          <div className="underline" />
          {inputErrors[key] && (
            <div className="error_message">{`${config.label} ${inputErrors[key]}`}</div>
          )}
          <input
            type={config.type}
            key={key}
            name={key}
            placeholder={config.value}
            value={config.value}
            onChange={(e) =>
              handleInputChange(
                e,
                key === 'reenteredEmail'
                  ? form.email.value
                  : key === 'reenteredPassword'
                  ? form.password.value
                  : ''
              )
            }
          />
        </div>
      );
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.keys(form).reduce((acc, key) => {
      return {
        ...acc,
        [key]: form[key].value
      };
    }, {});

    dispatch(
      screen === 'login' || screen === 'forgottenPassword'
        ? authorizationAction(data)
        : screen === 'resetPassword'
        ? authorizationAction({ ...data, userId: resourceId, token: resetPasswordToken })
        : mode === 'create'
        ? createAction(resourceId || subResourceId, {
            ...data
          })
        : updateAction(subResourceId || resourceId, {
            ...data
          })
    );

    screen === 'shipping' && dispatch(saveShippingAddress({ ...data }));

    setIsResourceUpdated(true);

    screen === 'shipping' && history.push('/payment');
  };

  useEffect(() => {
    if (getDetailsAction) {
      if (isResourceUpdated && resourceId) {
        dispatch(getDetailsAction(resourceId));
        setIsResourceUpdated(false);
      } else {
        const updatedFormData: FormInputDataType = Object.keys(form).reduce((acc, key) => {
          return {
            ...acc,
            [key]: {
              ...form[key],
              value: mode === 'create' ? '' : resource?.[key as keyof (UserType | ProductType)]
            }
          };
        }, {});
        setForm(updatedFormData);
        setIsResourceLoaded(true);
      }
    }
  }, [
    dispatch,
    history,
    resource,
    resourceId,
    successUpdate,
    getDetailsAction,
    isResourceLoaded,
    isResourceUpdated,
    mode
  ]);

  return (
    <form onSubmit={handleSubmit} className="form_component">
      {formToRender}
      <div className="button_group">
        {Object.values(form).some((input) => input.touched || screen === 'shipping') && (
          <Button
            classes="rounded green"
            type="submit"
            disabled={!(isFormValid && Object.values(inputErrors).every((error) => error === ''))}
          >
            {screen === 'register'
              ? 'Register'
              : screen === 'login'
              ? 'Login'
              : screen === 'forgottenPassword'
              ? 'Request Password Reset'
              : screen === 'resetPassword'
              ? 'Reset Password'
              : screen !== 'shipping'
              ? 'Save Changes'
              : `Proceed to Payment ${
                  Object.values(form).some((input) => input.touched) ? '& Update Profile' : ''
                }`}
          </Button>
        )}
        {Object.values(form).some((input) => input.touched) &&
          screen !== 'register' &&
          screen !== 'resetPassword' &&
          screen !== 'login' &&
          screen !== 'forgottenPassword' && (
            <Button classes="rounded orange" onClick={handleCancelButton}>
              Cancel Changes
            </Button>
          )}
      </div>
    </form>
  );
};

export default FormComponent;
