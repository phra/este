// www.andrewsouthpaw.com/2015/02/08/environment-variables
import nconf from 'nconf';

// Use less-terrible separator character, stackoverflow.com/questions/25017495
nconf.env('__');

// Uncomment for local development with sensitive secrets.
// nconf.file('src/common/secrets.json');

// Remember, never put sensitive secrets here! Use environment variables for
// production and secrets.json for development.
nconf.defaults({
  appName: require('../../package.json').name,
  // Use appVersion defined in gulp env task or Heroku dyno metadata.
  appVersion: process.env.appVersion || process.env.HEROKU_SLUG_COMMIT,
  defaultLocale: 'en',
  firebase: {
    // https://firebase.google.com/docs/web/setup#add_firebase_to_your_app
    client: {
      apiKey: "AIzaSyBEkQXnrmW3zbB1XHGYv1waLAFP17amEkY",
      authDomain: "este-dev.firebaseapp.com",
      databaseURL: "https://este-dev.firebaseio.com",
      storageBucket: "este-dev.appspot.com",
    },
    // https://firebase.google.com/docs/server/setup#initialize_the_sdk
    server: {
      databaseURL: "https://este-dev.firebaseio.com",
      serviceAccount: {
        "project_id": "este-dev",
        "client_email": "server-render@este-dev.iam.gserviceaccount.com",
        // This private_key here is ok. It's for dev only.
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQD3f3R6cEp3e1CS\nWi+vVBDo02QA72ij6hay1frHUVbpIiA6KVperx/zjhdwVaOShDHAgBdoBoPnh1Li\ngOb0UtIYZ0dGfnUv0eaWbSkm/WqHZKRFg8VOsZLzhxHntR95bQWeVVbhFGN5gz11\nQoNWGy7EvSxFr5HbJPQ0rDA99lHsUgEgii2q4RWqS/W0727J+C7tcg2pzxJUAUzk\n1sNb2n0G94YnV/I7QyDe/cpUJ1ZWdow+NwNKQUk/gZP9b4F6QRIHIwxC401+/BJk\n4dIPeQVsVz9ERZm3y/uV2t/jd1r57t4VhIlrPz90ojRYOb9lJoEqP4QTdeorfVtu\nFHDFMVKTAgMBAAECggEAbmLMYqeervezEfNjfUFzYUSXP8uH0kPf59eESE3BA64S\nzZ4QDlbxW0Guto2brQeE4STAS8dMIYG7uAZh++rMhdHaeliAj9mAjOsXBarVTpnW\noqKI5/ZPYoqFs+CWryOu89WAMFdVnqaoTJpj1Y2+KEVvb41E8obi3HNH+PrZwxpX\nl1IBbnua7Ix/A7kZSoUlBzhF4nFVzoV/OcE/NQwBylbt+E7t5Ab7QOxbQMIWDyX2\n6F3VOR3eCKjludajRCwk2TSduURLGB3Owf8i0xrbG2WpFJfdDTSL5x0AeiP3CbTR\nO6htptBqTJrQIsmN2RTBTydX//p3ojIhMbZ7c+bpwQKBgQD90gPUHgfL0mf/q261\nfqF0CWK3fUsL/PO96DZbCM1sJAnSQaHW+k0nGn8rJkXb+fB4t/dEaYXmNaOW8qri\nYPgZkYV+lN+f4y0wco2OKrynJm32GjTDEtLYQOFzvjIAEFzrC70cqTSc6k7WZSpT\nHGq2lvbP4g6VRzZUip5gbHZ8EQKBgQD5n4p+nDyKbKS/rqmdiMyrwO2toFKOgzwr\n52kHvLvEBagtkmVsxBjtR4CHjrvhhXWBYii3IJqsiDihtLUgn9Uga3F09yCGNgNn\n+4+n1tAtYg2cPd5Oo47Setqh6RTKLbEsMIclcD11E6SwPopdLfakenCzbZ7TlLiA\npTYVlKHYYwKBgBuvCFPeYqNMc6NjI1QQV7O8QlQZClJoaH1SEnujXiRpWdjg57H2\n4utc7HncVspDXIMOLZ38lGojd5BDL3g5c1X2lUTVH/7kXE1ocSAMcT8Z5extt0t/\nhheoG+7v06xGHJxWT24M1nw24hpoNlGSS+FWXd0WntiRR8+4vsVtjw7BAoGBAO8P\np+dRYXmAStd4QuCoHrtubTGXFPl/HaU+XgwW6Av3DvV1+sSLmQPFMoagX7a/xaU/\niJa5FuidHP9gvQadi9Mcku/drLxcBi8TcKTgyUZtXXOAnOLbKPDSz4e4XTyzPbaA\nUy27rF/vjA1uF7zdRBSJXl24Yh9nkrtBfeZ1DfrZAoGBAK2+Cam/dE9frQcG9OVo\n4ooTY9Xa330uVBw8w082yBwVT0PXtgi7Q8nF7xsFC9JpLU2PnWHzdLsUDGlolm9+\nsmPmo9sUmvC0gPD7ootaHxpxlYY/ZXq/NM+U/sh7QtCsJKDz2Mou40Ndj6FeoLUM\n8IwKwy+aRHntkEtKOu5ADnC5\n-----END PRIVATE KEY-----\n",
      }
    }
  },
  googleAnalyticsId: 'UA-XXXXXXX-X',
  isProduction: process.env.NODE_ENV === 'production',
  locales: ['cs', 'de', 'en', 'es', 'fr', 'pt', 'ro'],
  port: process.env.PORT || 8000,
  sentryUrl: 'https://f297cec9c9654088b8ccf1ea9136c458@app.getsentry.com/77415',
});

export default nconf.get();
