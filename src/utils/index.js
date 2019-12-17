export const API_URL = process.env.REACT_APP_STAGE === 'production'
    ? process.env.REACT_APP_PROD_API
    : process.env.REACT_APP_STAGING_API

export const API_KEY = process.env.REACT_APP_STAGE === 'production'
? process.env.REACT_APP_PROD_API_KEY
: process.env.REACT_APP_STAGING_API_KEY