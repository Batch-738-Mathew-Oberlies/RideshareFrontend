/**
 * API base URI
 */
const baseUri = ``;

/**
 * Base URI port
 */
const port = '';

/**
 * API context path
 */
const contextPath = ``;

/**
 * Google Maps API key
 */
const googleKey = '';

/**
 * Constants for a production config
 */
export const environment = {
  production: true,
  environmentName: 'Production Environment',
  userUri: `${baseUri}:${port}/${contextPath}/users/`,
  loginUri: `${baseUri}:${port}/${contextPath}/login/`,
  batchesUri: `${baseUri}:${port}/${contextPath}/batches/`,
  carUri: `${baseUri}:${port}/${contextPath}/cars/`,
  adminUri: `${baseUri}:${port}/${contextPath}/admins/`,
  tripsURI: `${baseUri}:${port}/${contextPath}/trips/`,
  googleMapKey: `${googleKey}`,
};
