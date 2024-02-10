/* eslint-disable consistent-return */
/* eslint-disable react/sort-comp */
import { Modal } from 'antd';
import cookies from 'js-cookie';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import proxyConfig from './proxyConfig';

const DEV_REQUEST_INFO = `DEV_REQUEST_INFO`;
let defaultConfig = proxyConfig;
let acbb = cookies.get('acbb') || '';
class Dev extends React.Component<any, { visible: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
    };
    if (Object.keys(props.options || {})?.length) {
      defaultConfig = props.options;
    }
    try {
      const local = JSON.parse(localStorage.getItem(DEV_REQUEST_INFO) as any);
      if (local) {
        defaultConfig = local;
      }
    } catch (error) {}
    this.init();
  }

  init() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const _send = window.XMLHttpRequest.prototype.send;
    const _fetch = window.fetch;
    const requestInfo = JSON.stringify(defaultConfig)
      .replace(/\${baseUrl}/g, defaultConfig.baseUrl)
      .replace(/\${prefix}/g, defaultConfig.prefix)
      .replace(/\${port}/g, defaultConfig.port);
    window.XMLHttpRequest.prototype.send = function send(...args) {
      this.setRequestHeader('DEV_REQUEST_INFO', requestInfo);
      _send.apply(this, args);
    };
    const defaultOptions = { headers: {} };
    window.fetch = function fetch(url, options = defaultOptions) {
      return _fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          DEV_REQUEST_INFO: requestInfo,
        },
      });
    };
  }

  handleOk = () => {
    const { proxy, baseUrl, prefix, port } = defaultConfig;
    try {
      localStorage.setItem(
        DEV_REQUEST_INFO,
        JSON.stringify({
          baseUrl,
          prefix,
          port,
          proxy: typeof proxy === 'string' ? JSON.parse(proxy) : proxy,
        }),
      );
      cookies.set('acbb', acbb);
      this.handleCancel();
      sessionStorage.clear();
      window.location.reload();
    } catch (error) {
      console.log('error: ', error);
      return alert('无效的json格式');
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleShow = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    return (
      <>
        <Modal
          prefixCls={
            this.props.prefixCls ? `${this.props.prefixCls}-modal` : undefined
          }
          title="环境设置"
          visible={this.state.visible}
          onOk={this.handleOk}
          width="800px"
          onCancel={this.handleCancel}
          maskClosable={false}
        >
          <div className="DEV_REQUEST_INFO">
            <div>baseUrl: </div>
            <input
              defaultValue={defaultConfig.baseUrl}
              onChange={(e) => {
                defaultConfig.baseUrl = e.target.value;
              }}
            />
            <div>port: </div>
            <input
              defaultValue={defaultConfig.port}
              onChange={(e) => {
                defaultConfig.port = e.target.value;
              }}
            />
            <div>prefix: </div>
            <input
              defaultValue={defaultConfig.prefix}
              onChange={(e) => {
                defaultConfig.prefix = e.target.value;
              }}
            />
            <div>acbb: </div>
            <input
              defaultValue={acbb}
              onChange={(e) => {
                acbb = e.target.value;
              }}
            />
            <div>代理映射 </div>
            <textarea
              defaultValue={JSON.stringify(defaultConfig.proxy || '', null, 2)}
              rows={10}
              onChange={(e) => {
                defaultConfig.proxy = e.target.value as any;
              }}
            />
          </div>
        </Modal>
        <div id="DEV_REQUEST_INFO" onClick={this.handleShow}>
          DEV
        </div>
      </>
    );
  }
}

const proxyFun = (options: any, prefixCls?: string) => {
  const dev = document.createElement('div');
  ReactDOM.render(<Dev options={options} prefixCls={prefixCls} />, dev);
  document.body.appendChild(dev);
};
export default proxyFun;
