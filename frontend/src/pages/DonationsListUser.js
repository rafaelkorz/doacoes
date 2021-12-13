import TableDonations from './../components/TableDonations'
import { useEffect } from 'react'
import {Table , Col , Form , Input, Card} from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch , useSelector} from 'react-redux'
import { getUserDonation, getAllDonation } from '../redux/actions/donationsActions'
import Spinner from '../components/Spinner';
import DefaultLayout from './../components/DefaultLayout'

function DonationsListUser() {
  const dispatch = useDispatch()
  const { usersDonations } = useSelector((state) => state.donationsReducer);
  const { loading } = useSelector(state => state.alertsReducer)
  const user = JSON.parse(localStorage.getItem('user'))
  
  function getPaymentType(type) {
    if (type === 1) {
      return 'Cartão de crédito'
    } else if (type === 2) {
      return 'PIX'
    } else if (type === 3) {
      return 'Boleto bancário'
    } else {
      return 'Débito em conta'
    }        
  }

  function getStatusPay(type) {
    if (type === 1) {
      return 'Aprovado '
    } else if (type === 2) {
      return 'Andamento'
    } else {
      return 'Estornado'
    }        
  }

  const columnsDetails = [
    {
      title: 'Tipo pagamento',
      dataIndex: 'type_payment',
      key: 'type_payment',
      render: (record) => (
        <div style={{fontSize:12}}>
          {getPaymentType(record)}
        </div>
      )
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      key: 'value',
      render: (record) => (
        <div style={{fontSize:12}}>
          {record}
        </div>
      )
    },
    {
      title: 'Anônimo',
      dataIndex: 'anonymous',
      key: 'anonymous',
      render: (record) => (
        <div style={{fontSize:12}}>
          {record ? 'Sim' : 'Não'}
        </div>
      )
    }, 
    {
      title: 'Estorno',
      dataIndex: 'reverse',
      key: 'reverse',
      render: (record) => (
        <div style={{fontSize:12}}>
          {record ? 'Sim' : 'Não'}
        </div>
      )
    },
    {
      title: 'Status Pagamento',
      dataIndex: 'status',
      key: 'status',
      render: (record) => (
        <div style={{fontSize:12}}>
          {getStatusPay(record)}
        </div>
      )
    },       
  ];  

  useEffect(() => {
    dispatch(getUserDonation(user._id));
  }, []);
  return (
    <>
      <TableDonations dataSource={usersDonations} columnsDetails={columnsDetails} loading={loading}/>
    </>
  )
}

export default DonationsListUser;


