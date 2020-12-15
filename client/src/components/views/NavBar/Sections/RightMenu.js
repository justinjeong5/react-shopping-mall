import React, { useEffect } from 'react';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_USER_REQUEST } from '../../../../_sagas/types';
import { LoginOutlined, LogoutOutlined, UserAddOutlined, UploadOutlined } from '@ant-design/icons'

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
        <Menu.Item key="upload">
          <Link to='/product/upload'><UploadOutlined /></Link>
        </Menu.Item>
        <Menu.Item key="logout">
          <span onClick={logoutHandler}><LogoutOutlined /></span>
        </Menu.Item>
      </Menu>
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