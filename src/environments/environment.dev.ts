/**
 * API base URI
 */
const baseUri = `http://localhost`;

/**
 * Base URI port
 */
const port = '8080';

/**
 * API context path
 */
const contextPath = ``;

/**
 * Google Maps API key
 */
const googleKey = '';

/**
 * Constants for a development config
 */
export const environment = {
  production: false,
  environmentName: 'Local Development Environment',
  userUri: `${baseUri}:${port}/${contextPath}/users/`,
  loginUri: `${baseUri}:${port}/${contextPath}/login/`,
  batchesUri: `${baseUri}:${port}/${contextPath}/batches/`,
  carUri: `${baseUri}:${port}/${contextPath}/cars/`,
  adminUri: `${baseUri}:${port}/${contextPath}/admins/`,
  tripsURI: `${baseUri}:${port}/${contextPath}/trips/`,
  googleMapKey: `${googleKey}`,
};
