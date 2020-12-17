import {
  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
  REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE,
  LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE,
  AUTHENTICATE_USER_REQUEST, AUTHENTICATE_USER_SUCCESS, AUTHENTICATE_USER_FAILURE,
  ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE,
  LOAD_CART_ITEMS_REQUEST, LOAD_CART_ITEMS_SUCCESS, LOAD_CART_ITEMS_FAILURE,
  REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, REMOVE_CART_ITEM_FAILURE,
} from '../_sagas/types'

const initialState = {
  loginUserLoading: false,
  loginUserDone: false,
  loginUserError: null,
  registerUserLoading: false,
  registerUserDone: false,
  registerUserError: null,
  logoutUserLoading: false,
  logoutUserDone: false,
  logoutUserError: null,
  authenticateUserLoading: false,
  authenticateUserDone: false,
  authenticateUserError: null,
  addToCartLoading: false,
  addToCartDone: false,
  addToCartError: null,
  loadCartItemsLoading: false,
  loadCartItemsDone: false,
  loadCartItemsError: null,
  removeCartItemLoading: false,
  removeCartItemDone: false,
  removeCartItemError: null,

  currentUser: null,
  cartData: null,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loginUserLoading: true,
        loginUserDone: false,
        loginUserError: null,
      }
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loginUserLoading: false,
        loginUserDone: true,
        currentUser: action.payload,
        logoutUserDone: false,
      }
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loginUserLoading: false,
        loginUserError: action.error
      }
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        registerUserLoading: true,
        registerUserDone: false,
        registerUserError: null,
        currentUser: null,
        loginUserDone: false,
        logoutUserDone: false,
        loginUserError: null,
      }
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        registerUserLoading: false,
        registerUserDone: true,
      }
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        registerUserError: action.error
      }
    case LOGOUT_USER_REQUEST:
      return {
        ...state,
        logoutUserLoading: true,
        logoutUserDone: false,
        logoutUserError: null,
      }
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        logoutUserLoading: false,
        logoutUserDone: true,
        currentUser: null,
        loginUserDone: false,
      }
    case LOGOUT_USER_FAILURE:
      return {
        ...state,
        logoutUserError: action.error
      }
    case AUTHENTICATE_USER_REQUEST:
      return {
        ...state,
        authenticateUserLoading: true,
        authenticateUserDone: false,
        authenticateUserError: null,
      }
    case AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        authenticateUserLoading: false,
        authenticateUserDone: true,
        currentUser: action.payload,
      }
    case AUTHENTICATE_USER_FAILURE:
      return {
        ...state,
        authenticateUserError: action.error
      }
    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        addToCartLoading: true,
        addToCartDone: false,
        addToCartError: null,
      }
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        addToCartLoading: false,
        addToCartDone: true,
        currentUser: {
          ...state.currentUser,
          cart: action.payload.cart,
        }
      }
    case ADD_TO_CART_FAILURE:
      return {
        ...state,
        addToCartLoading: false,
        addToCartError: action.error
      }
    case LOAD_CART_ITEMS_REQUEST:
      return {
        ...state,
        loadCartItemsLoading: true,
        loadCartItemsDone: false,
        loadCartItemsError: null,
      }
    case LOAD_CART_ITEMS_SUCCESS:
      const data = action.payload.productDetails.map((item, index) => {
        return {
          key: item._id,
          title: item.title,
          price: item.price,
          quantity: state.currentUser.cart[index].quantity,
          totalPrice: state.currentUser.cart[index].quantity * item.price,
          image: item.images[0].image,
          tags: [item.sort],
        }
      })
      return {
        ...state,
        loadCartItemsLoading: false,
        loadCartItemsDone: true,
        removeCartItemLoading: false,
        removeCartItemDone: false,

        cartData: data,
      }
    case LOAD_CART_ITEMS_FAILURE:
      return {
        ...state,
        loadCartItemsLoading: false,
        loadCartItemsError: action.error
      }
    case REMOVE_CART_ITEM_REQUEST:
      return {
        ...state,
        removeCartItemLoading: true,
        removeCartItemDone: false,
        removeCartItemError: null,
      }
    case REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        removeCartItemLoading: false,
        removeCartItemDone: true,
        currentUser: {
          ...state.currentUser,
          cart: action.payload.cart
        }
      }
    case REMOVE_CART_ITEM_FAILURE:
      return {
        ...state,
        removeCartItemLoading: false,
        removeCartItemError: action.error
      }
    default:
      return {
        ...state
      }
  }
}

export default user;