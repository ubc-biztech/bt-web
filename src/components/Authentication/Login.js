import React from 'react'
import { Auth } from "aws-amplify";
import Button from '@material-ui/core/Button';
import { setUser } from '../../actions/UserActions'
import { connect } from "react-redux";

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
                user.admin = true;
                this.props.setUser(user);
            }
            else {
                user.admin = false;
                console.log('not using a biztech e-mail!');
                this.props.setUser(user);
            }
        })
        .catch((err) => console.log("Not signed in", err))

    return (
        <div>
            <h1> Login </h1>
            <Button onClick={() => Auth.federatedSignIn({ provider: 'Google' })} variant="contained" color="primary">
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
