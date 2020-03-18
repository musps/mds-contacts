import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Client as Styletron} from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'

import reducers from './reducers'
import App from './App'

const store = createStore(reducers)
const engine = new Styletron()

render(
  <Provider store={store}>
    <StyletronProvider value={engine}>
      <App />
    </StyletronProvider>
  </Provider>,
  document.getElementById('root')
)
