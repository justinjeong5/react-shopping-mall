import React, { useEffect } from 'react';
import { Menu, Badge } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_USER_REQUEST } from '../../../../_sagas/types';
import { LoginOutlined, LogoutOutlined, UserAddOutlined, UploadOutlined, ShoppingCartOutlined } from '@ant-design/icons'

function RightMenu(props) {
  const { currentUser, logoutUserDone } = useSelector(state => state.user)
  const dispatch = useDispatch();

  useEffect(() => {
    if (logoutUserDone) {
      props.history.push('/');
    }
  }, [logoutUserDone])

  const logoutHandler = () => {
    dispatch({
      type: LOGOUT_USER_REQUEST,
    })
  };

  if (currentUser && currentUser.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="cart">
          <Badge count={currentUser.cart.length} offset={[-20, 0]} size='small'>
            <Link to='/product/cart'><ShoppingCartOutlined /></Link>
          </Badge>
        </Menu.Item>
        <Menu.Item key="upload">
          <Link to='/product/upload'><UploadOutlined /></Link>
        </Menu.Item>
        <Menu.Item key="logout">
          <Link to='/login' onClick={logoutHandler}><LogoutOutlined /></Link>
        </Menu.Item>
      </Menu >
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <Link to="/login"><LoginOutlined /></Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register"><UserAddOutlined /></Link>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);