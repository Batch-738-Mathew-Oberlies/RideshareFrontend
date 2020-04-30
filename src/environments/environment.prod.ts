/**
 * This is the base URI
 */
const baseUri = `https://api.4ray.co/rideshare`;

/**
 * Set the port var
 */
const port = '8080';

/**
 * These are the constants for the production config
 */
export const environment = {

  production: true,
  environmentName: 'Production Environment',
  userUri: `${baseUri}/users/`,
  loginUri: `${baseUri}/login/`,
  batchesUri: `${baseUri}/batches/`,
  carUri: `${baseUri}/cars/`,
  adminUri: `${baseUri}/admins/`
};