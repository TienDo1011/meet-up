// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyC1LWZvMFWsbWNVHQkZIjuWt7ckuE9c9vs',
    authDomain: 'meetup-78118.firebaseapp.com',
    databaseURL: 'https://meetup-78118.firebaseio.com',
    projectId: 'meetup-78118',
    storageBucket: 'meetup-78118.appspot.com',
    messagingSenderId: '244528963795'
  }
};
