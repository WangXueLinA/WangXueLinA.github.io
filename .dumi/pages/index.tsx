import { Card, Col, Row } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { tools } from '../utils';
import './index.less';

export default () => {
  const location = useLocation();
  return (
    <>
      <div className="dumi-div-box">
        <h1 className="dumi-h1-title">
          <span>document</span>
        </h1>
        <p className="dumi-p-title">
          <span>前端学习笔记</span>
        </p>
      </div>
      {Object.keys(tools).map((key) => (
        <>
          <div className="dumi-site-who-are">{key}</div>
          <ul className="dumi-site-who-are-using">
            {tools[key]?.map(({ href, title, logoUrl }) => (
              <li>
                <Link to={`${location.pathname}${href}`}>
                  <img src={logoUrl} alt="Ant Design" />
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ))}
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
    </>
  );
};
