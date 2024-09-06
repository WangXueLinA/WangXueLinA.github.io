import { Card, Col, Row } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import './index.less';
import { groupAndTransform, tools } from './utils';

// @ts-expect-error: Unreachable code errorß
const files = require.context('../../docs/note', false, /\w.md$/);

const modules = files.keys().map((key: string) => {
  const name = key.replace(/^\.\//, '').replace(/\.md$/, '');
  return name;
});

const finalResult = groupAndTransform(modules, 2);
console.log(finalResult);

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
            {tools?.[key]
              ?.filter((item) => modules.includes(item.title))
              ?.map(({ href, title }) => (
                <li>
                  <Link to={`${location.pathname}note/${title}`}>
                    <img src={href} alt="Ant Design" />
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
