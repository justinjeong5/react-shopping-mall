import React from 'react'
import { useDispatch } from 'react-redux'
import Dropzone from 'react-dropzone'
import { PlusSquareOutlined } from '@ant-design/icons'
import { UPLOAD_IMAGE_REQUEST } from '../../../../_sagas/types'

function FileUploader() {

  const dispatch = useDispatch();

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

      </div>

    </div>
  )
}

export default FileUploader
