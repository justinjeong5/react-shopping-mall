import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'

import { Row, Typography } from 'antd';
import { CodeSandboxOutlined } from '@ant-design/icons'
import { LOAD_PRODUCTS_REQUEST, SET_ALL_FILTERS_INFO_REQUEST } from '../../../_sagas/types'
import LoadingPage from '../LoadingPage/LoadingPage';
import ProductFilter from './Sections/ProductFilter'
import ProductCard from './Sections/ProductCard'
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

  return (
    <>
      <div style={{ width: '75%', margin: '3rem auto' }}>
        <div style={{ textAlign: 'center', marginTop: 100, marginBottom: 100 }}>
          <Title level={2}> Jaymall에 오신것을 환영합니다. <CodeSandboxOutlined /></Title>
        </div>
        {productData && <ProductFilter onFilterChange={onFilterChange} />}
        <Row gutter={[24, 32]}>
          {loadProductsLoading && <LoadingPage />}
          {productData?.map(product => (
            <ProductCard key={uuidv4()} product={product} />
          ))}
        </Row>
      </div>
    </>
  )
}

export default withRouter(LandingPage);
