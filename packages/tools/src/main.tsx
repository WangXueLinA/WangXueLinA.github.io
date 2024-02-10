import ReactDOM from 'react-dom';

const container = document.getElementById('dsc-app');

function App() {
  return <div>公共方法、工具类</div>;
}

if (container) {
  ReactDOM.render(<App />, container);
}
export default App;
