import React from 'react';
import { register } from '../actions/userActions';
import FormComponent from '../components/FormComponent';
import { userRegisterInitialInputState } from '../constants/inputMaps';
import validateInputUser from '../validations/userValidator';
import './styles/RegisterScreen.css';

const RegisterScreen = () => {
  // const dispatch = useDispatch();

  return (
    <div className="register_screen flex">
      <div className="register_container card flex">
        <h1>Register</h1>
        <FormComponent
          inputData={userRegisterInitialInputState}
          createAction={register}
          validateInput={validateInputUser}
          mode='create'
          screen='register'
        />
      </div>
    </div>
  );
};

export default RegisterScreen;
