import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.scss'
import { Provider } from 'react-redux'
import store from './redux/Store.js'


ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <App />
  </Provider>
)
