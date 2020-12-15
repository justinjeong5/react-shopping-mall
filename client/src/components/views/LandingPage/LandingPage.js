import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'

import { Card, Row, Col, Typography, Carousel } from 'antd';
import { CodeSandboxOutlined } from '@ant-design/icons'
import { LOAD_PRODUCTS_REQUEST } from '../../../_sagas/types'
import LoadingPage from '../LoadingPage/LoadingPage';
import ProductFilter from './Sections/ProductFilter'
const { Title } = Typography;


function LandingPage(props) {

  const dispatch = useDispatch();
  const { logoutUserDone } = useSelector(state => state.user)
  const { productData, loadProductsLoading, noMoreProducts } = useSelector(state => state.product)

  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(6)
  const [orderBy, setOrderBy] = useState('')
  const [sortBy, setSortBy] = useState('')

  useEffect(() => {
    if (logoutUserDone) {
      props.history.push('/login');
    }
  }, [logoutUserDone])

  useEffect(() => {
    dispatch({
      type: LOAD_PRODUCTS_REQUEST,
      payload: {
        skip,
        limit,
        orderBy,
        sortBy,
      },
    })
    setSkip(skip + limit);
  }, [])

  useEffect(() => {
    function onScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (!loadProductsLoading && !noMoreProducts) {
          dispatch({
            type: LOAD_PRODUCTS_REQUEST,
            payload: {
              skip,
              limit,
              orderBy,
              sortBy,
            },
          });
          setSkip(skip + limit);
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [loadProductsLoading, noMoreProducts]);

  const onFilterChange = (payload) => {
    console.log(payload, 'payload')
  }


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
                <div key={uuidv4()}>
                  <img src={`http://localhost:5000/${img.image}`} alt={img.fileName} style={{ width: '100%' }} />
                </div>
              )
            })}
          </Carousel>
          <div>
            <a href={`/api/product/${product._id}`}>
              <Card.Meta title={product.title} description={`${product.description.slice(0, 100)}...`} />
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

        {productData && <ProductFilter onFilterChange={onFilterChange} />}
        <Row gutter={[24, 32]}>
          {productData && renderCards}
        </Row>
      </div>
    </>
  )
}

export default withRouter(LandingPage);
