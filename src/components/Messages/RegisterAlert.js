import React from 'react'
import { Link } from 'react-router-dom'

import Alert from '@material-ui/lab/Alert'
import './index.css'

export default function RegisterAlert () {
  return (
    <Alert severity='warning'>
          You are not yet registered as a user!&nbsp;
      <Link to='/new-member'>Signup</Link>&nbsp;
          to be able to register for events with ease!
    </Alert>
  )
}
