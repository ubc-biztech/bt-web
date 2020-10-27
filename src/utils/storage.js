import Storage from '@aws-amplify/storage'
import { log } from './index'

export const STORAGE_PRIZES = 'prizes'
export const STORAGE_SPONSORS = 'sponsors'
export const STORAGE_DIRECTORIES = [STORAGE_SPONSORS, STORAGE_PRIZES]

/**
 * Uploads file to S3 bucket. If directory is not allowed or error occurs, returns empty string.
 * Otherwise returns bucket file key.
 * @param {*} directory S3 bucket directory
 * @param {*} file the file object
 * @param {*} name name that will be associated with file in bucket
 * @param {*} type file type
 */
export function uploadFile (directory, file, name, type) {
  if (!STORAGE_DIRECTORIES.includes(directory)) {
    // or throw an error in the future
    return ''
  }

  Storage.put(`${directory}/${name}`,
    file,
    { contentType: type })
    .then(result => {
      return result.key
    })
    .catch(err => {
      log(err)
      return ''
    })
};

/**
 * Given key, get file from S3 bucket. If key is found, will return url used to download file.
 */
export function getFileUrl (key) {
  Storage.get(key)
    .then(url => {
      return url
    })
    .catch(err => {
      log(err)
      return ''
    })
}
