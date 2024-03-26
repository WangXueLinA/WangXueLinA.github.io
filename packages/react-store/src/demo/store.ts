import { initStore } from '../index'
import { Model } from '../interface'

export type Data = {
  name: string
  age: number
  address: string
}

type State = {
  dataSource: Array<Data>
}
interface M extends Model<State> {
  actions: {
    getData(): State['dataSource']
    getDataByName(name: string): State['dataSource']
  }
  reducers: {
    updateState(payload: Partial<State>): State
  }
}

export const {
  useDispatch,
  useCreateStore,
  useModel,
  Context,
  Provider,
  useSelector,
  useLoading,
  useStore
} = initStore<M>({ logEnable: true })
