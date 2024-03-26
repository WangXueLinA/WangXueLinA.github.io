/* eslint-disable no-promise-executor-return */
import React from 'react'
import Preview from './Preview'
import Preview2 from './Preview2'
import Test from './Test'
import TestAsync from './TestAsync'
import { getData } from './mock'
import { Provider, useCreateStore } from './store'

const App: React.FC = () => {
  const store = useCreateStore({
    state: {
      dataSource: []
    },
    reducers: {
      updateState(state, data) {
        return { ...state, ...data } // 合并对象
      }
    },
    actions: {
      async getData({ commit }) {
        const dataSource = await getData()
        commit('updateState', { dataSource })
        return dataSource
      },
      async getDataByName({ commit }, name) {
        const dataSource = await getData(name)
        commit('updateState', { dataSource })
        return dataSource
      }
    }
  })
  return (
    <Provider value={store}>
      <Test />
      <TestAsync />
      <Preview />
      <Preview2 />
    </Provider>
  )
}

export default App
