import { Dispatch, Middleware } from 'redux';
import createDispatch from './createDispatch';
import { RootModel } from './interface';

export default <S>(
  rootModel: RootModel<S>,
  loadingModel?: boolean,
): Middleware<{}, S, Dispatch> => {
  return (middlewareApi) =>
    (next) =>
    (...args) => {
      if (typeof args[0] === 'string') {
        return createDispatch(middlewareApi, rootModel, loadingModel)(...args);
      }
      return next(...args);
    };
};
