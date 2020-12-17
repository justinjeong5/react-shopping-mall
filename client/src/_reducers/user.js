import {
  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
  REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE,
  LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE,
  AUTHENTICATE_USER_REQUEST, AUTHENTICATE_USER_SUCCESS, AUTHENTICATE_USER_FAILURE,
  ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE,
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

  currentUser: null,
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
        currentUser: action.payload.user,
      }
    case ADD_TO_CART_FAILURE:
      return {
        ...state,
        addToCartLoading: false,
        addToCartError: action.error
      }
    default:
      return {
        ...state
      }
  }
}

export default user;