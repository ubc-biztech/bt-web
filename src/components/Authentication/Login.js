import React from 'react'
import { Auth } from 'aws-amplify'
import Button from '@material-ui/core/Button'

const styles = {
    left: {
        float: 'left',
    },
    socialIcon: {
        marginTop: '5px',
        marginRight: '8px',
        width: '19px',
    },
}

export default function Login() {
    return (
        <div>
            <h1> Login </h1>
        <Button
                onClick={() => Auth.federatedSignIn({ provider: 'Google' })}
            variant="contained"
                color="primary"
          >
                <div style={styles.left}>
            <img style={styles.socialIcon} alt="Google" src="./google.png" />
          </div>
                Sign In with Google
            </Button>
      </div>
    )
}
