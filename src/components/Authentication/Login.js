import React from 'react'
import { Auth } from "aws-amplify";
import Button from '@material-ui/core/Button';
import { setUser } from '../../actions/UserActions'
import { connect } from "react-redux";
import { Helmet } from 'react-helmet';

const styles = {
    left: {
        float: 'left'
    },
    socialIcon: {
        marginTop: '5px',
        marginRight: '8px',
        width: '19px'
    }
};

function Login(props) {

    Auth.currentAuthenticatedUser()
        .then(user => {
            const email = user.attributes.email
            if (email.substring(email.indexOf("@") + 1, email.length) === 'ubcbiztech.com') {
                props.setUser(user)
            }
            else {
                Auth.signOut()
                alert('You must use a ubcbiztech.com email')
            }
        })
        .catch((err) => console.log("Not signed in", err))

    return (
        <div>
            <Helmet>
                <title>UBC BizTech - Log In or Sign Up</title>
            </Helmet>
            <h1> Login </h1>
            <Button onClick={() => Auth.federatedSignIn({ provider: 'Google' }).then(() => Auth.currentAuthenticatedUser({ bypassCache: true }))} variant="contained" color="primary">
                <div style={styles.left}>
                    <img style={styles.socialIcon} alt="Google" src="./google.png" />
                </div>
                Sign In with Google
            </Button>
        </div >
    )

}

const mapStateToProps = state => {
    return {
        user: state.userState.user,
    };
};

export default connect(mapStateToProps, { setUser })(Login);
