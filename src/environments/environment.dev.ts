/**
 * This is the base URI
 */
const baseUri = `http://localhost`;

const port = '8081';

/**
 * google map api key 
 */
const googleKey = '';

  /**
   * These are the dev environment variables
   */
export const environment = {

  production: false,
  environmentName: 'Default Dev Environment',
  userUri: `${baseUri}:${port}/rideshare/users/`,
  loginUri: `${baseUri}:${port}/rideshare/login/`,
  batchesUri: `${baseUri}:${port}/rideshare/batches/`,
  carUri: `${baseUri}:${port}/rideshare/cars/`,
  tripUri: `${baseUri}:${port}/rideshare/trips/`,
  adminUri: `${baseUri}:${port}/rideshare/admins/`,
  googleMapKey: `${googleKey}`,
};
