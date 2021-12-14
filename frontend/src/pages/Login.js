import React from 'react'
import {Button, Form , Input, Card} from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch , useSelector} from 'react-redux'
import { userLogin } from '../redux/actions/userActions'
import Spinner from '../components/Spinner';

function Login() {
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.alertsReducer)

  function onFinish(values) {
    dispatch(userLogin(values))        
  }
    
  return (
    <div style={{ height: '100%', display: 'flex',alignItems: 'center', justifyContent: 'space-around' }}>
      <Card style={{ width: 500,  borderRadius: '8px'}} bordered={false}>
        {loading ? 
        <div style={{height: 300}}>
          <Spinner />
        </div> : 
          <Form layout='vertical' onFinish={onFinish}>
            <h1>Login</h1>
            <hr style={{ marginBottom: 10}}/>
            <Form.Item name='username' label='Username' rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name='password' label='Password' rules={[{required: true}]}>
                <Input type='password'/>
            </Form.Item>
            <Button 
              htmlType="submit"
              loading={loading ? true : false}
              type="primary"
              style={{ marginBottom: 15}}>
              Login
            </Button>
            <br />
            <Link to='/register'>Cadastrar usuário</Link>
          </Form>
          }                
      </Card>
    </div>
  )
}

export default Login