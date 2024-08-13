import * as AdminConstants from "../Constants/AdminConstants";

export const AddCompanyReducer = (state = {}, action) => {
  switch (action.type) {
    case AdminConstants.ADD_COMPANY_REQUEST:
      return { ...state, addCompanyLoading: true };
    case AdminConstants.ADD_COMPANY_SUCCESS:
      return {
        ...state,
        addCompanyLoading: false,
        addCompanyResponse: action.payload,
      };
    case AdminConstants.ADD_COMPANY_ERROR:
      return {
        ...state,
        addCompanyLoading: false,
        addCompanyError: action.payload,
      };
    case AdminConstants.ADD_COMPANY_RESET_STATE:
      return {};
    default:
      return state;
  }
};

export const AddUserReducer = (state = {}, action) => {
  switch (action.type) {
    case AdminConstants.ADD_USER_REQUEST:
      return { ...state, addUserLoading: true };
    case AdminConstants.ADD_USER_SUCCESS:
      return {
        ...state,
        addUserLoading: false,
        addUserResponse: action.payload,
      };
    case AdminConstants.ADD_USER_ERROR:
      return { ...state, addUserLoading: false, addUserError: action.payload };
    case AdminConstants.ADD_USER_RESET_STATE:
      return {};
    default:
      return state;
  }
};

export const GetCompaniesReducer = (state = {}, action) => {
  const { getCompaniesResponse } = state;
  var index;
  switch (action.type) {
    case AdminConstants.GET_COMPANIES_REQUEST:
      return { ...state, updateResponse: false, getCompaniesLoading: true };
    case AdminConstants.GET_COMPANIES_SUCCESS:
      return {
        ...state,
        getCompaniesLoading: false,
        updateResponse: false,
        getCompaniesResponse: action.payload,
      };
    case AdminConstants.UPDATE_COMPANY_SUCCESS:
      const updatedCompany = action.payload;
      index = getCompaniesResponse
        .map((company) => company.id)
        .indexOf(updatedCompany.id);

      getCompaniesResponse[index] = updatedCompany;
      return {
        ...state,
        getCompaniesLoading: false,
        updateResponse: true,
        getCompaniesResponse: getCompaniesResponse,
      };
    case AdminConstants.GET_COMPANIES_ERROR:
      return {
        ...state,
        getCompaniesLoading: false,
        updateResponse: false,
        getCompaniesError: action.payload,
      };
    case AdminConstants.GET_COMPANIES_RESET_STATE:
      return { ...state, updateResponse: false };
    default:
      return state;
  }
};

export const GetClientUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case AdminConstants.GET_CLIENT_USERS_REQUEST:
      return { ...state, getClientUsersLoading: true };
    case AdminConstants.GET_CLIENT_USERS_SUCCESS:
      return {
        ...state,
        getClientUsersLoading: false,
        getClientUsersResponse: action.payload,
      };
    case AdminConstants.GET_CLIENT_USERS_ERROR:
      return {
        ...state,
        getClientUsersLoading: false,
        getClientUsersError: action.payload,
      };
    default:
      return state;
  }
};

export const AddSpareReducer = (state = {}, action) => {
  switch (action.type) {
    case AdminConstants.ADD_SPARE_REQUEST:
      return { addSpareLoading: true };
    case AdminConstants.ADD_SPARE_SUCCESS:
      return {
        addSpareLoading: false,
        addSpareResponse: action.payload,
      };
    case AdminConstants.ADD_SPARE_ERROR:
      return {
        addSpareLoading: false,
        addSpareError: action.payload,
      };
    case AdminConstants.ADD_SPARE_RESET_STATE:
      return {};
    default:
      return state;
  }
};

export const AddAssetReducer = (state = {}, action) => {
  switch (action.type) {
    case AdminConstants.ADD_ASSET_REQUEST:
      return { addAssetLoading: true };
    case AdminConstants.ADD_ASSET_SUCCESS:
      return {
        addAssetLoading: false,
        addAssetResponse: action.payload,
      };
    case AdminConstants.ADD_ASSET_ERROR:
      return {
        addAssetLoading: false,
        addAssetError: action.payload,
      };
    case AdminConstants.ADD_ASSET_RESET_STATE:
      return {};
    default:
      return state;
  }
};

export const AddAssetSpareReducer = (state = {}, action) => {
  switch (action.type) {
    case AdminConstants.ADD_ASSET_SPARE_REQUEST:
      return { addAssetSpareLoading: true };
    case AdminConstants.ADD_ASSET_SPARE_SUCCESS:
      return {
        addAssetSpareLoading: false,
        addAssetSpareResponse: action.payload,
      };
    case AdminConstants.ADD_ASSET_SPARE_ERROR:
      return {
        addAssetSpareLoading: false,
        addAssetSpareError: action.payload,
      };
    case AdminConstants.ADD_ASSET_SPARE_RESET_STATE:
      return {};
    default:
      return state;
  }
};

