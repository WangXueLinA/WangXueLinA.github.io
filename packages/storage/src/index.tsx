type TypeName = 'localStorage' | 'sessionStorage';

type Options = {
  name?: string;
  type?: TypeName;
};

type DefaultOptions = {
  name: string;
  type: TypeName;
};

const defaultOptions: DefaultOptions = {
  name: '',
  type: 'localStorage',
};

const getStorage = (type: TypeName) => {
  if (type === 'localStorage') {
    return localStorage;
  }
  if (type === 'sessionStorage') {
    return sessionStorage;
  }

  throw new Error(`invalid ${type}`);
};
class storage {
  nameSpace: string;
  storage: Storage;
  constructor(options?: Options) {
    this.nameSpace = options?.name || defaultOptions.name;
    this.storage = getStorage(options?.type || defaultOptions.type);
  }

  private getNameSpace = (key: string) => {
    return this.nameSpace + key;
  };

  getLength = () => {
    try {
      return this.storage.length;
    } catch (error) {
      console.error(error);
    }
  };

  setItem = (key: string, data: any) => {
    const spaceKey = this.getNameSpace(key);
    try {
      const stringData = JSON.stringify(data);
      this.storage.setItem(spaceKey, stringData);
    } catch (error) {
      console.error(error);
    }
  };

  getItem = (key: string) => {
    const spaceKey = this.getNameSpace(key);
    try {
      const res = this.storage.getItem(spaceKey);
      if (res === 'null' || res === null) {
        return null;
      }
      if (res === 'undefined' || res === undefined) {
        return undefined;
      }
      return JSON.parse(res);
    } catch (error) {
      console.error(error);
    }
  };

  clear = () => {
    try {
      Object.keys(this.storage)?.forEach((item: string) => {
        if (item.startsWith(this.nameSpace)) {
          this.storage.removeItem(item);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  removeItem = (key: string) => {
    const spaceKey = this.getNameSpace(key);
    try {
      this.storage.removeItem(spaceKey);
    } catch (error) {
      console.log(error);
    }
  };

  key = (key: number) => {
    try {
      return this.storage.key(key);
    } catch (error) {
      console.error(error);
    }
  };
}

export default storage;
