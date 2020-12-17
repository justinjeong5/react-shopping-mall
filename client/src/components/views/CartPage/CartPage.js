import React from 'react'
import { useSelector } from 'react-redux'
import LoadingPage from '../LoadingPage/LoadingPage';

function CartPage() {
  const { loadCartItemsLoading, loadCartItemsDone } = useSelector(state => state.user);

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      {loadCartItemsLoading && <LoadingPage />}
      {loadCartItemsDone && <>
        {'cart details here'}
      </>}
    </div>
  )
}

export default CartPage
