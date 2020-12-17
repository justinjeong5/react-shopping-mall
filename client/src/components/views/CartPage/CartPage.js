import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Tag } from 'antd';
import { CloseOutlined } from '@ant-design/icons'

import NumberFormat from 'react-number-format'
import { LOAD_CART_ITEMS_REQUEST } from '../../../_sagas/types'
import LoadingPage from '../LoadingPage/LoadingPage';

function CartPage() {

  const dispatch = useDispatch();
  const { cartData, currentUser, loadCartItemsLoading } = useSelector(state => state.user);

  useEffect(() => {
    if (currentUser) {
      const cartItems = currentUser.cart.map(value => value.id)
      dispatch({
        type: LOAD_CART_ITEMS_REQUEST,
        payload: cartItems
      })
    }
  }, [currentUser])

  const handleRemoveItem = (id) => () => {
    console.log(id, 'id for removeItem')
  }

  const columns = [
    {
      title: '',
      dataIndex: 'image',
      key: 'image',
      render: image => <img height={150} src={`http://localhost:5000/${image}`} alt='product-image' />,
    },
    {
      title: '상품명',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '개수',
      dataIndex: 'quantity',
      key: 'quantity',
      render: quantity => `${quantity}개`
    },
    {
      title: '단가',
      dataIndex: 'price',
      key: 'price',
      render: price => <NumberFormat value={price} displayType={'text'} thousandSeparator={true} suffix={'원'} />
    },
    {
      title: '가격',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: price => <NumberFormat value={price} displayType={'text'} thousandSeparator={true} suffix={'원'} />
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '장바구니',
      key: 'action',
      render: (item) => {
        return <div onClick={handleRemoveItem(item.key)}><CloseOutlined /></div>;
      },
    },
  ];

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      {<Table
        columns={columns}
        dataSource={cartData}
        onHeaderRow={() => ({ align: 'center' })}
        onRow={() => ({ align: 'center' })}
        pagination={{ defaultPageSize: 3 }}
        tableLayout='auto'
        loading={loadCartItemsLoading && <LoadingPage />}
      />}
    </div>
  )
}

export default CartPage
