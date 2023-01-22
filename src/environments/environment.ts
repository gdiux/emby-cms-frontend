// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/**
  
  base_url: 'http://localhost:5000/api',
  base_url: 'https://embydonny.ddns.net/api',
 
*/

export const environment = {
  production: false,
  base_url: 'https://embydonny.ddns.net/api',
  api_key: 'ee4d7ba82b8b4695bfdd0c55bbffc05d',
  emby_url: 'https://embyd.mediafunbox16.xyz/emby'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
