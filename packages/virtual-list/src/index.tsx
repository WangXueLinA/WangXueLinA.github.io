import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useVirtualList, { VirtualListOpt } from './useVirtual';

export interface RenderItem {
  style?: React.CSSProperties;
  index: number;
}

export interface VirtualListProps
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    'style'
  > {
  height?: VirtualListOpt['height'];
  style?: React.CSSProperties;
  bufferCount?: VirtualListOpt['bufferCount'];
  itemCount: VirtualListOpt['itemCount'];
  itemHeight?: VirtualListOpt['itemHeight'];
  renderItem?: (item: RenderItem) => React.ReactNode;
}

// eslint-disable-next-line react/prop-types
const RENDER_ITEM: VirtualListProps['renderItem'] = ({ index, style }) => {
  return (
    <div key={index} style={style}>
      {index}
    </div>
  );
};

const STYLE_WRAPPER: React.CSSProperties = {
  overflow: 'auto',
};

const STYLE_INNER: React.CSSProperties = {
  overflow: 'hidden',
  position: 'relative',
  minHeight: '100%',
};

const STYLE_ITEM: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
};

const VirtualList: React.FC<VirtualListProps> = (props) => {
  const [offset, setOffset] = useState(0);
  const {
    itemCount,
    renderItem,
    itemHeight = 50,
    height = 300,
    bufferCount = 5,
    style,
    ...divProps
  } = props;
  const wrapRef = useRef<HTMLDivElement>(null);
  const cacheStyle = useRef<Map<number, React.CSSProperties>>(new Map());

  const wrapStyle = useMemo(() => {
    return { ...STYLE_WRAPPER, height, ...style };
  }, [height, style]);

  const innerStyle = useMemo(() => {
    return { ...STYLE_INNER, height: itemHeight * itemCount };
  }, [itemCount, itemHeight]);

  const { startIndex, endIndex } = useVirtualList({
    bufferCount,
    itemHeight,
    height,
    offset,
    itemCount,
  });

  const handleScroll = useCallback(() => {
    const _offset = wrapRef.current?.scrollTop;
    if (_offset !== undefined) {
      setOffset(_offset);
    }
  }, []);

  useEffect(() => {
    const instance = wrapRef.current;
    instance?.addEventListener('scroll', handleScroll);

    return () => {
      instance?.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const _renderItem = useMemo(() => {
    return renderItem || RENDER_ITEM;
  }, [renderItem]);

  const getStyle = useCallback(
    (index: number) => {
      let itemStyle = cacheStyle.current.get(index);
      if (itemStyle) {
        return itemStyle;
      }
      itemStyle = {
        ...STYLE_ITEM,
        top: index * itemHeight,
      };
      cacheStyle.current.set(index, itemStyle);
      return itemStyle;
    },
    [itemHeight],
  );

  return (
    <div {...divProps} style={wrapStyle} ref={wrapRef}>
      <div style={innerStyle}>
        {new Array(endIndex - startIndex + 1).fill('').map((_, i) => {
          const index = startIndex + i;
          return _renderItem({
            index,
            style: getStyle(index),
          });
        })}
      </div>
    </div>
  );
};

export { useVirtualList };

export default VirtualList;
