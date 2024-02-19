import { EventArgs, Graph } from '@antv/x6'
import { CSSProperties, FC, useEffect, useRef, useState } from 'react'
import { Provider } from './hooks'

export * from '@antv/x6'

type Handler<Args> = Args extends null | undefined
  ? () => any
  : Args extends any[]
  ? (...args: Args) => any
  : (args: Args) => any
type EventName<T> = T extends string
  ? T extends `${infer Node}:${infer Name}`
    ? `${Node}_${EventName<Name>}`
    : T
  : T

type EventProps = {
  [K in keyof EventArgs as K extends object
    ? K
    : `on_${EventName<K>}`]?: Handler<EventArgs[K]>
}
type Props = {
  onReady?: (graph: Graph) => void
  style?: CSSProperties
  className?: string
  options: Graph.Options
} & EventProps

const getListeners = (
  options: Omit<
    Props,
    'style' | 'className' | 'onReady' | 'children' | 'options'
  >
) => {
  return Object.entries(options).reduce((list, [key, value]) => {
    if (key.startsWith('on_')) {
      const name = key.replace(/^on_/, '').replace('_', ':')
      list.push([name, value])
    }
    return list
  }, [] as Array<[string, any]>)
}

export const X6Graph: FC<Props> = ({
  children,
  onReady,
  style,
  className,
  options,
  ...rest
}) => {
  const [graph, setGraph] = useState<Graph>()
  const container = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const _graph = new Graph({ container: container.current!, ...options })
    const listeners = getListeners(rest)
    listeners.forEach(([key, fn]) => {
      _graph.on(key, fn)
    })
    setGraph(_graph)
    onReady?.(_graph)
    return () => {
      listeners.forEach(([key, fn]) => {
        _graph?.off(key, fn)
      })
      _graph.dispose()
    }
  }, [])

  return (
    <Provider value={graph as Graph}>
      <div
        style={{
          width: '100%',
          height: '100%',
          ...style
        }}
        className={className}
        ref={container}
      />
      {graph && children}
    </Provider>
  )
}
