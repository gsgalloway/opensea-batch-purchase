import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from '@gnosis.pm/safe-react-components'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import GlobalStyle from './GlobalStyle'
import App from './App'

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
