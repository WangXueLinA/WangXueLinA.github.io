import Cookies from 'js-cookie';
import moment, { Moment } from 'moment';
import qs from 'qs';

type DataType = Moment | string | null;

export const dateToStr = (
  list?: DataType | DataType[],
  format = 'YYYY-MM-DD',
): string[] => {
  if (!list) return [];
  if (!Array.isArray(list)) {
    list = [list];
  }
  return list.map((item) => (item ? moment(item).format(format) : ''));
};

export const strToMoment = (
  list?: DataType | DataType[],
): Array<Moment | null> => {
  if (!list) return [];
  if (!Array.isArray(list)) {
    list = [list];
  }
  return list.map((item) => (item ? moment(item) : null));
};

export const toQueryParams = (data: object) => qs.stringify(data);

export const getXsrfToken = () => {
  return Cookies.get('XSRF-TOKEN') as string;
};

export function getQueryParams<T = Record<string, any>>(
  search = window.location.search,
) {
  return (qs.parse(search?.replace(/^\?/, '')) || {}) as unknown as T;
}

export function JSONParse<T>(...args: Parameters<typeof JSON.parse>): T {
  const [v] = args;
  try {
    return JSON.parse(...args);
  } catch (e) {
    return v as unknown as T;
  }
}

export const toJsonString = (obj: Record<string, any>) => {
  return encodeURIComponent(JSON.stringify(obj));
};
