import React from "react";
import { Button, Card, Form, Input } from "antd";
import {useDispatch , useSelector} from 'react-redux'
import { userRegister } from "../redux/actions/userActions";
import Spinner from '../components/Spinner';
import { useHistory } from 'react-router-dom';

function Register() {
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.alertsReducer)
  const history = useHistory();

  function onFinish(values) {
    dispatch(userRegister(values))
  }

  return (
    <div style={{ height: '100%', display: 'flex',alignItems: 'center', justifyContent: 'space-around' }}>
      <Card style={{ width: 500,  borderRadius: '8px'}} bordered={false}>
        {loading && (<Spinner />)}                
        <Form layout='vertical' onFinish={onFinish}>
          <h3>Dados pessoais</h3>
          <hr style={{ marginBottom: 10}}/>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true }]}
          >
            <Input type="email"/>
          </Form.Item>
          <Form.Item
            name="cpf"
            label="CPF"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Telefone"              
          >
            <Input />
          </Form.Item>
          <h3>Login</h3>
          <hr style={{ marginBottom: 10}}/>
          <Form.Item
            name="username"
            label="User"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input type="password"/>
          </Form.Item>
          <Button 
              htmlType="submit"
              loading={loading ? true : false}
              type="primary"
              style={{ marginBottom: 15}}>
              Register
          </Button>
          <Button 
            onClick={() => history.push("/login")}
            type="primary"
            style={{ marginBottom: 15, marginLeft: 10, width: 80 }}>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Register;
