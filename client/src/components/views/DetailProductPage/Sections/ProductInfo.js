import React from 'react'
import { Button, Descriptions, Tabs, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import { ADD_TO_CART_REQUEST } from '../../../../_sagas/types'

const { TabPane } = Tabs;

function ProductInfo() {

  const dispatch = useDispatch();
  const { currentProduct } = useSelector(state => state.product)

  const handleAddToCart = () => {
    dispatch({
      type: ADD_TO_CART_REQUEST,
      payload: { productId: currentProduct._id }
    })
  }

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="상품 정보" key="1">
          <Descriptions >
            <Descriptions.Item label="가격" span={3}>
              <NumberFormat value={currentProduct.price} displayType={'text'} thousandSeparator={true} suffix={'원'} />
            </Descriptions.Item>
            <Descriptions.Item label="조회수" span={3}>{currentProduct.views}</Descriptions.Item>
            <Descriptions.Item label="누적판매" span={3}>{currentProduct.sold}</Descriptions.Item>
            <Descriptions.Item >&nbsp;&nbsp;{currentProduct.description}</Descriptions.Item>
          </Descriptions>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
            <Button
              size='large'
              shape='round'
              type='danger'
              onClick={handleAddToCart}
            >장바구니에 담기</Button>
          </div>
        </TabPane>

        <TabPane tab="구매 후기" key="2">
          구매 후기
        </TabPane>
        <TabPane tab="상품 문의" key="3">
          상품 후기
        </TabPane>
      </Tabs>

    </div>
  )
}

export default ProductInfo
