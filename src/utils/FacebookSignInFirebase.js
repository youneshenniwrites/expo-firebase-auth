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
          .then(response => {
            if (response.additionalUserInfo.isNewUser) {
              API.database()
                .ref(`users/${response.user.uid}`)
                .set({
                  firstName: response.additionalUserInfo.profile.first_name,
                  lastName: response.additionalUserInfo.profile.last_name,
                  email: response.user.email,
                  phoneNumber: response.user.phoneNumber,
                  profilePicture:
                    response.additionalUserInfo.profile.picture.data.url,
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
  } else {
    API.auth().signOut();
  }
};

export default onSignInFacebook;
