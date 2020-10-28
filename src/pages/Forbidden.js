import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Button from '@material-ui/core/Button'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: '100vh'
  }
}

const Forbidden = () => {
  return (
    <div style={styles.container}>
      <Helmet>
        <title>UBC BizTech - Forbidden Route</title>
      </Helmet>
      <h1>403: Forbidden</h1>
      <p>
                Sorry! The current account does not have the necessary permissions to access the page.
        <br />
                Please log in with a different account with admin privileges
      </p>
      <Link to='/'><Button variant='contained' color='primary'>Home</Button></Link>
    </div>
  )
}

export default Forbidden
