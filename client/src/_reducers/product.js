import {
  UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE,
  RESET_UPLOAD_IMAGE, REMOVE_UPLOADED_IMAGE,
  UPLOAD_PRODUCT_REQUEST, UPLOAD_PRODUCT_SUCCESS, UPLOAD_PRODUCT_FAILURE,
  LOAD_PRODUCTS_REQUEST, LOAD_PRODUCTS_SUCCESS, LOAD_PRODUCTS_FAILURE,
} from '../_sagas/types'

import faker from 'faker'
faker.locale = 'ko'
const makeFakeProductData = Array.from(Array(20)).map((value) => {
  return (
    {
      writer: '5fd84653d9e3e96b80a69e46',
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      image: [
        faker.image.image(),
        faker.image.nightlife(),
        faker.image.fashion(),
        faker.image.nature()
      ],
      price: parseInt(Math.random() * 100000),
      sort: ['outter', 'skirts', 'shirts', 'suits', 'bag', 'watch', 'shoes'][parseInt(Math.random() * 6)],
      sold: parseInt(Math.random() * 100),
      views: parseInt(Math.random() * 1000),
    }
  )
})

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

  // productData: makeFakeProductData,
  productData: [],
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
        productData: action.payload.products
      }
    case LOAD_PRODUCTS_FAILURE:
      return {
        ...state,
        loadProductsLoading: false,
        loadProductsError: action.error
      }
    default:
      return {
        ...state
      }
  }
}

export default product;