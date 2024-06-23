import { Button, Spin } from 'antd';
import { Provider } from 'react-redux';
import store from './store';
import useModel from './useModel';

const App = () => {
  const { count } = useModel('test');
  const { test } = useModel('loading');

  return (
    <Spin spinning={test.updateCount}>
      <div>
        <Button
          onClick={() => {
            store.dispatch('test/updateCount');
          }}
        >
          更新初始值
        </Button>
        <Button
          onClick={() => {
            store.dispatch('test/resetCount');
          }}
        >
          重置初始值
        </Button>
      </div>
      <div>初始值：0</div>
      <div>更新值：{count || '--'}</div>
    </Spin>
  );
};

const Demo: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Demo;
