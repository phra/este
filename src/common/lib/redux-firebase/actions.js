import mapAuthToUser from './mapAuthToUser';

/* eslint-disable max-len */
export const ESTE_REDUX_FIREBASE_LOGIN_ERROR = 'ESTE_REDUX_FIREBASE_LOGIN_ERROR';
export const ESTE_REDUX_FIREBASE_LOGIN_START = 'ESTE_REDUX_FIREBASE_LOGIN_START';
export const ESTE_REDUX_FIREBASE_LOGIN_SUCCESS = 'ESTE_REDUX_FIREBASE_LOGIN_SUCCESS';
export const ESTE_REDUX_FIREBASE_OFF_QUERY = 'ESTE_REDUX_FIREBASE_OFF_QUERY';
export const ESTE_REDUX_FIREBASE_ON_AUTH = 'ESTE_REDUX_FIREBASE_ON_AUTH';
export const ESTE_REDUX_FIREBASE_ON_QUERY = 'ESTE_REDUX_FIREBASE_ON_QUERY';
export const ESTE_REDUX_FIREBASE_RESET_PASSWORD_ERROR = 'ESTE_REDUX_FIREBASE_RESET_PASSWORD_ERROR';
export const ESTE_REDUX_FIREBASE_RESET_PASSWORD_START = 'ESTE_REDUX_FIREBASE_RESET_PASSWORD_START';
export const ESTE_REDUX_FIREBASE_RESET_PASSWORD_SUCCESS = 'ESTE_REDUX_FIREBASE_RESET_PASSWORD_SUCCESS';
export const ESTE_REDUX_FIREBASE_SAVE_USER_ON_AUTH_ERROR = 'ESTE_REDUX_FIREBASE_SAVE_USER_ON_AUTH_ERROR';
export const ESTE_REDUX_FIREBASE_SAVE_USER_ON_AUTH_START = 'ESTE_REDUX_FIREBASE_SAVE_USER_ON_AUTH_START';
export const ESTE_REDUX_FIREBASE_SAVE_USER_ON_AUTH_SUCCESS = 'ESTE_REDUX_FIREBASE_SAVE_USER_ON_AUTH_SUCCESS';
export const ESTE_REDUX_FIREBASE_SIGN_UP_ERROR = 'ESTE_REDUX_FIREBASE_SIGN_UP_ERROR';
export const ESTE_REDUX_FIREBASE_SIGN_UP_START = 'ESTE_REDUX_FIREBASE_SIGN_UP_START';
export const ESTE_REDUX_FIREBASE_SIGN_UP_SUCCESS = 'ESTE_REDUX_FIREBASE_SIGN_UP_SUCCESS';
export const ESTE_REDUX_FIREBASE_WATCH_AUTH = 'ESTE_REDUX_FIREBASE_WATCH_AUTH';
/* eslint-enable max-len */

// function saveUserOnAuth(authData) {
//   return ({ firebase }) => {
//     const user = mapAuthToUser(authData);
//     user.authenticatedAt = firebase.constructor.ServerValue.TIMESTAMP;
//     const { email } = user;
//     // Delete Facebook etc. user email for better security.
//     delete user.email;
//     // But use it as displayName for users logged in via email, because that's
//     // the only info we have.
//     if (user.provider === 'password') {
//       user.displayName = email;
//     }
//     // With Firebase multi-path updates, we can update values at multiple
//     // locations at the same time. Powerful feature for data denormalization.
//     const promise = firebase.update({
//       [`users/${user.id}`]: user,
//       [`users-emails/${user.id}`]: { email }
//     });
//     return {
//       type: 'ESTE_REDUX_FIREBASE_SAVE_USER_ON_AUTH',
//       payload: promise
//     };
//   };
// }

// Social login doesn't work on React Native. Use authWithOAuthToken instead.
async function socialLogin(providerName, firebaseAuth, firebaseAll) {
  if (providerName !== 'facebook') {
    // TODO: Add other providers.
    throw new Error('ESTE_REDUX_FIREBASE_LOGIN not supported provider.');
  }
  const provider = new firebaseAll.auth.FacebookAuthProvider();
  provider.addScope('email,user_friends'); // or user_birthday etc.
  // firebaseAuth.signInWithRedirect(provider);
  // return Promise.resolve();
  try {
    await firebaseAuth.signInWithPopup(provider);
  } catch (error) {
    // alert(error.code, error.message)
    // Some old browsers, like Safari inside Facebook app, need redirect.
    // This will reload page so auth data must be extracted on app start.
    // To test it you have to create Facebook status (private) with link.
    // alert(error.code === 'auth/popup-blocked')
    if (error.code === 'auth/popup-blocked') {
      // Nefunguje, proc?
      // if (!firebase.auth().currentUser) {
      //
      setTimeout(() => {
        firebaseAuth.signInWithRedirect(provider);
      }, 1000)
      // await firebaseAuth.signInWithRedirect(provider);
      // alert('fok')
    }
    throw error;
  }
}

export function login(provider, fields) {
  return async ({ firebaseAuth, firebaseAll }) => {
    const promise = provider === 'password'
      ? firebaseAuth.authWithPassword(fields) // TODO
      : socialLogin(provider, firebaseAuth, firebaseAll);
    return {
      type: 'ESTE_REDUX_FIREBASE_LOGIN',
      payload: promise
    };
  };
}

export function onAuth(authData) {
  return {
    type: ESTE_REDUX_FIREBASE_ON_AUTH,
    payload: { authData }
  };
}

export function resetPassword(email) {
  return ({ firebase }) => {
    const promise = firebase.resetPassword({ email });
    return {
      type: 'ESTE_REDUX_FIREBASE_RESET_PASSWORD',
      payload: promise
    };
  };
}

export function signUp(fields) {
  return ({ firebase }) => {
    const getPromise = async () => {
      await firebase.createUser(fields);
      await firebase.authWithPassword(fields);
    };
    return {
      type: 'ESTE_REDUX_FIREBASE_SIGN_UP',
      payload: getPromise()
    };
  };
}

export function watchAuth(logout) {
  // let wasAuthenticated = false;
  return ({ firebaseAuth, firebaseAll }) => {
    firebaseAuth.getRedirectResult().then(result => {
      // if (result.credential) {
      //   // A Facebook Access Token. You can use it to access the Facebook API.
      //   const token = result.credential.accessToken;
      // }
      const user = result.user;
      alert(JSON.stringify(user));
      // User is null if no redirect operation was called.
      if (user === null) {
        // no redirect, retrieve?
      }
    }).catch(error => {
      // TODO: Show nice error.
      alert(error.message); // eslint-disable-line no-alert
      // // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const email = error.email;
      // // The firebase.auth.AuthCredential type that was used.
      // const credential = error.credential;
    });
    // // Use sync getAuth to set app state immediately.
    // dispatch(onAuth(firebase.getAuth()));
    // // Watch auth.
    // firebase.onAuth(authData => {
    //   dispatch(onAuth(authData));
    //   if (authData) {
    //     wasAuthenticated = true;
    //     dispatch(saveUserOnAuth(authData));
    //   } else {
    //     if (wasAuthenticated) dispatch(logout());
    //   }
    // });
    return {
      type: ESTE_REDUX_FIREBASE_WATCH_AUTH
    };
  };
}
