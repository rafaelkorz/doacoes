import React from 'react'
import { useParams } from "react-router-dom";
import { Button, Form , Input, Card, message } from 'antd'
import { useHistory } from 'react-router-dom';
import { api } from './../services/api';

function NewPassword() {  
  const { token } = useParams();
  const history = useHistory();

  async function onFinish(values) {
    const password = values.newPassword
    const password2 = values.newPassword2

    if (password !== password2) {
      message.warn('Senhas informadas são diferentes!')
    } else if (password) {
      const data = {
        token,
        password,
      }
      const response = await api.post('/api/users/newpassword', data);
      if (response.data.type === 1) {
        message.warn(response.data.message)
      } else {
        message.success(response.data.message)
        history.push('/login');
      }
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
          <h1>Cadastrar nova senha</h1>
          <hr style={{ marginBottom: 10}}/>
          <Form.Item 
            name='newPassword' 
            label='Senha' 
            rules={[{ required: true }]}>
            <Input/>
          </Form.Item>
          <Form.Item 
            name='newPassword2' 
            label='Repetir senha' 
            rules={[{ required: true }]}>
            <Input/>
          </Form.Item>
          <Button 
            htmlType="submit"
            onClick={onFinish}
            type="primary"
            style={{ marginBottom: 15, marginLeft: 10, width: 90 }}>
            Confirmar
          </Button>
        </Form>             
      </Card>
    </div>
  )
}

export default NewPassword