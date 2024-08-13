import { async } from "@firebase/util";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { v4 as uuidv4 } from "uuid";
import * as AdminConstants from "../Constants/AdminConstants";

export const addCompany = (values) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firebaseAuth = getFirebase();
      const firestoreDB = getFirestore();

      dispatch({ type: AdminConstants.ADD_COMPANY_REQUEST });
      const authResponse = await firebaseAuth
        .auth()
        .createUserWithEmailAndPassword(values.email, uuidv4().slice(3, 13));
      await firestoreDB.collection("companies").doc(authResponse.user.uid).set({
        companyId: authResponse.user.uid,
        name: values.name,
        industory: values.industory,
        size: values.size,
        type: values.type,
        website: values.website,
        email: values.email,
        phoneNumber: values.phoneNumber,
        address: values.address,
        description: values.description,
        users: [],
        createAt: firebase.firestore.Timestamp.now(),
      });
      dispatch({
        type: AdminConstants.ADD_COMPANY_SUCCESS,
        payload: authResponse,
      });
    } catch (error) {
      dispatch({ type: AdminConstants.ADD_COMPANY_ERROR, payload: error.code });
    }
  };
};

export const updateCompany = (values) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestoreDB = getFirestore();

      dispatch({ type: AdminConstants.GET_COMPANIES_REQUEST });

      await firestoreDB.collection("companies").doc(values.companyId).update({
        name: values.name,
        industory: values.industory,
        size: values.size,
        type: values.type,
        website: values.website,
        email: values.email,
        phoneNumber: values.phoneNumber,
        address: values.address,
        description: values.description,
      });

      const updatedCompany = await firestoreDB
        .collection("companies")
        .doc(values.companyId)
        .get();

      dispatch({
        type: AdminConstants.UPDATE_COMPANY_SUCCESS,
        payload: updatedCompany,
      });
    } catch (error) {
      console.log("here ", error);
      dispatch({
        type: AdminConstants.GET_COMPANIES_ERROR,
        payload: error.code,
      });
    }
  };
};

export const createUser = (values) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firebaseAuth = getFirebase();
      const firestoreDB = getFirestore();

      dispatch({ type: AdminConstants.ADD_USER_REQUEST });
      const authResponse = await firebaseAuth
        .auth()
        .createUserWithEmailAndPassword(values.email, uuidv4().slice(3, 13));
      await firestoreDB.collection("users").doc(authResponse.user.uid).set({
        userId: authResponse.user.uid,
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        address: values.address,
        company: values.company,
        designation: values.designation,
        role: values.role,
        createAt: firebase.firestore.Timestamp.now(),
      });
      const company = await firestoreDB
        .collection("companies")
        .where("name", "==", values.company)
        .get();

      if (company) {
        let users = company.docs[0].get("users");
        users.push(authResponse.user.uid);
        await firestoreDB
          .collection("companies")
          .doc(company.docs[0].get("companyId"))
          .update({ users: users });
      }
      dispatch({
        type: AdminConstants.ADD_USER_SUCCESS,
        payload: authResponse,
      });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: AdminConstants.ADD_USER_ERROR, payload: error.code });
    }
  };
};

export const getCompanies = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestoreDB = getFirestore();
      dispatch({ type: AdminConstants.GET_COMPANIES_REQUEST });
      const companies = await firestoreDB.collection("companies").get();
      dispatch({
        type: AdminConstants.GET_COMPANIES_SUCCESS,
        payload: companies.docs,
      });
    } catch (error) {
      dispatch({
        type: AdminConstants.GET_COMPANIES_ERROR,
        payload: error.code,
      });
    }
  };
};

export const getClientUsers = (usersIds) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestoreDB = getFirestore();
      dispatch({ type: AdminConstants.GET_CLIENT_USERS_REQUEST });
      let users = [];
      for (let i = 0; i < usersIds.length; i++) {
        const user = await firestoreDB
          .collection("users")
          .doc(usersIds[i])
          .get();
        users.push(user);
      }

      dispatch({
        type: AdminConstants.GET_CLIENT_USERS_SUCCESS,
        payload: users,
      });
    } catch (error) {
      dispatch({
        type: AdminConstants.GET_CLIENT_USERS_ERROR,
        payload: error.code,
      });
    }
  };
};

