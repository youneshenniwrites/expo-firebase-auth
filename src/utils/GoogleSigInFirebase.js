import API from './Firebase';

import isUserEqualGoogle from './IsUserEqualGoogle';

const onSignInGoogle = googleUser => {
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  const unsubscribe = API.auth().onAuthStateChanged(function(firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqualGoogle(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      const credential = API.auth.GoogleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken
      );
      // Sign in with credential from the Google user.
      API.auth()
        .signInWithCredential(credential)
        .then(response => {
          if (response.additionalUserInfo.isNewUser) {
            API.database()
              .ref(`users/${response.user.uid}`)
              .set({
                email: response.user.email,
                firstName: response.additionalUserInfo.profile.given_name,
                lastName: response.additionalUserInfo.profile.family_name,
                locale: response.additionalUserInfo.profile.locale,
                profilePicture: response.additionalUserInfo.profile.picture,
                createdAt: Date.now(),
              });
          } else {
            API.database()
              .ref(`users/${response.user.uid}`)
              .update({
                lastLogIn: Date.now(),
              });
          }
        })
        .catch(err => console.log(err));
    } else {
      console.log('User already signed-in Firebase.');
    }
  });
};

export default onSignInGoogle;
