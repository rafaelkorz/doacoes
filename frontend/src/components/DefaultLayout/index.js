import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { LogoutOutlined, UserOutlined, CheckOutlined, DollarOutlined } from '@ant-design/icons';
import "./style.css";

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('user'))


  function handleMenuClick(e) {
    if (e.key === "1") {    
      window.location.href='/'
    }
    if (e.key === "2") {    
      window.location.href='/listdonations'
    }
    if (e.key === "3") {    
      window.location.href='/admin'
    }
    if (e.key === "4") {
      localStorage.removeItem('user');
      window.location.href='/login'
    }    
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<DollarOutlined />}>
        Doar
      </Menu.Item>
      <Menu.Item key="2" icon={<CheckOutlined />}>
        Minhas doações
      </Menu.Item>
      {user.adm ?
        <Menu.Item key="3" icon={<UserOutlined />}>
          Admin
        </Menu.Item> : <></>
      }
      <Menu.Item key="4" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className="header">
        <div style={{ display: 'flex', 
                      justifyContent: 'space-between', 
                      paddingTop: 18, 
                      paddingLeft: 200, 
                      paddingRight: 200}}
        >
          <h1 style={{ fontweight: 700}}>DOE, faça sua parte!</h1>
          <Dropdown overlay={menu} placement="bottomCenter">
            <Button><UserOutlined />Usuário: {user.username}</Button>
          </Dropdown>  
        </div>
      </div> 
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
