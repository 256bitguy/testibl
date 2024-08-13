import * as CartConstants from "../Constants/CartConstants";
const { cartInfo } = localStorage;

let initialState = cartInfo
  ? { loading: undefined, cartInfo: JSON.parse(cartInfo), cartError: undefined }
  : { loading: undefined, cartInfo: [], cartError: undefined };

export const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CartConstants.GET_CART_INFO_REQUEST:
      return { loading: true };
    case CartConstants.ADD_CART_ITEM_SUCCESS:
      return { loading: false, cartInfo: action.payload };
    case CartConstants.REMOVE_CART_ITEM_SUCCESS:
      return { loading: false, cartInfo: action.payload };
    case CartConstants.CHANGE_CART_ITEM_QUANTITY_SUCCESS:
      return { loading: false, cartInfo: action.payload };
    case CartConstants.GET_CART_INFO_ERROR:
      return { loading: false, cartError: action.payload };
    default:
      return state;
  }
};
