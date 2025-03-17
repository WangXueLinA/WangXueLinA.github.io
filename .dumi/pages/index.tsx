import { Card, Col, FloatButton, Row, Tabs, notification } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import commits from '../git-commits.json';
import { toolsArr } from '../utils';
import './index.less';

export default () => {
  const location = useLocation();
  const [activeKey, setActiveKey] = useState('框架');
  const [api, contextHolder] = notification.useNotification({
    top: 70,
    duration: 4,
  });

  const openNotification = () => {
    api.open({
      message: '文档更新记录',
      description: commits.map((item) => (
        <p>
          {item.date} ---{item.message}
        </p>
      )),
    });
  };

  useEffect(() => {
    openNotification();
  }, []);

  return (
    <>
      {contextHolder}
      <div className="dumi-div-box">
        <h1 className="dumi-h1-title">
          <span>document</span>
        </h1>
        <p className="dumi-p-title">前端学习笔记</p>
      </div>
      <Tabs
        activeKey={activeKey}
        onChange={(e) => setActiveKey(e)}
        centered
        items={Object.keys(toolsArr).map((item) => {
          return {
            label: item,
            key: item,
            children: Array.isArray(toolsArr[item]) ? (
              <div className="dumi-site-who-are-using">
                {toolsArr[item].map((key) => (
                  <Link to={`${location.pathname}note/${key.title}`}>
                    <img src={key.logoUrl} alt="Ant Design" />
                    {key.title}
                  </Link>
                ))}
              </div>
            ) : (
              Object.keys(toolsArr[item]).map((_item) => {
                const someId = toolsArr[item][_item];
                return (
                  <>
                    <div className="dumi-site-who-are">{_item}</div>
                    <div className="dumi-site-who-are-using">
                      {someId.map((key) => (
                        <Link to={`${location.pathname}note/${key.title}`}>
                          <img src={key.logoUrl} alt="Ant Design" />
                          {key.title}
                        </Link>
                      ))}
                    </div>
                  </>
                );
              })
            ),
          };
        })}
      />

      <Row gutter={16}>
        <Col span={8}>
          <Card title="vpn" bordered={false}>
            <p>
              <a
                href="https://xn--mesr8b36x.com/#/register?code=FOsrvwQ5"
                target="_blank"
              >
                大机场
              </a>
            </p>
            <p>
              <a
                href="https://www.zhuiyun.life/#/register?code=cUv2zLTe"
                target="_blank"
              >
                追云加速器
              </a>
            </p>
          </Card>
        </Col>
      </Row>

      <FloatButton onClick={openNotification}></FloatButton>
    </>
  );
};
