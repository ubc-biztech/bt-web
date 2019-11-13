import React from 'react'
import { Auth } from "aws-amplify";
import Button from '@material-ui/core/Button';

export default function Logout() {

    return (        
    <Button variant="contained" color="primary" onClick={() => {
        Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }}>
        Sign Out
    </Button>
    )
}
