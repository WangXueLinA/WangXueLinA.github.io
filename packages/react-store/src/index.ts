/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import {
  Model,
  Store,
  StoreModel,
  StoreOptions,
  UseSelectorCallback
} from './interface'

type Fn = () => void

const formateDate = (num: number) => {
  return num < 10 ? `0${num}` : num
}
const log = (
  action: string,
  type: string,
  payload: any,
  preState?: Record<string, any>,
  nextState?: Record<string, any>
) => {
  const date = new Date()
  const hour = ` @${formateDate(date.getHours())}:${formateDate(
    date.getMinutes()
  )}:${formateDate(date.getSeconds())}`
  console.groupCollapsed(`%c ${action}${type}`, 'color:#409EFF;', hour)
  preState && console.log('%c preState', 'color:#909399;', preState)
  console.log('%c payload', 'color:#E6A23C;', payload)
  nextState && console.log('%c nextState', 'color:#67C23A;', nextState)
  console.groupEnd()
}

export const initStore = <M extends Model>({
  logEnable = process.env.NODE_ENV !== 'production'
}: StoreOptions = {}) => {
  const Context = createContext<Store<M>>({} as Store<M>)
  const useStore = () => {
    return useContext(Context)
  }

  const createStore = (storeConfig: Omit<StoreModel<M>, 'loading'>) => {
    const listeners = {
      state: [] as Array<Fn>,
      loading: [] as Array<Fn>
    }
    const modelObj = storeConfig as StoreModel<M>
    modelObj.loading = {
      _global_: 0
    } as any
    const store: Store<M> = {
      async dispatch(key, ...args) {
        if (!modelObj.actions[key]) {
          throw new Error(`action ${key as string} not found`)
        }
        if (!modelObj.loading?.[key]) {
          modelObj.loading[key] = 0
        }
        store.setLoading(key, 1)
        logEnable && log('actions ', key as string, args)
        return modelObj.actions[key](
          {
            ...store,
            state: store.getState()
          },
          ...args
        ).finally(() => {
          store.setLoading(key, -1)
        })
      },
      commit(key, data) {
        if (!modelObj.reducers[key]) {
          throw new Error(`reducer ${key as string} not found`)
        }
        const preState = store.getState()
        const res = modelObj.reducers[key](preState, data)
        store.setState(res)
        listeners.state.forEach((item) => item())
        const nextState = store.getState()
        logEnable && log('reducers ', key as string, data, preState, nextState)
        return nextState
      },
      getState() {
        return modelObj.state
      },
      setState(res) {
        modelObj.state = res
      },
      setLoading(key, count: number) {
        const preState = {
          ...modelObj.loading
        }
        modelObj.loading._global_ += count
        modelObj.loading[key] += count
        listeners.loading.forEach((item) => item())
        logEnable &&
          log(
            'loading ',
            key as string,
            modelObj.loading?.[key],
            preState,
            modelObj.loading
          )
      },
      getLoading(key) {
        if (!key) {
          return !!modelObj.loading._global_
        }
        return !!modelObj.loading[key]
      },
      subscribe(fn: () => void, type = 'state') {
        listeners[type].push(fn)
        return () => {
          listeners[type] = listeners[type].filter((item) => item !== fn)
        }
      }
    }
    return store
  }

  const useCreateStore = (storeConfig: Omit<StoreModel<M>, 'loading'>) => {
    return useMemo(() => createStore(storeConfig), [])
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const useSelector = <T>(callback: UseSelectorCallback<M['state'], T>) => {
    const store = useStore()
    const state = useRef(callback(store.getState()))
    const [, updateSate] = useState({})
    useEffect(() => {
      return store.subscribe(() => {
        const newState = callback(store.getState())
        if (state.current !== newState) {
          state.current = newState
          updateSate({})
        }
      })
    }, [store])
    return state.current
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const useModel = (name?: string) => {
    const state = useSelector((s) => s)
    return state
  }
  const useDispatch = () => {
    const store = useStore()
    return store.dispatch
  }
  const useLoading = (key: keyof M['actions'] | '_global_' = '_global_') => {
    const store = useStore()
    const keyRef = useRef(key)
    keyRef.current = key
    const loading = useRef(false)
    loading.current = store.getLoading(key)
    const [, updateSate] = useState({})

    useEffect(() => {
      return store.subscribe(() => {
        const newLoading = store.getLoading(keyRef.current)
        if (loading.current !== newLoading) {
          loading.current = newLoading
          updateSate({})
        }
      }, 'loading')
    }, [store])
    return !!loading.current
  }
  return {
    useDispatch,
    createStore,
    useCreateStore,
    useModel,
    Context,
    Provider: Context.Provider,
    useSelector,
    useLoading,
    useStore
  }
}

export * from './interface'
