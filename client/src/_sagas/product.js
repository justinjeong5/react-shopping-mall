import { all, fork, put, call, takeLatest } from 'redux-saga/effects'
import axios from 'axios';

import {
  UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE,
  UPLOAD_PRODUCT_REQUEST, UPLOAD_PRODUCT_SUCCESS, UPLOAD_PRODUCT_FAILURE,
} from './types'

function uploadImageAPI(data) {
  return axios.post('/api/product/uploadImage', data.formData, data.config)
}

function* uploadImage(action) {
  try {
    const result = yield call(uploadImageAPI, action.payload);
    yield put({
      type: UPLOAD_IMAGE_SUCCESS,
      payload: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: UPLOAD_IMAGE_FAILURE,
      error: error.response.data,
    })
  }
}

function uploadProductAPI(data) {
  return axios.post('/api/product/uploadProduct', data)
}

function* uploadProduct(action) {
  try {
    const result = yield call(uploadProductAPI, action.payload);
    yield put({
      type: UPLOAD_PRODUCT_SUCCESS,
      payload: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: UPLOAD_PRODUCT_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchUploadImage() {
  yield takeLatest(UPLOAD_IMAGE_REQUEST, uploadImage)
}

function* watchUploadProduct() {
  yield takeLatest(UPLOAD_PRODUCT_REQUEST, uploadProduct)
}

export default function* productSaga() {
  yield all([
    fork(watchUploadImage),
    fork(watchUploadProduct),
  ])
}