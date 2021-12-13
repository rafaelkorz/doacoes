import TableDonations from './../components/TableDonations'
import { useEffect } from 'react'
import {Button , Col , Form , Input, Card} from 'antd'
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { useDispatch , useSelector} from 'react-redux'
import { getAllDonation, reverseDonation } from '../redux/actions/donationsActions'
import { getUserName } from '../redux/actions/userActions'
import Spinner from '../components/Spinner';
import DefaultLayout from './../components/DefaultLayout'

function Admin() {
  const dispatch = useDispatch()
  const { allDonations } = useSelector((state) => state.donationsReducer);
  const { userName } = useSelector((state) => state.userReducer);
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
    {
      title: 'Usuário',
      dataIndex: 'idUsuario',
      key: 'idUsuario',
      render: (record) => (
        <div style={{fontSize:12}}>
          {record}
        </div>
      )
    }, 
    {
      title: 'Estornar',
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button
          disabled={record.reverse}                    
          onClick={() =>{
            record.reverse = true;
            reverseDonation(record, record._id)
            }
          }
        >
          <EditOutlined />
        </Button>
      )
    }, 

  ];  

  useEffect(() => {
      dispatch(getAllDonation()); 
  }, []);

  return (
    <>
      {user.adm ? <TableDonations dataSource={allDonations} columnsDetails={columnsDetails} loading={loading}/> : window.location.href='/' }    
    </>
  )
}

export default Admin;