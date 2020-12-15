import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { Form, Input, InputNumber, Button, Typography, Select, message } from 'antd';
import FileUploader from './Sections/FileUploader'
import { useDispatch, useSelector } from 'react-redux';
import { RESET_UPLOAD_IMAGE, UPLOAD_PRODUCT_REQUEST } from '../../../_sagas/types'
import { ProductClothesSort, ProductAccessorySort } from '../../utils/ProductSort/ProductSort'

const { Title } = Typography;
const { Option, OptGroup } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

function UploadProductPage(props) {

  const { currentUser } = useSelector(state => state.user)
  const { fileData, uploadProductDone, uploadProductLoading } = useSelector(state => state.product)
  const dispatch = useDispatch();

  useEffect(() => {
    if (uploadProductDone) {
      message.success({ content: '상품이 정상적으로 등록되었습니다.', duration: 2 });

      setTimeout(() => {
        dispatch({
          type: RESET_UPLOAD_IMAGE,
        })
        props.history.push('/')
      }, 2000)
    }
  }, [uploadProductDone])

  const onFinish = (values) => {
    const payload = {
      writer: currentUser._id,
      ...values,
      images: fileData
    }
    dispatch({
      type: UPLOAD_PRODUCT_REQUEST,
      payload
    })
  };

  return (
    <div style={{ maxWidth: 700, margin: '3rem auto' }}>
      <div style={{ alignItems: 'center', marginBottom: '2rem' }}>
        <Title level={2} style={{ textAlign: 'center' }} >Jaymall 상품 등록</Title>
        <FileUploader />
        <br />

        <Form {...layout} name="nest-messages" onFinish={onFinish} style={{ maxWidth: 600 }} >
          <Form.Item
            name='title'
            label="상품명"
            rules={[
              { required: true, message: '상품명을 입력해주세요.' },
            ]}
          >
            <Input placeholder='상품명' />
          </Form.Item>

          <Form.Item
            name='description'
            label="상품 설명"
            rules={[
              { required: true, message: '상품 설명을 입력해주세요.' },
              { min: 10, message: '상품 설명은 10자 이상으로 입력해주세요.' },
            ]}
          >
            <Input.TextArea style={{ minHeight: 150 }} placeholder='상품 설명' />
          </Form.Item>

          <Form.Item
            name='price'
            label="가격"
            rules={[
              { required: true, message: '상품 가격을 입력해주세요.' },
              { type: 'number', min: 1, message: '가격은 0원 보다 높아야합니다.' },
            ]}
          >
            <InputNumber placeholder='가격' />
          </Form.Item>

          <Form.Item
            name='sort'
            label="종류"
            rules={[
              { required: true, message: '상품 종류를 선택해주세요.' },
            ]}
          >
            <Select placeholder='상품 종류' >
              <OptGroup label="의류">
                {ProductClothesSort.map((value) => {
                  return (
                    <Option key={uuidv4()} value={value}>{value}</Option>
                  )
                })}
              </OptGroup>
              <OptGroup label="잡화">
                {ProductAccessorySort.map((value) => {
                  return (
                    <Option key={uuidv4()} value={value}>{value}</Option>
                  )
                })}
              </OptGroup>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" disabled={uploadProductLoading}>
              상품 등록
          </Button>
          </Form.Item>
        </Form>
      </div>
    </div >
  )
}

export default withRouter(UploadProductPage)
