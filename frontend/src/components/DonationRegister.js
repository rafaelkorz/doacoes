import { Button, Card, Modal, Radio, Space  } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stripePriceAction } from '../redux/actions/stripeActions'
import DefaultLayout from "../components/DefaultLayout";
import { getStripeJs } from './../services/stripe';
import {api} from './../services/api'

function DonationRegister() {
  const { stripePrice } = useSelector(state => state.stripeReducer);
  const { user } = useSelector(state => state.userReducer);
  const [visibleModal, setVisibleModal] = useState(false);
  const [typePayment, setTypePayment] = useState(1);
  const [priceId, setPriceId] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(stripePriceAction());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChangePayment = (e) => {
    setTypePayment(e.target.value)
  }

  const paymentButton = async () => {
    try {
      setVisibleModal(false)
      setTypePayment(1)
      
      const data = {
        email: user?.email,
        priceId,
        typePayment
      }

      const response = await api.post('/api/stripe/payment', data);

      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <DefaultLayout>
      <div style={{ height: '100%', 
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center', 
                    justifyContent: 'space-around' }}>
        <Card bordered={false} 
              title="Escolha o valor da doação"
              style={{ width: 450, 
                       height: 250,
                       borderRadius: '8px'}}> 
          {
            stripePrice.length > 0 ? 
            <div style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
              <Button 
                type={'primary'} 
                style={{ marginBottom: 10 }}
                onClick={() => {
                  setVisibleModal(true)
                  setPriceId(stripePrice[0].priceId)                  
                  }
                }
                >
                  {stripePrice[0].amount}
              </Button> 
              <Button 
                type={'primary'} 
                style={{ marginBottom: 10 }}
                onClick={() => {
                  setVisibleModal(true)
                  setPriceId(stripePrice[1].priceId)                  
                  }
                }
                >
                  {stripePrice[1].amount}
              </Button> 
              <Button 
                type={'primary'} 
                style={{ marginBottom: 10 }}
                onClick={() => {
                    setVisibleModal(true)
                    setPriceId(stripePrice[2].priceId)                  
                  }
                }
                >
                  {stripePrice[2].amount}
              </Button>
            </div> :
            <></>
          }          
        </Card>
      </div>
      <Modal  
          title="Forma de pagamento" 
          visible={visibleModal} 
          onOk={() => paymentButton()} 
          onCancel={() => {
            setVisibleModal(false)  
            setTypePayment(1)}
        }
      >
        <Radio.Group 
          onChange={(e) => onChangePayment(e)} 
          value={typePayment}
        >
          <Space direction="vertical">
            <Radio value={1}>Cartão de crédito</Radio>
            <Radio value={3}>Boleto bancário</Radio>
          </Space>
        </Radio.Group>
      </Modal> 
    </DefaultLayout>
  );
}

export default DonationRegister;
