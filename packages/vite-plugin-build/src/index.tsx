import { IFatherConfig, defineConfig } from 'father';
import { Service } from 'father/dist/service/service';
import fs from 'fs-extra';
import path from 'path';
import { PluginOption, mergeConfig } from 'vite';

type CssInJs = (params?: IFatherConfig) => PluginOption;
const ignores = [
  'src/vite-env.d.ts',
  'src/demo/**',
  'src/assets/**',
  'src/main.tsx',
  'src/App.tsx',
];
const resolve = (...paths: string[]) => path.resolve(process.cwd(), ...paths);
const cssInJs: CssInJs = (conf): PluginOption => {
  const config = defineConfig(
    mergeConfig(
      {
        esm: { ignores, output: '/lib/esm' },
        cjs: { ignores, output: '/lib/cjs' },
      },
      conf || {},
    ),
  );
  return {
    name: 'build',
    apply: 'build',
    async buildStart() {
      const service = new Service();
      const _resolveConfig = service.resolveConfig.bind(service);
      service.resolveConfig = async function () {
        const data = await _resolveConfig();
        this.config = config;
        return {
          ...data,
          config: { ...data.defaultConfig, ...config },
        };
      };
      await service.run({
        name: 'build',
      });
      if (fs.existsSync(resolve('public'))) {
        fs.copySync(resolve('public'), resolve('lib'));
      }
      if (fs.existsSync(resolve('src/index.less'))) {
        fs.copyFileSync(resolve('src/index.less'), resolve('lib/index.less'));
      }
      fs.copyFileSync(resolve('package.json'), resolve('lib/package.json'));
      console.log = () => {};
      console.warn = () => {};
    },
    config() {
      return {
        build: {
          emptyOutDir: false,
          rollupOptions: {
            output: {
              dir: resolve('node_modules/.temp/dist'),
            },
          },
          lib: {
            entry: 'src/vite-env.d.ts',
            name: 'noop',
            formats: [],
          },
        },
        optimizeDeps: {
          esbuildOptions: {
            plugins: [
              {
                name: 'replace-code',
                setup(build) {
                  const cache = new Map<
                    string,
                    { input: string; output: any }
                  >();
                  build.onLoad(
                    { filter: /\/dtd\/es\/locale-provider\/index\.js/ },
                    (params) => {
                      const key = params.path;
                      let value = cache.get(key);
                      const input = fs.readFileSync(key, 'utf8');
                      if (value && input === value.input) {
                        return value.output;
                      }
                      if (input.includes('import * as moment from')) {
                        const contents = input.replace(
                          'import * as moment from',
                          'import moment from',
                        );
                        value = { input, output: { contents } };
                        cache.set(key, value);
                        return value.output;
                      }
                      return undefined;
                    },
                  );
                },
              },
            ],
          },
        },
      };
    },
  };
};
export default cssInJs;
