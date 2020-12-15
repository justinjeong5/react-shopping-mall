import {
  UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE,
  RESET_UPLOAD_IMAGE, REMOVE_UPLOADED_IMAGE,
  UPLOAD_PRODUCT_REQUEST, UPLOAD_PRODUCT_SUCCESS, UPLOAD_PRODUCT_FAILURE,
} from '../_sagas/types'

const initialState = {
  uploadImageLoading: false,
  uploadImageDone: false,
  uploadImageError: null,
  uploadProductLoading: false,
  uploadProductDone: false,
  uploadProductError: null,

  fileData: [],
}

const product = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return {
        ...state,
        uploadImageLoading: true,
        uploadImageDone: false,
        uploadImageError: null,
      }
    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        uploadImageLoading: false,
        uploadImageDone: true,
        fileData: [...state.fileData, action.payload.image],
      }
    case UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        uploadImageLoading: false,
        uploadImageError: action.error
      }
    case REMOVE_UPLOADED_IMAGE:
      return {
        ...state,
        fileData: state.fileData.filter((v, i) => {
          return i !== action.payload
        })
      }
    case UPLOAD_PRODUCT_REQUEST:
      return {
        ...state,
        uploadProductLoading: true,
        uploadProductDone: false,
        uploadProductError: null,
      }
    case UPLOAD_PRODUCT_SUCCESS:
      return {
        ...state,
        uploadProductLoading: false,
        uploadProductDone: true,
      }
    case UPLOAD_PRODUCT_FAILURE:
      return {
        ...state,
        uploadProductLoading: false,
        uploadProductError: action.error
      }
    case RESET_UPLOAD_IMAGE:
      return {
        ...state,
        uploadImageLoading: false,
        uploadImageDone: false,
        uploadImageError: null,
        fileData: [],
      }
    default:
      return {
        ...state
      }
  }
}

export default product;