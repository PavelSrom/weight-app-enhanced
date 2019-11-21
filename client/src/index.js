// REACT
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// REDUX
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './store'
// MUI
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

const theme = createMuiTheme({
  palette: {
    primary: { main: '#40c4ff' },
    secondary: { main: '#e0e0e0' }
  }
})

const app = (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
