import { Graph } from '@antv/x6'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { Dnd } from '@antv/x6-plugin-dnd'
import { Export } from '@antv/x6-plugin-export'
import { History } from '@antv/x6-plugin-history'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { MiniMap } from '@antv/x6-plugin-minimap'
import { Scroller } from '@antv/x6-plugin-scroller'
import { Selection } from '@antv/x6-plugin-selection'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Transform } from '@antv/x6-plugin-transform'

import { Stencil } from '@antv/x6-plugin-stencil'
import { FC, memo, useEffect } from 'react'
import { useGraph } from '../hooks'

type StencilOptions = Omit<Stencil.Options, 'getDragNode' | 'getDropNode'> &
  Partial<Pick<Dnd.Options, 'getDragNode' | 'getDropNode'>>

type Options<P> = P extends Stencil
  ? StencilOptions
  : P extends Selection
  ? Selection.Options
  : 'options' extends keyof P
  ? P['options']
  : Record<string, any>
export type ComProps<P> = {
  // eslint-disable-next-line react/no-unused-prop-types
  onReady?: (plugin: P, graph: Graph) => void
  options?: Omit<Options<P>, 'target'>
}

export function createComponent<P extends Graph.Plugin>(
  fn: (options: Options<P>) => P
) {
  const Component: FC<ComProps<P>> = ({ onReady, options }) => {
    const graph = useGraph()
    useEffect(() => {
      const plugin = fn({ ...options, target: graph, graph } as Options<P>)
      graph.use?.(plugin)
      onReady?.(plugin, graph)

      return () => {
        plugin.dispose()
        graph.disposePlugins(plugin.name)
      }
    }, [graph])
    return null
  }

  return memo(Component)
}

export const X6Scroller = createComponent<Scroller>((o) => new Scroller(o))
export const X6Export = createComponent<Export>(() => new Export())
export const X6Snapline = createComponent<Snapline>((o) => new Snapline(o))
export const X6History = createComponent<History>((o) => new History(o))
export const X6Keyboard = createComponent<Keyboard>((o) => new Keyboard(o))
export const X6Selection = createComponent<Selection>((o) => new Selection(o))
export const X6Clipboard = createComponent<Clipboard>((o) => new Clipboard(o))
export const X6Transform = createComponent<Transform>((o) => new Transform(o))
export const X6Dnd = createComponent<Dnd>((o) => new Dnd(o))
export const X6Stencil = createComponent<Stencil>((o) => new Stencil(o))
export const X6MiniMap = createComponent<MiniMap>((o) => new MiniMap(o))
