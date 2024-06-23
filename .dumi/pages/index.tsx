import { Card, Col, Row } from 'antd';
import './index.less';

export default () => {
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
      <Row gutter={16}>
        <Col span={12}>
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
