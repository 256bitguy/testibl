import * as AuthConstants from "../Constants/AuthConstants";

export const AuthReducer = (state = {}, action) => {
  switch (action.type) {
    case AuthConstants.AUTH_REQUEST:
      return { userLoading: true };
    case AuthConstants.LOGIN:
      return { userLoading: false, authResponse: action.payload };
    case AuthConstants.LOGOUT:
      return { userLoading: false };
    case AuthConstants.FORGOT_PASSWORD:
      return { userLoading: false, authResponse: action.payload };
    case AuthConstants.CHANGE_PASSWORD:
      return { userLoading: false, authResponse: action.payload };
    case AuthConstants.AUTH_ERROR:
      return { userLoading: false, authError: action.payload };
    default:
      return state;
  }
};
