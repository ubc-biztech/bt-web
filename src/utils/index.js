import aws_config from '../aws-config';

export const API_URL = process.env.REACT_APP_STAGE === 'production'
    ? process.env.REACT_APP_PROD_API
    : process.env.REACT_APP_STAGING_API

// TODO: Configure travis to build a staging version
// export const AWS_CONFIG = process.env.REACT_APP_STAGE === 'production'
//     ? aws_config
//     : aws_exports

export const AWS_CONFIG = aws_config

export const API_KEY = process.env.REACT_APP_STAGE === 'production'
    ? process.env.REACT_APP_PROD_API_KEY
    : process.env.REACT_APP_STAGING_API_KEY

export function fetchBackend(endpoint, method, body) {
    let headers;
    if (method === 'POST') {
        headers = {
            'x-api-key': API_KEY,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    } else { // method === 'GET'
        headers = {
            'x-api-key': API_KEY
        }
    }
    return fetch(API_URL + endpoint, { method, headers, body })
}

export function log(message) {
    if (process.env.REACT_APP_STAGE !== 'production') {
        console.log(message)
    }
}