# vue3-form 基架

维护人： xuelin

<ImagePreview src="/images/vue3-form1.jpg"></ImagePreview>

效果图：

<ImagePreview src="/images/vue3-form2.jpg"></ImagePreview>

提前注册好表单项，<span style='color: red'>必须注册不然在 json 解析时候找不到对应的 key 无法渲染<span>

```js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Antd from 'ant-design-vue';

import {
  Input,
  RadioGroup,
  Select,
  DatePicker,
  CheckboxGroup,
} from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import '@xuelin/vue3-form/dist/style.css';
import { registerComponents } from '@xuelin/vue3-form';

import App from './App.vue';
import router from './router';

// 注册表单组件
registerComponents({
  Input,
  RadioGroup,
  Select,
  CheckboxGroup,
  DatePicker,
});

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(Antd).mount('#app');
```

## 安装

```sh
npm i @xuelin/vue3-form
or
yarn add @xuelin/vue3-form
```

## API
