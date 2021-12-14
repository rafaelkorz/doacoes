import TableDonations from './../components/TableDonations'
import { useEffect } from 'react'
import { useDispatch , useSelector} from 'react-redux'
import { getUserDonation } from '../redux/actions/donationsActions'
import moment from 'moment'

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
        <div style={{fontSize:14}}>
          {getPaymentType(record)}
        </div>
      )
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      key: 'value',
      render: (record) => (
        <div style={{fontSize:14}}>
          R$ {parseFloat(record).toLocaleString('pt-BR', 2)}
        </div>
      ) 
    },
    {
      title: 'Anônimo',
      dataIndex: 'anonymous',
      key: 'anonymous',
      align: "center",
      render: (record) => (
        <div style={{fontSize:14}}>
          {record ? 'Sim' : 'Não'}
        </div>
      )
    }, 
    {
      title: 'Estonado',
      dataIndex: 'reverse',
      key: 'reverse',
      align: "center",
      render: (record) => (
        <div style={{fontSize:14}}>
          {record ? 'Sim' : 'Não'}
        </div>
      )
    },
    {
      title: 'Status Pagamento',
      dataIndex: 'status',
      key: 'status',
      align: "center",
      render: (record) => (
        <div style={{fontSize:14}}>
          {getStatusPay(record)}
        </div>
      )
    }, 
    {
      title: 'Data',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: "center",
      render: (record) => (
        <div style={{fontSize:14}}>
          {moment(record).format('DD/MM/YYYY')}
        </div>
      )
    },           
  ];  

  useEffect(() => {
    dispatch(getUserDonation(user._id));
  }, []);
  return (
    <>
      <TableDonations 
        dataSource={usersDonations} 
        columnsDetails={columnsDetails} 
        loading={loading} 
        adm={false}/>
    </>
  )
}

export default DonationsListUser;