export const GetSparesReducer = (state = {}, action) => {
  const { getSparesResponse } = state;
  var index;
  switch (action.type) {
    case AdminConstants.GET_SPARES_REQUEST:
      return {
        ...state,
        updateResponse: false,
        getSparesLoading: true,
      };
    case AdminConstants.GET_SPARES_SUCCESS:
      return {
        ...state,
        getSparesLoading: false,
        updateResponse: false,
        getSparesResponse: action.payload || getSparesResponse,
      };
    case AdminConstants.GET_SPARE_BY_ID_SUCCESS:
      getSparesResponse.push(action.payload);
      return {
        ...state,
        getSparesLoading: false,
        updateResponse: false,
        getSparesResponse: getSparesResponse,
      };
    case AdminConstants.UPDATE_SPARE_SUCCESS:
      if (getSparesResponse) {
        const updatedSpare = action.payload;
        index = getSparesResponse
          .map((spare) => spare.id)
          .indexOf(updatedSpare.id);
        getSparesResponse[index] = updatedSpare;
      }
      return {
        ...state,
        getSparesLoading: false,
        updateResponse: true,
        getSparesResponse: getSparesResponse,
      };
    case AdminConstants.DELETE_SPARE_SUCCESS:
      if (getSparesResponse) {
        const spareId = action.payload;
        index = getSparesResponse.map((spare) => spare.id).indexOf(spareId);
        getSparesResponse.splice(index, 1);
      }

      return {
        ...state,
        getSparesLoading: false,
        updateResponse: false,
        getSparesResponse: getSparesResponse,
      };
    case AdminConstants.GET_SPARES_ERROR:
      return {
        ...state,
        getSparesLoading: false,
        updateResponse: false,
        getSparesError: action.payload,
      };
    case AdminConstants.GET_SPARES_RESET_STATE:
      return { ...state, updateResponse: false };
    default:
      return state;
  }
};

export const GetCompanyAssetsReducer = (state = {}, action) => {
  const { getCompanyAssetsResponse } = state;
  var index;
  switch (action.type) {
    case AdminConstants.GET_COMPANY_ASSETS_REQUEST:
      return {
        ...state,
        updateResponse: false,
        deleteResponse: false,
        getCompanyAssetsLoading: true,
      };
    case AdminConstants.GET_COMPANY_ASSETS_SUCCESS:
      return {
        ...state,
        getCompanyAssetsLoading: false,
        updateResponse: false,
        deleteResponse: false,
        getCompanyAssetsResponse: action.payload,
      };
    case AdminConstants.UPDATE_COMPANY_ASSET_SUCCESS:
      const updatedAsset = action.payload;
      index = getCompanyAssetsResponse
        .map((asset) => asset.id)
        .indexOf(updatedAsset.id);

      getCompanyAssetsResponse[index] = updatedAsset;

      return {
        ...state,
        getCompanyAssetsLoading: false,
        updateResponse: true,
        deleteResponse: false,
        getCompanyAssetsResponse: getCompanyAssetsResponse,
      };
    case AdminConstants.DELETE_COMPANY_ASSET_SUCCESS:
      return {
        ...state,
        getCompanyAssetsLoading: false,
        updateResponse: false,
        deleteResponse: true,
        getCompanyAssetsResponse: action.payload,
      };
    case AdminConstants.GET_COMPANY_ASSETS_ERROR:
      return {
        ...state,
        getCompanyAssetsLoading: false,
        updateResponse: false,
        deleteResponse: false,
        getCompanyAssetsError: action.payload,
      };
    case AdminConstants.GET_COMPANY_ASSETS_RESET_STATE:
      return { ...state, updateResponse: false, deleteResponse: false };
    default:
      return state;
  }
};

export const GetAssetSparesReducer = (state = {}, action) => {
  switch (action.type) {
    case AdminConstants.GET_ASSET_SPARES_REQUEST:
      return { ...state, getAssetSparesLoading: true };
    case AdminConstants.GET_ASSET_SPARES_SUCCESS:
      return {
        ...state,
        getAssetSparesLoading: false,
        getAssetSparesResponse: action.payload,
      };
    case AdminConstants.GET_ASSET_SPARES_ERROR:
      return {
        ...state,
        getAssetSparesLoading: false,
        getAssetSparesError: action.payload,
      };
    case AdminConstants.DELETE_ASSET_SPARE_SUCCESS:
      return {
        ...state,
        getAssetSparesLoading: false,
        getAssetSparesError: action.payload,
      };
    default:
      return state;
  }
};

export const GetCompanyAssetByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case AdminConstants.GET_COMPANY_ASSET_BY_ID_REQUEST:
      return { ...state, getCompanyAssetByIdLoading: true };
    case AdminConstants.GET_COMPANY_ASSET_BY_ID_SUCCESS:
      return {
        ...state,
        getCompanyAssetByIdLoading: false,
        getCompanyAssetByIdResponse: action.payload,
      };
    case AdminConstants.GET_COMPANY_ASSET_BY_ID_ERROR:
      return {
        ...state,
        getCompanyAssetByIdLoading: false,
        getCompanyAssetByIdError: action.payload,
      };
    default:
      return state;
  }
};
