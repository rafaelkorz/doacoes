import { Button, Card } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stripePriceAction } from '../redux/actions/stripeActions'
import DefaultLayout from "../components/DefaultLayout";
import { getStripeJs } from './../services/stripe';
import api from './../services/api'

function DonationRegister() {
  const user = JSON.parse(localStorage.getItem('user'))   
  const { stripePrice  } = useSelector(state => state.stripeReducer)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(stripePriceAction());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const subscribeButtonOne = async (priceId) => {
    try {
      const data = {
        email: user.email,
        priceId
      }

      const response = await api.post('/api/stripe/subscribe', data);

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
                onClick={() => subscribeButtonOne(stripePrice[0].priceId)}
                >
                  {stripePrice[0].amount}
              </Button> 
              <Button 
                type={'primary'} 
                style={{ marginBottom: 10 }}
                onClick={() => subscribeButtonOne(stripePrice[1].priceId)}
                >
                  {stripePrice[1].amount}
              </Button> 
              <Button 
                type={'primary'} 
                style={{ marginBottom: 10 }}
                onClick={() => subscribeButtonOne(stripePrice[2].priceId)}
                >
                  {stripePrice[2].amount}
              </Button>
            </div> :
            <></>
          }          
        </Card>
      </div>
    </DefaultLayout>
  );
}

export default DonationRegister;
