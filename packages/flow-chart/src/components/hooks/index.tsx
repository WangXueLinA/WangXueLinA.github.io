import { Graph } from '@antv/x6'
import React from 'react'

const context = React.createContext<Graph>({} as Graph)
export const useGraph = () => React.useContext(context)
export const { Provider } = context
