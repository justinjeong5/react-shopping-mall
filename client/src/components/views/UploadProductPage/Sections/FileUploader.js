import React from 'react'
import Dropzone from 'react-dropzone'
import { PlusSquareOutlined } from '@ant-design/icons'

function FileUploader() {

  const handleOnDrop = () => {

  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone
        onDrop={handleOnDrop}
        multiple
        maxSize
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
