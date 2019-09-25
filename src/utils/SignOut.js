import API from './Firebase';

const SignOut = () => API.auth().signOut();

export default SignOut;
