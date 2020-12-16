import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'

import { Card, Row, Col, Typography, Carousel, Descriptions } from 'antd';
import { CodeSandboxOutlined, LikeOutlined } from '@ant-design/icons'
import { LOAD_PRODUCTS_REQUEST, SET_ALL_FILTERS_INFO_REQUEST } from '../../../_sagas/types'
import LoadingPage from '../LoadingPage/LoadingPage';
import ProductFilter from './Sections/ProductFilter'
const { Title } = Typography;


function LandingPage(props) {

  const dispatch = useDispatch();
  const { logoutUserDone } = useSelector(state => state.user)
  const { productData, loadProductsLoading, noMoreProducts, skip, limit, orderBy, sortBy, filters } = useSelector(state => state.product)

  useEffect(() => {
    if (logoutUserDone) {
      props.history.push('/login');
    }
  }, [logoutUserDone])

  useEffect(() => {
    function onScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (!loadProductsLoading && !noMoreProducts) {
          dispatch({
            type: LOAD_PRODUCTS_REQUEST,
            payload: { skip, limit, orderBy, sortBy, filters },
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [loadProductsLoading, noMoreProducts, skip, limit, orderBy, sortBy, filters]);

  const onFilterChange = (data) => {
    dispatch({
      type: SET_ALL_FILTERS_INFO_REQUEST,
      payload: {
        skip: 0,
        limit: 6,
        orderBy: '',
        sortBy: '',
        filters: {
          sort: data.sort,
          price: data.price,
          word: data.word,
        },
      }
    })
  }


  const renderCards = productData.map(product => {
    return (
      <Col sm={24} md={12} lg={8} key={uuidv4()}>
        <Card
          hoverable={true}
          style={{ width: '100%' }}
        >
          <Carousel autoplay >
            {product?.images?.map((img) => {
              return (
                <div key={uuidv4()}>
                  <img src={`http://localhost:5000/${img.image}`} alt={img.fileName} style={{ width: '100%' }} />
                </div>
              )
            })}
          </Carousel>
          <div style={{ marginTop: 20 }}>
            <a href={`/api/product/${product._id}`} style={{ color: 'black' }}>
              <Card.Meta title={product.title} description={`${product.description.slice(0, 30)}...`} />
              <Descriptions style={{ marginTop: 14 }}>
                <Descriptions.Item label='가격' span={3} >{`${product.price}원`}</Descriptions.Item>
              </Descriptions>
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
        {productData && <ProductFilter onFilterChange={onFilterChange} />}
        <Row gutter={[24, 32]}>
          {loadProductsLoading && <LoadingPage />}
          {productData && renderCards}
        </Row>
      </div>
    </>
  )
}

export default withRouter(LandingPage);
