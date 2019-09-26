import API from './Firebase';

import isUserEqualFacebook from './IsUserEqualFacebook';

const onSignInFacebook = token => {
  if (token) {
    const unsubscribe = API.auth().onAuthStateChanged(firebaseUser => {
      unsubscribe();
      if (!isUserEqualFacebook(token, firebaseUser)) {
        const credential = API.auth.FacebookAuthProvider.credential(token);
        API.auth()
          .signInWithCredential(credential)
          .catch(err => console.log(err));
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  } else {
    API.auth().signOut();
  }
};

export default onSignInFacebook;
