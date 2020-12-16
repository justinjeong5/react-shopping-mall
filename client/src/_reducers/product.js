import {
  UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE,
  RESET_UPLOAD_IMAGE, REMOVE_UPLOADED_IMAGE,
  UPLOAD_PRODUCT_REQUEST, UPLOAD_PRODUCT_SUCCESS, UPLOAD_PRODUCT_FAILURE,
  LOAD_PRODUCTS_REQUEST, LOAD_PRODUCTS_SUCCESS, LOAD_PRODUCTS_FAILURE,
  RESET_PRODUCTS,
  SET_ALL_FILTERS_INFO_REQUEST,
  LOAD_PRODUCT_DETAILS_REQUEST, LOAD_PRODUCT_DETAILS_SUCCESS, LOAD_PRODUCT_DETAILS_FAILURE,
} from '../_sagas/types'

const initialState = {
  uploadImageLoading: false,
  uploadImageDone: false,
  uploadImageError: null,
  uploadProductLoading: false,
  uploadProductDone: false,
  uploadProductError: null,
  loadProductsLoading: false,
  loadProductsDone: false,
  loadProductsError: null,
  noMoreProducts: false,
  loadProductDetailsLoading: false,
  loadProductDetailsDone: false,
  loadProductDetailsError: null,

  skip: 0,
  limit: 6,
  orderBy: '',
  sortBy: '',
  filters: {},
  // productData: makeFakeProductData,
  productData: [],
  fileData: [],
  currentProduct: {},
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
        uploadProductLoading: false,
        uploadProductDone: false,
        uploadProductError: null,
        fileData: [],
      }
    case LOAD_PRODUCTS_REQUEST:
      return {
        ...state,
        loadProductsLoading: true,
        loadProductsDone: false,
        loadProductsError: null,
      }
    case LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        loadProductsLoading: false,
        loadProductsDone: true,
        productData: [...state.productData, ...action.payload.products],
        noMoreProducts: action.noMoreProducts,
        skip: state.limit + state.skip,
      }
    case LOAD_PRODUCTS_FAILURE:
      return {
        ...state,
        loadProductsLoading: false,
        loadProductsError: action.error
      }
    case RESET_PRODUCTS:
      return {
        ...state,
        productData: [],
        noMoreProducts: false,
      }
    case SET_ALL_FILTERS_INFO_REQUEST:
      return {
        ...state,
        productData: [],
        skip: action.payload.skip,
        limit: action.payload.limit,
        orderBy: action.payload.orderBy,
        sortBy: action.payload.sortBy,
        filters: action.payload.filters,
      }
    case LOAD_PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loadProductDetailsLoading: true,
        loadProductDetailsDone: false,
        loadProductDetailsError: null,
      }
    case LOAD_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loadProductDetailsLoading: false,
        loadProductDetailsDone: true,
        currentProduct: action.payload.productDetails,
      }
    case LOAD_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        loadProductDetailsLoading: false,
        loadProductDetailsError: action.error
      }
    default:
      return {
        ...state
      }
  }
}

export default product;