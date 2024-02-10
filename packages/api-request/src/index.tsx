import { message } from 'antd';
import axios, { AxiosRequestConfig, Method } from 'axios';

declare module 'axios' {
  interface AxiosRequestConfig<D = any> {
    showMsg?: boolean | string;
    errorMsg?: boolean | string;
    custom?: boolean;
    cacheTime?: number;
    formatRes?: (data: D) => any;
  }
}
// eslint-disable-next-line @typescript-eslint/naming-convention
const ERROR_STATUS = [401, 403, 500];

const instance = axios.create({
  withCredentials: true,
  timeout: 60000,
});
instance.interceptors.request.use((request) => {
  const _DTUI_DEPT = sessionStorage.getItem('DTUI_DEPT') || '';
  if (!request.data) request.data = {};
  if (
    request.method === 'get' ||
    request.method === 'delete' ||
    request.method === 'put'
  ) {
    request.params = request.data;
  }

  if (request.headers) {
    request.headers.DTUI_USER = encodeURIComponent(
      sessionStorage.getItem('userName') || '',
    );
    request.headers.DTUI_DEPT = _DTUI_DEPT;
    request.headers.tenant = _DTUI_DEPT;
    request.headers.reqType = 'ajax';
  }

  return request;
});
instance.interceptors.response.use(
  (response) => {
    const { config, data } = response;
    if (config.responseType === 'blob') {
      if (!(data instanceof Blob)) {
        if (config.errorMsg !== false) {
          message.error(
            (typeof config.errorMsg === 'string'
              ? config.errorMsg
              : data.message) || '系统异常',
          );
        }
        return Promise.reject(data);
      }
      if ('download' in document.createElement('a')) {
        // 非IE下载
        const elink = document.createElement('a');
        // elink.download = data.type
        elink.style.display = 'none';
        const contentDisposition = response.headers['content-disposition'];
        let sFileName = config.params?.fileName;
        if (contentDisposition) {
          sFileName = decodeURIComponent(
            contentDisposition.split('filename=').pop() as string,
          );
        }
        elink.setAttribute('download', sFileName);
        elink.href = URL.createObjectURL(data);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      } else {
        // IE10+下载
        window.open(URL.createObjectURL(data));
      }
      return null;
    }

    if (data.code === 20000 || data.code === 0) {
      if (config.showMsg) {
        message.success(
          typeof config.showMsg === 'string' ? config.showMsg : data.message,
        );
      }
      return data.data;
    }
    if (config.errorMsg !== false) {
      message.error(
        (typeof config.errorMsg === 'string'
          ? config.errorMsg
          : data.message) || '系统异常',
      );
    }
    return Promise.reject(data);
  },
  (error) => {
    const errorMsg = error?.config.errorMsg;
    let tipMsg = '系统异常';
    if (error.response) {
      const { status } = error.response;
      tipMsg = error.response?.data?.message || tipMsg;
      if (ERROR_STATUS.includes(status)) {
        if (status === 401) {
          setTimeout(() => {
            window.location.href = `/${
              window.location.pathname.split('/')[1]
            }/portal/login`;
          }, 1000);
        }
      } else if (status === 413) {
        tipMsg = '上传文件失败：上传文件大小不能超过5m';
      } else if (status === 504) {
        tipMsg = '请求失败: 请求超时，请联系管理员处理';
      }
    }

    if (errorMsg !== false) {
      message.error(
        (typeof errorMsg === 'string' ? errorMsg : tipMsg) || '系统异常',
      );
    }
    return Promise.reject(error);
  },
);

export interface RequestFn<T = any, R = any> {
  (data?: T, showMsg?: boolean | string, errMsg?: boolean | string): Promise<R>;
}
type Cache = {
  [k: string]: {
    time: number;
    result: Promise<any>;
  };
};
const cache: Partial<Cache> = {} as Partial<Cache>;

export function createApiByMethod(method: Method) {
  return function <T>(args: AxiosRequestConfig<T>) {
    return function (target: any, name: string) {
      target[name] = function (
        data?: any,
        showMsg?: boolean,
        errorMsg?: boolean,
      ) {
        const onProgress = data?.onProgress;
        if (onProgress) {
          delete data.onProgress;
        }
        const url = args.url;

        const getResPromise = () =>
          instance({
            method,
            ...args,
            url,
            data,
            onUploadProgress: onProgress,
            onDownloadProgress: onProgress,
            showMsg: showMsg !== undefined ? showMsg : args.showMsg,
            errorMsg: errorMsg !== undefined ? errorMsg : args.errorMsg,
          }).then((res) => {
            return (
              args.formatRes?.(res as unknown as T) ?? (res as unknown as T)
            );
          });

        if (!args.cacheTime) {
          return getResPromise();
        }

        const key = url + JSON.stringify(data);
        if (
          cache[key] &&
          Date.now() - (cache[key]?.time ?? 0) < args.cacheTime
        ) {
          return cache[key]?.result;
        }
        cache[key] = {
          result: getResPromise().catch((err) => {
            cache[key] = undefined;
            return Promise.reject(err);
          }),
          time: Date.now(),
        };
        return cache[key]?.result;
      };

      return target;
    };
  };
}
export const Get = createApiByMethod('get');
export const Post = createApiByMethod('post');
export const Put = createApiByMethod('put');
export const Delete = createApiByMethod('delete');
export const request = instance;
