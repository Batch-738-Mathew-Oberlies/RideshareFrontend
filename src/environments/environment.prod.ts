/**
 * This is the base URI
 */
const baseUri = `https://back.rideshare.revatureprojects.com/rideshare/`;

/**
 * Set the port var
 */
const port = '8080';

/**
 * google map api key 
 */
const googleKey = '';

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
  adminUri: `${baseUri}/admins/`,
  tripUri: `${baseUri}/trips/`,
  googleMapKey: `${googleKey}`,

};
