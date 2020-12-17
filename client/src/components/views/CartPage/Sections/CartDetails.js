import React from 'react'
import { Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons'
import NumberFormat from 'react-number-format'

import { REMOVE_CART_ITEM_REQUEST } from '../../../../_sagas/types'
import LoadingPage from '../../LoadingPage/LoadingPage';
import { ProductAccessorySort, ProductClothesSort } from '../../../utils/ProductSort/ProductSort'

function CartDetails() {

  const dispatch = useDispatch();
  const { cartData, loadCartItemsLoading } = useSelector(state => state.user);



  const handleRemoveItem = (productId) => () => {
    dispatch({
      type: REMOVE_CART_ITEM_REQUEST,
      payload: {
        productId
      }
    })
  }

  const getTagColor = (tag) => {
    if (ProductAccessorySort.includes(tag)) {
      return 'geekblue'
    }
    if (ProductClothesSort.includes(tag)) {
      return 'green'
    }
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
      render: quantity => `${quantity}개`,
    },
    {
      title: '단가',
      dataIndex: 'price',
      key: 'price',
      render: price => <NumberFormat value={price} displayType={'text'} thousandSeparator={true} suffix={'원'} />,
    },
    {
      title: '가격',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: price => <NumberFormat value={price} displayType={'text'} thousandSeparator={true} suffix={'원'} />,
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => tags.map(tag => (
        <Tag color={getTagColor(tag)} key={tag}>{tag}</Tag>
      )),
    },
    {
      title: '장바구니',
      key: 'cart',
      render: (item) => {
        return <div onClick={handleRemoveItem(item.key)}><CloseOutlined /></div>;
      },
    },
  ];


  return (
    <>
      {< Table
        columns={columns}
        dataSource={cartData}
        onHeaderRow={() => ({ align: 'center' })
        }
        onRow={() => ({ align: 'center' })}
        pagination={{ defaultPageSize: 3 }}
        tableLayout='auto'
        loading={loadCartItemsLoading && <LoadingPage />}
      />}
    </>
  )
}

export default CartDetails
