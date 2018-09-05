// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  rootApiUrl: "http://192.168.0.10:8000/",
  firebase: {
    apiKey: "AIzaSyChbdpaza09f_Y5aaVxkMjfm1Hvn0aCRxY",
    authDomain: "fir-plac-debug.firebaseapp.com",
    databaseURL: "https://fir-plac-debug.firebaseio.com",
    projectId: "firebase-plac-debug",
    storageBucket: "firebase-plac-debug.appspot.com",
    messagingSenderId: "705857991353"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
