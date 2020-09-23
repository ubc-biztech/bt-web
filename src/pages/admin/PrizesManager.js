import { Paper } from '@material-ui/core'
import React from 'react'
import { Helmet } from 'react-helmet'
import ThemeProvider from '../../components/ThemeProvider'
import PrizesTable from '../../components/PrizesTable.js'

export default function PrizesManager () {
  return (
    <ThemeProvider>
      <Helmet>
        <title>Prizes - BizTech Admin</title>
      </Helmet>
      <PrizesTable />
    </ThemeProvider>
  )
}
