/**
 * CLIENT URL
 */
const CLIENT_URL = process.env.REACT_APP_STAGE  === 'production'
    ? "https://app.ubcbiztech.com/"
    : "http://localhost:3000/"

const awsmobile = {
    "aws_project_region": "us-west-2",
    "aws_cognito_identity_pool_id": "us-west-2:0bfef155-88d4-40cb-9805-de9d366d6650",
    "aws_cognito_region": "us-west-2",
    "aws_user_pools_id": "us-west-2_w0R176hhp",
    "aws_user_pools_web_client_id": "5tc2jshu03i3bmtl1clsov96dt",
    "oauth": {
        "domain": "auth.ubcbiztech.com",
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
