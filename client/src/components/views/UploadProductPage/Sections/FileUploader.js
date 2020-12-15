import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Dropzone from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid'
import { PlusSquareOutlined } from '@ant-design/icons'
import { UPLOAD_IMAGE_REQUEST, REMOVE_UPLOADED_IMAGE } from '../../../../_sagas/types'
import LoadingPage from '../../LoadingPage/LoadingPage'

function FileUploader() {

  const dispatch = useDispatch();
  const { fileData, uploadImageLoading, uploadImageDone } = useSelector(state => state.product)

  const handleOnDrop = (files) => {
    const formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' }
    }
    formData.append('file', files[0])
    dispatch({
      type: UPLOAD_IMAGE_REQUEST,
      payload: {
        formData,
        config
      }
    })
  }

  const handleRemove = (index) => () => {
    dispatch({
      type: REMOVE_UPLOADED_IMAGE,
      payload: index
    })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone
        onDrop={handleOnDrop}
        multiple={false}
        maxSize={10 * 1024 * 1024}
      >
        {({ getRootProps, getInputProps }) => {
          return (
            <div
              style={{
                width: 300, height: 240, border: '1px solid lightgray',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <PlusSquareOutlined style={{ fontSize: '3rem' }} />
            </div>
          )
        }}
      </Dropzone>
      <div style={{ display: 'flex', width: 350, height: 240, overflowX: 'scroll' }}>
        {uploadImageLoading && <LoadingPage />}
        {uploadImageDone && fileData.map((file, index) => {
          return (
            <div onClick={handleRemove(index)} key={uuidv4()}>
              <img src={`http://localhost:5000/${file.image}`} alt={file.fileName} style={{ height: 240, marginRight: 10 }} />
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default FileUploader
