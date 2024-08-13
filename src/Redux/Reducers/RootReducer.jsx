import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { combineReducers } from "redux";
import {
  AddAssetReducer,
  AddCompanyReducer,
  AddSpareReducer,
  AddUserReducer,
  GetAssetSparesReducer,
  GetCompaniesReducer,
  GetCompanyAssetsReducer,
  GetSparesReducer,
  GetClientUsersReducer,
  AddAssetSpareReducer,
  GetCompanyAssetByIdReducer,
} from "./AdminReducer";
import { AuthReducer } from "./AuthReducer";
import { CartReducer } from "./CartReducer";

const rootReducer = combineReducers({
  user: AuthReducer,
  addUser: AddUserReducer,
  addCompany: AddCompanyReducer,
  addSpare: AddSpareReducer,
  addAsset: AddAssetReducer,
  addAssetSpare: AddAssetSpareReducer,
  getCompanies: GetCompaniesReducer,
  getClientUsers: GetClientUsersReducer,
  getSpares: GetSparesReducer,
  getCompanyAssets: GetCompanyAssetsReducer,
  getAssetSpares: GetAssetSparesReducer,
  cartDetails: CartReducer,
  getCompanyAssetById: GetCompanyAssetByIdReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
