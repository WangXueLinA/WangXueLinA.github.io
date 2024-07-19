# redux 模型 model

维护人： xuelin

<!-- > redux模型model -->

## 安装

```sh
npm i @xuelin/redux-model
or
yarn add @xuelin/redux-model
```

## 思路

1. 以文件名形式进行注册 model，model 几部分
   1. namespace：Model 的唯一标识符。
   2. state：初始状态。
   3. actions：dispatch 触发的函数（dispatch 第一个参数为字符串，格式为`namespace/actions函数名`，第二个参数为 Object 对象，则是需要传的`payload`参数），actions 内可通过 commit 触发当前 namespace 下的 reducers。
   4. reducers：处理 state 更新，类似于 Redux 的 reducer。
2. 通过`require.context` 功能，目的是动态加载位于某个目录下及其子目录中的所有以 `.ts|.js `结尾的文件，并将这些文件导出的默认模块收集到一个数组中传入给`createStore`函数
3. combineReducers 合并 reducer 其实就是将多个 model 的 namepace 作为 key 以确保使用 combineReducers 时命名冲突，value 为各个 model 下的 reducers 函数
4. 因为我们 dispatch 的第一个参数为字符串，格式为`namespace/actions函数名`，所以我们就不能直接使用 dispatch，这时候我们就可以自己写一个中间件单独处理 dispatch
5. 常规的 middeware 格式为

   ```js
   function thunkMiddleware({ dispatch, getState }) {
     return (next) => (action) => {
       // 如果 action 是一个函数，那么调用它并传递 dispatch 和 getState
       if (typeof action === 'function') {
         return action(dispatch, getState);
       }

       // 否则，action 是一个普通的 action 对象，直接传递给下一个中间件或 reducer
       return next(action);
     };
   }
   ```

   这里我们的 dispatch 是一个字符串，所以判断 args 的第一个参数是否为字符串即可调用我们的 dispatch 逻辑

   ```js
   function customDispatch(dispatch, getState) {
     return (type, payload) => {
       // 进行命名空间处理
       dispatch({ type: `${namespace}/${type}`, payload });
     };
   }

   function thunkMiddleware({ dispatch, getState }) {
     return (next) =>
       (...action) => {
         if (typeof action[0] === 'string') {
           return customDispatch(dispatch, getState);
         }

         return next(action);
       };
   }
   ```

## API

```js
// entry
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { model1 } from 'src/modles';
import { RootContainer } from 'src/container';

// 第一种创建方法

import createStore from '@hanyk/redux-model';

const store = createStore([model1],{
  separator: "/", // 分割符号默认‘/’
  reducers: {}, // 需要 通过combineReducers合并等reducer
  middlewares: [], // 中间件
  loadingModel: true // 是否启用loading
});


// 第二种创建方法

import { createMiddleware, createRootModel } from "@xuelin/redux-model";
import { createStore, combineReducers, applyMiddleware } from "redux";
const rootModel = createRootModel([model1, model2]);
const store = applyMiddleware(createMiddleware(rootModel))(createStore)(
  combineReducers({
    ...rootModel.reducers,
    test3: reducer, // 兼容 reuder function
  })
);


ReactDOM.render(
  <Provider store={store}>
    <RootContainer />
  </Provider>,
  document.getElementById('container')
);


// model
import { api } from 'src/api';
export default {
  namespace: 'model1',
  state: {
    list: [],
    total: 0,
    offset: 0,
    limit: 10
  },
  reducers: {
    updateState(state, data) {
      return { ...state, ...data };
    }
  },
  actions: {
    async getList({ commit,dispatch,getState }, params) {
      const res = await api.getList(params);
      // actions内可通过commit触发当前namespace下的reducers
      // 触发其他actions或者其他namespace下的reducers和actions 通过dispatch
      // 根据 dispatch的第一个参数是string类型还是object类型来触发 actions 或者 reducers
      commit('updateState', {
        demandList: res.items,
        total: res.total,
        offset: params.offset,
        limit: params.limit,
      });
      return res;
    }
  }
};



// container
import React from 'react';
import { connect } from 'react-redux';
@connect(
  ({ model1 }) => ({ ...model1 }),
)
export default class App extends React.Component {
  componentDidMount() {
    this.getTableList();
  }

  getTableList = async (obj = { limit: 10, offset: 0 }) => {
    const { offset, limit } = obj;
    const params = { offset, limit };
    // dispatch 第一个参数为string类型会触发actions 返回一个promise
    await this.props.dispatch('model1/getList', params)
     // dispatch 第一个参数为object类型会触发reducers
     this.props.dispatch({type: 'model1/updateState', payload: params})
  }


  render() {
    // 渲染组件
  }
}


// hooks用法
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
export default function(){

const { limit, offset, list, total } = useSelector(({ model1 }) => ({ ...model1 }));
const useDispatch = useDispatch()
 useEffect(() => {
    dispatch('model1/getList',{ limit, offset });
  }, [limit, offset]);

  return // 渲染组件
}
```
