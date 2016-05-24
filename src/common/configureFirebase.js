import firebase from 'firebase';

export default function configureFirebase(options) {
  firebase.initializeApp(options);
  const firebaseDeps = {
    firebase: firebase.database().ref(),
    firebaseAll: firebase,
    firebaseAuth: firebase.auth(),
  };
  // // Check whether things work.
  // firebaseDeps.firebase.child('hello-world').set({
  //   // firebase.google.com/docs/reference/js/firebase.database#.ServerValue
  //   createdAt: firebaseDeps.firebaseAll.database.ServerValue.TIMESTAMP,
  //   text: 'test'
  // });
  return firebaseDeps;
}