export const addSpare = (values) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestoreDB = getFirestore();

      dispatch({ type: AdminConstants.ADD_SPARE_REQUEST });
      let spareId = uuidv4();
      await firestoreDB
        .collection("spares")
        .doc(spareId)
        .set({
          spareId: spareId,
          name: values.name,
          type: values.type,
          price: parseInt(values.price),
          description: values.description,
          image: { name: values.imageName, url: values.imageUrl },
          createAt: firebase.firestore.Timestamp.now(),
        });
      dispatch({
        type: AdminConstants.ADD_SPARE_SUCCESS,
        payload: "spare-added",
      });
    } catch (error) {
      dispatch({ type: AdminConstants.ADD_SPARE_ERROR, payload: error.code });
    }
  };
};

export const addAsset = (values) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestoreDB = getFirestore();

      dispatch({ type: AdminConstants.ADD_ASSET_REQUEST });
      let assetId = uuidv4();
      await firestoreDB.collection("assets").doc(assetId).set({
        assetId: assetId,
        name: values.name,
        type: values.type,
        serviceEngineer: values.serviceEngineer,
        requestedDeliveryDate: values.requestedDeliveryDate,
        promisedDeliveryDate: values.promisedDeliveryDate,
        jobQueuedNumber: values.jobQueuedNumber,
        jobStatus: values.jobStatus,
        images: values.images,
        description: values.description,
        spares: [],
        createAt: firebase.firestore.Timestamp.now(),
        companyId: values.companyId,
      });
      dispatch({
        type: AdminConstants.ADD_ASSET_SUCCESS,
        payload: "asset-added",
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: AdminConstants.ADD_ASSET_ERROR, payload: error.code });
    }
  };
};

export const getSpares = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestoreDB = getFirestore();
      dispatch({ type: AdminConstants.GET_SPARES_REQUEST });
      const spares = await firestoreDB.collection("spares").get();
      dispatch({
        type: AdminConstants.GET_SPARES_SUCCESS,
        payload: spares.docs,
      });
    } catch (error) {
      dispatch({
        type: AdminConstants.GET_SPARES_ERROR,
        payload: error.code,
      });
    }
  };
};

export const getCompanyAssets = (companyId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestoreDB = getFirestore();
      dispatch({ type: AdminConstants.GET_COMPANY_ASSETS_REQUEST });
      const companyAssets = await firestoreDB
        .collection("assets")
        .where("companyId", "==", companyId)
        .get();
      dispatch({
        type: AdminConstants.GET_COMPANY_ASSETS_SUCCESS,
        payload: companyAssets.docs,
      });
    } catch (error) {
      dispatch({
        type: AdminConstants.GET_COMPANY_ASSETS_ERROR,
        payload: error.code,
      });
    }
  };
};

export const getAssetSpares = (assetId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestoreDB = getFirestore();
      dispatch({ type: AdminConstants.GET_ASSET_SPARES_REQUEST });
      const asset = await firestoreDB.collection("assets").doc(assetId).get();
      const assetSpares = asset.get("spares");
      dispatch({
        type: AdminConstants.GET_ASSET_SPARES_SUCCESS,
        payload: assetSpares,
      });
    } catch (error) {
      dispatch({
        type: AdminConstants.GET_ASSET_SPARES_ERROR,
        payload: error.code,
      });
    }
  };
};

export const deleteSpare = (spareId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      dispatch({ type: AdminConstants.GET_SPARES_REQUEST });
      const firestoreDB = getFirestore();
      await firestoreDB.collection("spares").doc(spareId).delete();
      dispatch({
        type: AdminConstants.DELETE_SPARE_SUCCESS,
        payload: spareId,
      });
    } catch (error) {
      console.log("here", error);
      dispatch({
        type: AdminConstants.GET_SPARES_ERROR,
        payload: error.code,
      });
    }
  };
};

export const updateSpare = (spareId, values) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestoreDB = getFirestore();

      dispatch({ type: AdminConstants.GET_SPARES_REQUEST });

      await firestoreDB
        .collection("spares")
        .doc(spareId)
        .update({
          name: values.name,
          type: values.type,
          price: values.price,
          description: values.description,
          image: { name: values.imageName, url: values.imageUrl },
        });
      const updatedSpare = await firestoreDB
        .collection("spares")
        .doc(spareId)
        .get();
      dispatch({
        type: AdminConstants.UPDATE_SPARE_SUCCESS,
        payload: updatedSpare,
      });
    } catch (error) {
      dispatch({ type: AdminConstants.GET_SPARES_ERROR, payload: error.code });
    }
  };
};

