import { Table } from 'antd';
import { columns } from './mock';
import { useLoading, useModel } from './store';

const Preview = () => {
  const { dataSource } = useModel();
  const loading = useLoading('getDataByName');

  return <Table dataSource={dataSource} columns={columns} loading={loading} />;
};

export default Preview;
