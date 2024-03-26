import ReactDOM from 'react-dom'
import App from './demo/App'

const container = document.getElementById('dsc-app')

if (container) {
  ReactDOM.render(<App />, container)
}
export default App
