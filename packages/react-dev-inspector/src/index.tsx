import { Modal } from 'antd';

type DebugSource = {
  fileName: string;
  columnNumber: number;
  lineNumber: number;
};
type Fiber = {
  _debugSource?: DebugSource;
  _debugOwner?: Fiber;
};

const getTreeMessage = (fiber: Fiber) => {
  if (!fiber) return [];
  const arr = [];
  if (fiber._debugSource) {
    arr.push(fiber._debugSource);
  }
  let owner = fiber._debugOwner;
  while (owner) {
    if (owner._debugSource) {
      arr.push(owner._debugSource);
    }
    owner = owner._debugOwner;
  }
  return arr;
};

export const createDevInspector = (prefixCls = 'dt') => {
  const fn = (e: MouseEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.target) {
      const [_, fiber] =
        (Object.entries(e.target).find(
          ([k]) =>
            e.target?.[k as keyof typeof e.target]?.constructor?.name ===
            'FiberNode',
        ) as [string, Fiber]) ?? [];

      const list = getTreeMessage(fiber);
      if (list.length) {
        e.preventDefault();
        Modal.info({
          title: '组件详情',
          width: '800px',
          prefixCls: `${prefixCls}-modal`,
          content: (
            <ul>
              {list.map((obj) => {
                return (
                  <li key={obj?.fileName}>
                    <a
                      href={`vscode://file/${obj.fileName}:${obj.lineNumber}:${obj.columnNumber}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {obj?.fileName}
                    </a>
                  </li>
                );
              })}
            </ul>
          ),
        });
      } else {
        console.log(fiber, e.target);
      }
    }
  };
  document.addEventListener('contextmenu', fn);
  return () => {
    document.removeEventListener('contextmenu', fn);
  };
};
