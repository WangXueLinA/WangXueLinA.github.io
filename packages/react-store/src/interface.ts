export type Model<T = any> = {
  state: T
  actions: {
    [k: string]: (payload?: any) => any
  }
  reducers: {
    [k: string]: (payload: any) => T
  }
}
export interface Store<M extends Model> {
  dispatch: <K extends keyof M['actions']>(
    type: K,
    ...data: Parameters<M['actions'][K]>
  ) => Promise<ReturnType<M['actions'][K]>>
  getState: () => M['state']
  setState: (s: M['state']) => M['state']
  setLoading: (key: keyof M['actions'], count: number) => void
  getLoading: (key?: keyof M['actions']) => boolean
  commit: <K extends keyof M['reducers']>(
    type: K,
    data: Parameters<M['reducers'][K]>[0]
  ) => ReturnType<M['reducers'][K]>
  subscribe: (callback: () => void, type?: 'state' | 'loading') => void
}

export type Reducers<M extends Model> = {
  [K in keyof M['reducers']]: (
    state: M['state'],
    data: Parameters<M['reducers'][K]>[0]
  ) => M['state']
}
export type Actions<M extends Model> = {
  [K in keyof M['actions']]: (
    store: Store<M> & { state: M['state'] },
    ...data: Parameters<M['actions'][K]>
  ) => Promise<ReturnType<M['actions'][K]>>
}
export type State = Record<string, any>

type Loading<M extends Record<string, any>> = {
  [K in keyof M]: number
}

export interface StoreModel<M extends Model> {
  state: M['state']
  loading: Loading<M['actions'] & { _global_: number }>
  reducers: Reducers<M>
  actions: Actions<M>
}
export type UseSelectorCallback<S, NS> = (s: S) => NS

export type StoreOptions = {
  logEnable?: boolean
}