export const addAssetSpare = (values) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestoreDB = getFirestore();
      dispatch({ type: AdminConstants.ADD_ASSET_SPARE_REQUEST });

      const asset = await firestoreDB
        .collection("assets")
        .doc(values.assetId)
        .get();
      let spares = asset.get("spares");
      spares.push({
        spareId: values.spareId,
        description: values.description,
      });

      await firestoreDB
        .collection("assets")
        .doc(values.assetId)
        .update({ spares: spares });

      dispatch({
        type: AdminConstants.ADD_ASSET_SPARE_SUCCESS,
        payload: "asset-spare-added",
      });
    } catch (error) {
      dispatch({
        type: AdminConstants.ADD_ASSET_SPARE_ERROR,
        payload: error.code,
      });
    }
  };
};

export const getSpareById = (spareId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestoreDB = getFirestore();
      dispatch({
        type: AdminConstants.GET_SPARES_REQUEST,
      });
      const spare = await firestoreDB.collection("spares").doc(spareId).get();
      dispatch({
        type: AdminConstants.GET_SPARE_BY_ID_SUCCESS,
        payload: spare,
      });
    } catch (error) {
      dispatch({
        type: AdminConstants.GET_SPARES_ERROR,
        payload: error.code,
      });
    }
  };
};

export const updateAsset = (values) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestoreDB = getFirestore();

      dispatch({ type: AdminConstants.GET_COMPANY_ASSETS_REQUEST });

      await firestoreDB.collection("assets").doc(values.assetId).update({
        name: values.name,
        type: values.type,
        serviceEngineer: values.serviceEngineer,
        requestedDeliveryDate: values.requestedDeliveryDate,
        promisedDeliveryDate: values.promisedDeliveryDate,
        jobQueuedNumber: values.jobQueuedNumber,
        jobStatus: values.jobStatus,
        images: values.images,
        description: values.description,
      });
      const updatedAsset = await firestoreDB
        .collection("assets")
        .doc(values.assetId)
        .get();

      dispatch({
        type: AdminConstants.UPDATE_COMPANY_ASSET_SUCCESS,
        payload: updatedAsset,
      });
    } catch (error) {
      dispatch({
        type: AdminConstants.GET_COMPANY_ASSETS_ERROR,
        payload: error.code,
      });
    }
  };
};

export const deleteAssetSpare = (assetId, spareId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestoreDB = getFirestore();
      dispatch({ type: AdminConstants.GET_ASSET_SPARES_REQUEST });
      let assetSpares = getState().getAssetSpares.getAssetSparesResponse;

      let index = assetSpares.map((e) => e.spareId).indexOf(spareId);
      assetSpares.splice(index, 1);
      await firestoreDB.collection("assets").doc(assetId).update({
        spares: assetSpares,
      });
      dispatch({
        type: AdminConstants.DELETE_ASSET_SPARE_SUCCESS,
        payload: assetSpares,
      });
    } catch (error) {
      dispatch({
        type: AdminConstants.GET_ASSET_SPARES_ERROR,
        payload: error.code,
      });
    }
  };
};

export const getCompanyAssetById = (assetId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestoreDB = getFirestore();
      dispatch({
        type: AdminConstants.GET_COMPANY_ASSET_BY_ID_REQUEST,
      });
      const asset = await firestoreDB.collection("assets").doc(assetId).get();
      dispatch({
        type: AdminConstants.GET_COMPANY_ASSET_BY_ID_SUCCESS,
        payload: asset,
      });
    } catch (error) {
      dispatch({
        type: AdminConstants.GET_COMPANY_ASSET_BY_ID_ERROR,
        payload: error.code,
      });
    }
  };
};

export const deleteAsset = (assetId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestoreDB = getFirestore();
      dispatch({ type: AdminConstants.GET_COMPANY_ASSETS_REQUEST });
      let assets = getState().getCompanyAssets.getCompanyAssetsResponse;
      let index = assets.map((e) => e.id).indexOf(assetId);
      assets.splice(index, 1);
      await firestoreDB.collection("assets").doc(assetId).delete();
      dispatch({
        type: AdminConstants.DELETE_COMPANY_ASSET_SUCCESS,
        payload: assets,
      });
    } catch (error) {
      dispatch({
        type: AdminConstants.GET_COMPANY_ASSETS_ERROR,
        payload: error.code,
      });
    }
  };
};
