/**
 * This is the base URI
 */
const baseUri = `http://rideshare.revatureprojects.com:8081/rideshare/`;

const port = '8080';
  /**
   * These are the dev environment variables
   */
export const environment = {

  production: false,
  environmentName: 'Default Dev Environment',
  userUri: `${baseUri}/users/`,
  loginUri: `${baseUri}/login/`,
  batchesUri: `${baseUri}/batches/`,
  carUri: `${baseUri}/cars/`,
  adminUri: `${baseUri}/admins/`
};