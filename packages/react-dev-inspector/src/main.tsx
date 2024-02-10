import ReactDOM from 'react-dom';
import App from './demo';
import { createDevInspector } from './index';

if (process.env.NODE_ENV === 'development') {
  console.log('dev');
  createDevInspector();
}
const container = document.getElementById('dsc-app');

if (container) {
  ReactDOM.render(<App />, container);
}
export default App;
