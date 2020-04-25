/**
 * CLIENT URL
 */
const CLIENT_URL = process.env.REACT_APP_STAGE  === 'production'
    ? "https://app.ubcbiztech.com/"
    : "http://localhost:3000/"

const awsmobile = {
    "aws_project_region": "us-west-2",
    "aws_cognito_identity_pool_id": "us-west-2:19fd1364-9f5b-487b-b169-5db0cf6e5a23",
    "aws_cognito_region": "us-west-2",
    "aws_user_pools_id": "us-west-2_wfv5hw4OC",
    "aws_user_pools_web_client_id": "hsnlooj9jf4mnh7m40dcufpg4",
    "oauth": {
        "domain": "bt-web-dev.auth.us-west-2.amazoncognito.com",
        "scope": [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": CLIENT_URL + "login-redirect/",
        "redirectSignOut": CLIENT_URL,
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS"
};


export default awsmobile;
