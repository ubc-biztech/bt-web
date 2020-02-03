import aws_config from '../aws-config';
// import aws_exports from '../aws-exports';

export const API_URL = process.env.REACT_APP_STAGE  === 'production'
    ? process.env.REACT_APP_PROD_API
    : process.env.REACT_APP_STAGING_API

// TODO: Configure travis to build a staging version
// export const AWS_CONFIG = process.env.REACT_APP_STAGE === 'production'
//     ? aws_config
//     : aws_exports

export const AWS_CONFIG = aws_config

export const API_KEY = process.env.REACT_APP_STAGE  === 'production'
    ? process.env.REACT_APP_PROD_API_KEY
    : process.env.REACT_APP_STAGING_API_KEY
