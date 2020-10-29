import React from 'react'
import { Link } from 'react-router-dom'

import { Alert } from '@material-ui/lab'
import './RegisterAlert.scss'

export default function RegisterAlert () {
  return (
    <Alert severity='warning'>
          You are not yet registered as a user!&nbsp;
      <Link to='/member/create'>Signup</Link>&nbsp;
          to be able to register for events with ease!
    </Alert>
  )
}
