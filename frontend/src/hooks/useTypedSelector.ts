import { TypedUseSelectorHook, useSelector } from 'react-redux';
import StateType from '../models/state/StateType';

const useTypedSelector: TypedUseSelectorHook<StateType> = useSelector;

export default useTypedSelector;
