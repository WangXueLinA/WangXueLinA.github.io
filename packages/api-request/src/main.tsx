import { Get, RequestFn } from './index';

class Api {
  @Get({ url: '/catalog-mng/mng/service/users/getPrivileges' })
  static getPrivileges: RequestFn<any, string[]>;
}

Api.getPrivileges().then((res) => {
  console.log('res: ', res);
});
