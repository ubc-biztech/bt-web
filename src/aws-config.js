/**
 * CLIENT URL
 */
export const CLIENT_URL = process.env.REACT_APP_STAGE === 'production'
    ? "https://app.ubcbiztech.com/"
    : "http://localhost:3000/"
    
const awsmobile = {
    "aws_project_region": "us-west-2",
    "aws_cognito_identity_pool_id": process.env.REACT_APP_AWS_COGNITO_POOL_ID,
    "aws_cognito_region": "us-west-2",
    "aws_user_pools_id": process.env.REACT_APP_AWS_USER_POOLS_ID,
    "aws_user_pools_web_client_id": process.env.REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID,
    "oauth": {
        "domain": process.env.REACT_APP_OATH_DOMAIN,
        "scope": [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": "http://localhost:3000/login-redirect/",
        "redirectSignOut": "http://localhost:3000/",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS"
};


export default awsmobile;
