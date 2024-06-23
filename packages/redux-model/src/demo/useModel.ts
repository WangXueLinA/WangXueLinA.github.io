import { useSelector } from 'react-redux';
import { State } from '../core/interface';

export default <T extends keyof State>(k: T) => {
  return useSelector<State, State[T]>((state) => state[k]);
};
