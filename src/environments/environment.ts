// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  rootApiUrl: "//api.placapp.com/",
  //rootApiUrl: "http://192.168.0.10:8000/",
  firebase: {
    apiKey: "AIzaSyCZRgNVO95U9t7rowIkfEVKpekEQLHtd0c",
    authDomain: "plac-release.firebaseapp.com",
    databaseURL: "https://plac-release.firebaseio.com",
    projectId: "plac-release",
    storageBucket: "plac-release.appspot.com",
    messagingSenderId: "839585325028"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
