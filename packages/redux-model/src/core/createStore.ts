import {
  Dispatch,
  Middleware,
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import createMiddleware from './createMiddleware';
import createRootModel from './createRootModel';
import { Model, Options } from './interface';

const defaultOptions = {
  reducers: {},
  loadingModel: false,
  middlewares: [] as Middleware[],
};

export default function <S = any>(
  models: Array<Model<S>>,
  options = defaultOptions as Options<S>,
) {
  const rootModel = createRootModel<S>(
    models,
    options.loadingModel,
    options.initState,
  );
  const modelMiddleware = createMiddleware(rootModel, options.loadingModel);
  const middlewares = [modelMiddleware, ...(options.middlewares || [])];
  let devtoolsFn;
  if (process.env.NODE_ENV === 'development') {
    devtoolsFn =
      typeof window === 'object'
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION__
        : null;
  }

  console.log('000000');
  return applyMiddleware<Dispatch, (typeof rootModel)['state']>(...middlewares)(
    devtoolsFn ? devtoolsFn()(createStore) : createStore,
  )(
    combineReducers<(typeof rootModel)['state']>({
      ...rootModel.reducers,
      ...options.reducers,
    }),
  );
}
