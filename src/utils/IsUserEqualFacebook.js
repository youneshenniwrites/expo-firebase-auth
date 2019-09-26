import API from './Firebase';

const isUserEqualFacebook = (facebookAuthResponse, firebaseUser) => {
  if (firebaseUser) {
    const { providerData } = firebaseUser;
    for (let i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId ===
          API.auth.FacebookAuthProvider.PROVIDER_ID &&
        providerData[i].uid === facebookAuthResponse.userID
      ) {
        // We don't need to re-auth the Firebase connection.
        return true;
      }
    }
  }
  return false;
};

export default isUserEqualFacebook;
