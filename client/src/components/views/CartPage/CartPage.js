import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Divider, Result, Table, Tag, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons'

import NumberFormat from 'react-number-format'
import { LOAD_CART_ITEMS_REQUEST, REMOVE_CART_ITEM_REQUEST } from '../../../_sagas/types'
import LoadingPage from '../LoadingPage/LoadingPage';
import { ProductAccessorySort, ProductClothesSort } from '../../utils/ProductSort/ProductSort'
import CartDetails from './Sections/CartDetails';

const { Title } = Typography;

function CartPage() {

  const [priceToPay, setPriceToPay] = useState(0)
  const dispatch = useDispatch();
  const { cartData, currentUser, loadCartItemsLoading, loadCartItemsDone, removeCartItemDone } = useSelector(state => state.user);

  useEffect(() => {
    if (currentUser?.cart) {
      const cartItems = currentUser.cart.map(value => value.id)
      dispatch({
        type: LOAD_CART_ITEMS_REQUEST,
        payload: cartItems
      })
    }
  }, [currentUser, removeCartItemDone])

  useEffect(() => {
    if (cartData) {
      setPriceToPay(0);
      cartData.forEach((item) => {
        setPriceToPay(prev => prev + item.totalPrice);
      })
    }
  }, [cartData, loadCartItemsDone])

  return (
    <div style={{ width: '80%', margin: '3rem auto' }}>
      <Title level={3}>장바구니</Title>
      <CartDetails />
      {!<Result status='success' title='구매가 정상적으로 완료되었습니다.' />}
      <Title level={4}> 결제할 금액</Title>
      <NumberFormat value={priceToPay} displayType={'text'} thousandSeparator={true} suffix={'원'} />
    </div>
  )
}

export default CartPage
