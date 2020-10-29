import React from 'react'
import Router from 'components/Router'
import CssBaseline from '@material-ui/core/CssBaseline'
import ThemeProvider from 'context/ThemeProvider'

function App () {
  return (
    <ThemeProvider className='App'>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  )
}

export default App
