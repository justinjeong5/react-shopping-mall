import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { PageHeader, Row, Col, Divider } from 'antd';

import { LOAD_PRODUCT_DETAILS_REQUEST } from '../../../_sagas/types'
import LoadingPage from '../LoadingPage/LoadingPage';
import ProductImage from './Sections/ProductImage'
import ProductInfo from './Sections/ProductInfo'
import { ProductClothesSort, ProductAccessorySort } from '../../utils/ProductSort/ProductSort'


function DetailProductPage(props) {

  const dispatch = useDispatch();
  const { currentProduct, loadProductDetailsLoading, loadProductDetailsDone } = useSelector(state => state.product)

  const getIndex = (target) => {
    if (ProductClothesSort.includes(target)) return '의류'
    if (ProductAccessorySort.includes(target)) return '패션 잡화'
  }

  const routes = [
    {
      path: 'index',
      breadcrumbName: getIndex(currentProduct.sort),
    },
    {
      path: 'first',
      breadcrumbName: currentProduct.sort,
    }
  ];

  useEffect(() => {
    dispatch({
      type: LOAD_PRODUCT_DETAILS_REQUEST,
      payload: props.match.params.productId
    })
  }, [])

  return (
    <div>
      {loadProductDetailsLoading && <LoadingPage />}
      {loadProductDetailsDone && <>
        <div style={{ width: '100%', padding: '4rem' }}>
          <PageHeader
            className="site-page-header"
            onBack={() => window.history.back()}
            title={currentProduct.title}
            breadcrumb={{ routes }}
          />
          <Divider />
          <Row gutter={[16, 16]}>
            <Col lg={12} xs={24}>
              <ProductImage />
            </Col>
            <Col lg={12} xs={24}>
              <ProductInfo />
            </Col>
          </Row>
        </div>
      </>}
    </div >
  )
}

export default withRouter(DetailProductPage)
