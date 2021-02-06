
// TODO: Configure travis to build a staging version
// export const AWS_CONFIG = process.env.REACT_APP_STAGE === 'production'
//     ? aws_config
//     : aws_exports

export const API_URL = process.env.REACT_APP_STAGE === 'production'
  ? "https://nuidax7451.execute-api.us-west-2.amazonaws.com/prod"
  : "https://api-dev.ubcbiztech.com"

export const CLIENT_URL = process.env.REACT_APP_STAGE === 'production'
  ? 'https://app.ubcbiztech.com/'
  : 'http://localhost:3000/'

export const AWS_CONFIG = {
  Auth: {
    aws_project_region: 'us-west-2',
    aws_cognito_identity_pool_id: 'us-west-2:0bfef155-88d4-40cb-9805-de9d366d6650',
    aws_cognito_region: 'us-west-2',
    aws_user_pools_id: 'us-west-2_w0R176hhp',
    aws_user_pools_web_client_id: '5tc2jshu03i3bmtl1clsov96dt',
    oauth: {
      domain: 'auth.ubcbiztech.com',
      scope: [
        'phone',
        'email',
        'openid',
        'profile',
        'aws.cognito.signin.user.admin'
      ],
      redirectSignIn: CLIENT_URL + 'login-redirect/',
      redirectSignOut: CLIENT_URL,
      responseType: 'code'
    },
    federationTarget: 'COGNITO_USER_POOLS',
    identityPoolId: 'us-west-2:0bfef155-88d4-40cb-9805-de9d366d6650',
    region: 'us-west-2',
    userPoolId: 'us-west-2_w0R176hhp',
    userPoolWebClientId: '5tc2jshu03i3bmtl1clsov96dt'
  },
  Storage: {
    bucket: process.env.REACT_APP_BUCKET_NAME,
    region: 'us-west-2',
    identityPoolId: 'us-west-2:0bfef155-88d4-40cb-9805-de9d366d6650'
  }
}
