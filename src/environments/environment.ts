/**
 * This file can be replaced during build by using the `fileReplacements` array.
 * The list of file replacements can be found in `angular.json`.
 * `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
 */

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
const contextPath = `rideshare`;

/**
 * Google Maps API key
 */
const googleKey = '';

/**
 * Constants for a development config
 */
export const environment = {
  production: false,
  environmentName: 'Development Environment',
  userUri: `${baseUri}:${port}/${contextPath}/users/`,
  loginUri: `${baseUri}:${port}/${contextPath}/login/`,
  batchesUri: `${baseUri}:${port}/${contextPath}/batches/`,
  carUri: `${baseUri}:${port}/${contextPath}/cars/`,
  adminUri: `${baseUri}:${port}/${contextPath}/admins/`,
  tripsURI: `${baseUri}:${port}/${contextPath}/trips/`,
  googleMapKey: `${googleKey}`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
