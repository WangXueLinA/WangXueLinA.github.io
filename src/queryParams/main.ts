import qs from 'qs'

export function getQueryParams<T = Record<string, any>>(
  search = window.location.search,
) {
  return (qs.parse(search?.replace(/^\?/, '')) || {}) as unknown as T;
}
export const toQueryParams = (data: object) => qs.stringify(data);
export function JSONParse<T>(...args: Parameters<typeof JSON.parse>): T {
  const [v] = args;
  try {
    return JSON.parse(...args);
  } catch (e) {
    return v as unknown as T;
  }
}

export const toJsonString = (obj: Record<string, any>) => {
  const item = {
    ...obj,
  };
  return encodeURIComponent(JSON.stringify(item));
};
