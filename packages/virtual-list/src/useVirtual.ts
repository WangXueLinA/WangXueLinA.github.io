import { useMemo } from 'react';

export interface VirtualListOpt {
  height: number;
  bufferCount: number;
  itemHeight: number;
  offset: number;
  itemCount: number;
}

const useVirtualList = (opt: VirtualListOpt) => {
  const { height, itemHeight, bufferCount, offset, itemCount } = opt;

  const visibleCount = useMemo(() => {
    return Math.ceil(height / itemHeight);
  }, [height, itemHeight]);

  const start = useMemo(() => {
    return Math.ceil(offset / itemHeight);
  }, [itemHeight, offset]);

  return {
    startIndex: Math.max(0, start - bufferCount),
    endIndex: Math.min(start + visibleCount + bufferCount, itemCount - 1),
  };
};

export default useVirtualList;
