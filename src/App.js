import React from 'react'
import Router from './components/Router'
import './app.scss'
import CssBaseline from '@material-ui/core/CssBaseline'
import ThemeProvider from './components/ThemeProvider'

function App () {
  return (
    <ThemeProvider className='App'>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  )
}

export default App
