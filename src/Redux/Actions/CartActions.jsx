import * as CartConstants from "../Constants/CartConstants";

export const addCartItem = (item) => {
  return (dispatch) => {
    try {
      dispatch({ type: CartConstants.GET_CART_INFO_REQUEST });

      let cartInfo = JSON.parse(localStorage.getItem("cartInfo"));

      if (cartInfo !== null) {
        let itemFound = false;
        for (let i = 0; i < cartInfo.length; i++) {
          if (cartInfo[i].id === item.id) {
            itemFound = true;
            cartInfo[i].total += item.price;
            cartInfo[i].quantity += item.quantity;
          }
        }
        if (!itemFound) {
          cartInfo.push(item);
        }
        localStorage.setItem("cartInfo", JSON.stringify(cartInfo));
      } else {
        cartInfo = [];
        cartInfo.push(item);
        localStorage.setItem("cartInfo", JSON.stringify(cartInfo));
      }

      dispatch({
        type: CartConstants.ADD_CART_ITEM_SUCCESS,
        payload: cartInfo,
      });
    } catch (error) {
      dispatch({ type: CartConstants.GET_CART_INFO_ERROR, payload: error });
    }
  };
};

export const removeCartItem = (item) => {
  return (dispatch) => {
    try {
      dispatch({ type: CartConstants.GET_CART_INFO_REQUEST });

      let cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
      let index = cartInfo.map((item) => item.id).indexOf(item.id);
      cartInfo.splice(index, 1);
      localStorage.setItem("cartInfo", JSON.stringify(cartInfo));

      dispatch({
        type: CartConstants.REMOVE_CART_ITEM_SUCCESS,
        payload: cartInfo,
      });
    } catch (error) {
      dispatch({ type: CartConstants.GET_CART_INFO_ERROR, payload: error });
    }
  };
};

export const addCartItemQuantity = (item) => {
  return (dispatch) => {
    try {
      dispatch({ type: CartConstants.GET_CART_INFO_REQUEST });

      let cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
      let index = cartInfo.map((item) => item.id).indexOf(item.id);
      cartInfo[index].quantity += 1;
      cartInfo[index].total += item.price;
      localStorage.setItem("cartInfo", JSON.stringify(cartInfo));

      dispatch({
        type: CartConstants.CHANGE_CART_ITEM_QUANTITY_SUCCESS,
        payload: cartInfo,
      });
    } catch (error) {
      dispatch({ type: CartConstants.GET_CART_INFO_ERROR, payload: error });
    }
  };
};
export const subtractCartItemQuantity = (item) => {
  return (dispatch) => {
    try {
      dispatch({ type: CartConstants.GET_CART_INFO_REQUEST });

      let cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
      let index = cartInfo.map((item) => item.id).indexOf(item.id);
      cartInfo[index].quantity -= 1;
      cartInfo[index].total -= item.price;
      if (cartInfo[index].quantity === 0) {
        cartInfo.splice(index, 1);
      }
      localStorage.setItem("cartInfo", JSON.stringify(cartInfo));

      dispatch({
        type: CartConstants.CHANGE_CART_ITEM_QUANTITY_SUCCESS,
        payload: cartInfo,
      });
    } catch (error) {
      dispatch({ type: CartConstants.GET_CART_INFO_ERROR, payload: error });
    }
  };
};
