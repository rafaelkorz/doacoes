import { Button, Steps, Form, InputNumber, Card, Switch, Radio, Space } from "antd";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { donationReg } from '../redux/actions/donationsActions'
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
// import { addCar, editCar, getAllCars } from "../redux/actions/carsActions";

function DonationRegister() {
  const { Step } = Steps;
  const user = JSON.parse(localStorage.getItem('user'))
  const { loading } = useSelector(state => state.alertsReducer)

  const dispatch = useDispatch()

  const steps = [
    {
      title: 'Valor',
    },
    {
      title: 'Pagamento',
    },
    {
      title: 'Confirmação',
    },
  ];

  const [current, setCurrent] = useState(0);
  const formRef = useRef();
  const [paymentType, setPaymentType] = useState(1);

  const onChangeRadio = e => {
    setPaymentType(e.target.value);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  function getPaymentType(type) {
    if (type === 1) {
      return 'Cartão de crédito'
    }
    if (type === 2) {
      return 'PIX'
    }
    if (type === 3) {
      return 'Boleto bancário'
    } else {
      return 'Débito em conta'
    }        
  }
  
  function onFinish() {
    const data = {
      idUsuario: user._id,
      value: formRef.current.getFieldValue('value'),
      anonymous: formRef.current.getFieldValue('anonymous') ? true : false,
      type_payment: paymentType,
      reverse: false,
      status: 1
    }

    dispatch(donationReg(data))
  }

  const StepsDonation = () => {
    if (current === 0) {
      return (
        <Card     
          title="Informe o valor da doação"   
          size="small"   
          bordered={false}             
          style={{ background: '#0E0E0E', borderRadius: '8px', marginTop: 20, marginBottom: 20, height: 180}}
        >      
          <Form.Item name='value' label='Valor' rules={[{required: true}]}>
            <InputNumber/>
          </Form.Item>
          <Form.Item name='anonymous' label='Anônimo' valuePropName='checked'>
            <Switch />
         </Form.Item>
        </Card>
      )
    } else if (current === 1) {
      return (
        <Card
          size="small"  
          title="Informe a forma de pagamento"  
          bordered={false}                    
          style={{ background: '#0E0E0E', borderRadius: '8px', marginTop: 20, marginBottom: 20, height: 180}}
        >      
          <Radio.Group onChange={onChangeRadio} value={paymentType}>
          <Space direction="vertical">
            <Radio value={1}>Cartão de crédito</Radio>
            <Radio value={2}>PIX</Radio>
            <Radio value={3}>Boleto bancário</Radio>
            <Radio value={4}>Débito em conta</Radio>
          </Space>
          </Radio.Group>
        </Card>
      )
    } else {
      return (
        <Card
          size="small"  
          title="Confirme os dados da doação"  
          bordered={false}                    
          style={{ background: '#0E0E0E', borderRadius: '8px', marginTop: 20, marginBottom: 20, height: 180}}
        >      
          <span  style={{fontSize: 14, fontWeight: 600}}>Valor doação: </span><span>R${formRef.current.getFieldValue('value')} </span> <br />
          <span  style={{fontSize: 14, fontWeight: 600}}>Doação anônima? </span><span>{formRef.current.getFieldValue('anonymous') ? 'Sim' : 'Não'} </span> <br />
          <span  style={{fontSize: 14, fontWeight: 600}}>Forma de pagamento: </span><span>{getPaymentType(paymentType)}</span>
        </Card>
      )     
    }  
  }

  return (
    <DefaultLayout>
      <div style={{ height: '100%', display: 'flex',alignItems: 'center', justifyContent: 'space-around' }}>
        <Card bordered={false} style={{ width: 600, height: 320,  borderRadius: '8px'}}>          
         
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <Form 
            ref={formRef}
            name="control-ref"
            onFinish={onFinish}
            size="small"
          >
            <div>
              {loading ? 
              <div style={{height: 200}}>
                <Spinner />
              </div> : 
              <StepsDonation />} 
            </div>
          
            <div>
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Proximo
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" onClick={() => formRef.current.submit()}>
                  Finalizar
                </Button>
              )}
              {current > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                  Voltar
                </Button>
              )}
              
            </div>
          </Form>
        </Card>
      </div>
    </DefaultLayout>
  );
}

export default DonationRegister;
