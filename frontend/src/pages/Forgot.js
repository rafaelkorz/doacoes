import React from 'react'
import {Button, Form , Input, Card, message} from 'antd'
import { useHistory } from 'react-router-dom';
import { api } from './../services/api';

function Forgot() {
  const history = useHistory();

  async function onFinish(values) {    
    // console.log(values);
    const response = await api.post('/api/users/resetpassword', values)
    if (response.data.type === 1) {
      message.error(response.data.message)
    } else {
      message.success(response.data.message)
      history.push('/login')
    }
  }

  return (
    <div style={{ height: '100%', 
                  display: 'flex',
                  alignItems: 'center', 
                  justifyContent: 'space-around' }}
    >
      <Card style={{ width: 500,  borderRadius: '8px'}} bordered={false}>
        <Form layout='vertical' onFinish={onFinish}>
          <h1>Recuperar Senha</h1>
          <hr style={{ marginBottom: 10}}/>
          <Form.Item 
            name='email' 
            label='Email' 
            rules={[{ required: true }]}>
            <Input/>
          </Form.Item>
          <Button 
            // onClick={onFinish}
            htmlType="submit"
            type="primary"
            style={{ marginBottom: 15, marginLeft: 10 }}>
            Recuperar
          </Button>
          <Button 
            onClick={() => history.goBack()}
            type="primary"
            style={{ marginBottom: 15, marginLeft: 10, width: 90 }}>
            Login
          </Button>
        </Form>             
      </Card>
    </div>
  )
}

export default Forgot