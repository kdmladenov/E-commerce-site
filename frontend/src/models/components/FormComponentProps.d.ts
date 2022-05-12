import FormInputDataType from '../FormInputDataType';
import ProductType from '../ProductType';
import ProductDetailsActionType from '../state/actions/ProductDetailsActionType';
import UserDetailsActionType from '../state/actions/UserDetailsActionType';
import UserType from '../UserType';

interface FormComponentProps {
  inputData: FormInputDataType;
  screen?: string;
  resource?: UserType | ProductType ;
  resourceId?: number;
  subResourceId?: number;
  updateAction?: TODO;
  createAction?: TODO;
  authorizationAction?: TODO;
  getDetailsAction?: (
    resourceId: number
  ) => (
    dispatch: Dispatch<ProductDetailsActionType | UserDetailsActionType>,
    getState: () => StateType
  ) => Promise<void>;

  successUpdate?: boolean;
  validateInput?: {
    [key: string]: (value: string, match?: string) => string;
  };
  resetPasswordToken?: string;
  mode?: string;
}
export default FormComponentProps;
