import * as AuthConstants from "../Constants/AuthConstants";

export const UserLogin = (values) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firebase = getFirebase();
      const firestore = getFirestore();
      dispatch({ type: AuthConstants.AUTH_REQUEST });
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(
          "67vivekraj@gmail.com",
          "12345"
        );

      const user = await firestore
        .collection("users")
        .doc(response.user.uid)
        .get();

      localStorage.setItem("isUserLoggedIn", true);
      localStorage.setItem("name", user.get("name"));
      localStorage.setItem("createdAt", user.get("createdAt"));
      localStorage.setItem("email", user.get("email"));
      localStorage.setItem("phoneNumber", user.get("phoneNumber"));
      //   localStorage.setItem("profilePicUrl", user.get("profilePicUrl"));
      localStorage.setItem("role", user.get("role"));
      localStorage.setItem("userId", user.get("userId"));
      dispatch({ type: AuthConstants.LOGIN, payload: response });
    } catch (error) {
      dispatch({ type: AuthConstants.AUTH_ERROR, payload: error.code });
    }
  };
};

export const UserLogout = () => {
  return async (dispatch, getState, { getFirebase }) => {
    try {
      const firebase = getFirebase();
      dispatch({ type: AuthConstants.AUTH_REQUEST });
      await firebase.auth().signOut();
      localStorage.clear();
      dispatch({ type: AuthConstants.LOGOUT });
    } catch (error) {
      dispatch({ type: AuthConstants.AUTH_ERROR, payload: error.code });
    }
  };
};

export const UserForgotPassword = (email) => {
  return async (dispatch, getState, { getFirebase }) => {
    try {
      const firebase = getFirebase();
      dispatch({ type: AuthConstants.AUTH_REQUEST });
      await firebase.auth().sendPasswordResetEmail(email.trim());
      dispatch({
        type: AuthConstants.FORGOT_PASSWORD,
        payload: "auth/reset-password-success",
      });
    } catch (error) {
      dispatch({ type: AuthConstants.AUTH_ERROR, payload: error.code });
    }
  };
};
