import { Button } from 'antd';
import { useDispatch, useLoading } from './store';

const Test = () => {
  const dispatch = useDispatch();
  const loading = useLoading('getDataByName');
  return (
    <Button
      loading={loading}
      onClick={() => {
        dispatch('getDataByName', '8');
      }}
    >
      getDataByName
    </Button>
  );
};

export default Test;
