import { Table } from 'antd';
import { columns } from './mock';
import { useLoading, useSelector } from './store';

const Preview = () => {
  const dataSource = useSelector((state) => state.dataSource);
  const loading = useLoading();
  return <Table dataSource={dataSource} columns={columns} loading={loading} />;
};

export default Preview;
