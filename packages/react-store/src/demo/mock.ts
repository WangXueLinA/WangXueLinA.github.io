/* eslint-disable no-promise-executor-return */
import { Data } from './store'

export const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '办公地址',
    dataIndex: 'address',
    key: 'address'
  }
]
const data = new Array<Data>(100).fill({} as Data).map((_, index) => ({
  key: index,
  name: `Edrward ${index}`,
  age: 32,
  address: `London Park no. ${index}`
}))

export const getData = async (name = '') => {
  await new Promise((resolve) => setTimeout(resolve, 2000)) // 模拟异步请求数据
  return data.filter((item) => item.name.includes(name))
}
