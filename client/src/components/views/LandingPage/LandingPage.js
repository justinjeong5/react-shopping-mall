import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'

import { Card, Row, Col, Typography, Carousel } from 'antd';
import { CodeSandboxOutlined } from '@ant-design/icons'
import { LOAD_PRODUCTS_REQUEST } from '../../../_sagas/types'
import LoadingPage from '../LoadingPage/LoadingPage';
const { Title } = Typography;


function LandingPage(props) {

  const dispatch = useDispatch();
  const { logoutUserDone } = useSelector(state => state.user)
  const { productData, loadProductsLoading } = useSelector(state => state.product)

  useEffect(() => {
    if (logoutUserDone) {
      props.history.push('/login');
    }
  }, [logoutUserDone])

  useEffect(() => {
    dispatch({
      type: LOAD_PRODUCTS_REQUEST,
    })
  }, [])

  const renderCards = productData.map(product => {
    return (
      <Col sm={24} md={12} lg={8} key={uuidv4()}>
        <Card
          hoverable={true}
          style={{ width: '100%' }}
        >
          <Carousel autoplay style={{ marginBottom: 20 }}>
            {product?.images?.map((img) => {
              return (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img src={`http://localhost:5000/${img.image}`} style={{ width: '100%' }} />
                </div>
              )
            })}
          </Carousel>
          <div>
            <a href={`/api/product/${product._id}`}>
              <Card.Meta title={product.title} description={`${product.description.slice(0, 200)}...`} />
            </a>
          </div>
        </Card>
      </Col>
    )
  })

  return (
    <>
      <div style={{ width: '75%', margin: '3rem auto' }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={2}> Jaymall에 오신것을 환영합니다. <CodeSandboxOutlined /></Title>
        </div>
        {loadProductsLoading && <LoadingPage />}
        <Row gutter={[24, 32]}>
          {productData && renderCards}
        </Row>
      </div>
    </>
  )
}

export default withRouter(LandingPage);
