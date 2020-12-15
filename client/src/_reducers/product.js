import {
  UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE,
  RESET_UPLOAD_IMAGE,
} from '../_sagas/types'

const initialState = {
  uploadImageLoading: false,
  uploadImageDone: false,
  uploadImageError: null,

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
    // case RESET_UPLOAD_IMAGE:
    //   return {
    //     ...state,
    //     uploadImageLoading: false,
    //     uploadImageDone: false,
    //     uploadImageError: null,
    //     fileData: null,
    //   }
    default:
      return {
        ...state
      }
  }
}

export default product;