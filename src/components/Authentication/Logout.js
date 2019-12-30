import React from 'react'
import { Auth } from 'aws-amplify'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { logout } from '../../actions/UserActions'

export function Logout(props) {
    return (
      <Button
          variant="contained"
          color="primary"
          onClick={() => {
                Auth.signOut()
                    .then((data) => {
                        console.log(data)
                        props.logout()
                    })
                    .catch((err) => console.log(err))
            }}
        >
            Sign Out
        </Button>
    )
}

export default connect(null, { logout })(Logout)
