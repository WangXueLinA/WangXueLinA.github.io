import {
  Shape,
  X6Clipboard,
  X6Graph,
  X6History,
  X6Keyboard,
  X6MiniMap,
  X6Scroller,
  X6Selection,
  X6Snapline,
  X6Stencil,
  X6Transform
} from '../index'
import { useRef } from 'react'
import './index.less'
import './registerNode'
import { bindKey, registerComponent } from './utils'

const Demo: React.FC = () => {
  const refStencil = useRef<HTMLDivElement>(null)
  const minmap = useRef<HTMLDivElement>(null)

  return (
    <div
      style={{ display: 'flex', flexDirection: 'row', position: 'relative' }}
    >
      <div
        ref={refStencil}
        style={{ width: 200, flexShrink: 1, position: 'relative' }}
      >
        <div style={{ marginTop: 10, textAlign: 'center' }}>组件</div>
      </div>

      <X6Graph
        on_node_mouseenter={({ node }) => {
          node.getPorts().forEach((port) => {
            node.portProp(port.id!, 'attrs/circle/style/visibility', 'visible')
          })
        }}
        on_node_mouseleave={({ node }) => {
          node.getPorts().forEach((port) => {
            node.portProp(port.id!, 'attrs/circle/style/visibility', 'hidden')
          })
        }}
        options={{
          height: 800,
          grid: true,
          highlighting: {
            magnetAdsorbed: {
              name: 'stroke',
              args: {
                attrs: {
                  fill: '#5F95FF',
                  stroke: '#5F95FF'
                }
              }
            }
          },
          mousewheel: {
            enabled: true,
            zoomAtMousePosition: true,
            modifiers: 'ctrl',
            minScale: 0.5,
            maxScale: 3
          },
          connecting: {
            router: 'manhattan',
            connector: {
              name: 'rounded',
              args: {
                radius: 8
              }
            },
            anchor: 'center',
            connectionPoint: 'anchor',
            allowMulti: false,
            allowLoop: false,
            allowBlank: false,
            snap: {
              radius: 20
            },
            createEdge() {
              return new Shape.Edge({
                attrs: {
                  line: {
                    stroke: '#A2B1C3',
                    strokeWidth: 2,
                    targetMarker: {
                      name: 'block',
                      width: 12,
                      height: 8
                    }
                  }
                },
                zIndex: 0
              })
            },
            validateConnection({ targetMagnet }) {
              return !!targetMagnet
            }
          }
        }}
      >
        <X6Transform options={{ resizing: true, rotating: true }} />
        <X6Selection
          options={{
            rubberband: true,
            showNodeSelectionBox: true
          }}
        />
        <X6Snapline />
        <X6Keyboard
          onReady={(_, graph) => {
            bindKey(graph)
          }}
        />
        <X6Clipboard />
        <X6History />
        <X6Scroller />
        <X6MiniMap
          onReady={(e) => {
            minmap.current?.appendChild(e.container)
          }}
        />
        <X6Stencil
          options={{
            title: '组件',
            stencilGraphWidth: 200,
            stencilGraphHeight: 700,
            groups: [{ name: 'group', collapsable: false }],
            placeholder: '搜索组件',
            notFoundText: '未匹配到组件',
            layoutOptions: {
              columns: 1,
              columnWidth: 170,
              rowHeight: 60
            }
          }}
          onReady={(s, g) => {
            registerComponent(s, g)
            refStencil.current?.appendChild(s.container)
          }}
        />
      </X6Graph>
      <div
        ref={minmap}
        style={{
          position: 'absolute',
          background: '#fff',
          bottom: 0,
          right: 0
        }}
      />
    </div>
  )
}

export default Demo
