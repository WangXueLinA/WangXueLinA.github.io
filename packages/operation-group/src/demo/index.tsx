import { Button, Menu } from 'antd';
import React, { useState } from 'react';
import OperationGroup from '../index';

const Demo: React.FC = () => {
  const [line, setLine] = useState(1);

  return (
    <>
      <OperationGroup count={2} trigger={['hover']}>
        <a>操作一</a>
        <a>操作二</a>
        <a>操作三</a>
        <a>操作四</a>
        <a>操作五</a>
      </OperationGroup>
      <OperationGroup
        trigger={['hover']}
        split={null}
        resizeConfig={{ itemWidth: 50, line }}
        wrap
        size={[0, 16]}
        className="group"
        moreText={
          <div>
            <a>更多</a>
          </div>
        }
        moreAll
        overlayRender={(_, more) => {
          return (
            <Menu>
              {more?.map((item) => (
                <Menu.Item>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {item}
                  </div>
                </Menu.Item>
              ))}
            </Menu>
          );
        }}
      >
        <a>操作一</a>
        <a>操作二</a>
        <a>操作三</a>
        <a>操作四</a>
        <a>操作五</a>
        <a>操作一</a>
        <a>操作二</a>
        <a>操作三</a>
        <a>操作四</a>
        <a>操作五</a>
        <a>操作一</a>
        <a>操作二</a>
        <a>操作三</a>
        <a>操作四</a>
        <a>操作五</a>
        <a>操作一</a>
        <a>操作二</a>
        <a>操作三</a>
        <a>操作四</a>
        <a>操作五</a>
      </OperationGroup>
      <Button onClick={() => setLine(line === 1 ? 2 : 1)}>1或2行显示</Button>
    </>
  );
};

export default Demo;
