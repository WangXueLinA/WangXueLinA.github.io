import { Button } from 'antd';
import { useDispatch, useLoading } from './store';

const TestAsync = () => {
  const dispatch = useDispatch();
  const loading = useLoading('getData');
  return (
    <Button
      loading={loading}
      onClick={() => {
        dispatch('getData');
      }}
    >
      getData
    </Button>
  );
};

export default TestAsync;
