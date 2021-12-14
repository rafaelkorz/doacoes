import TableDonations from './../components/TableDonations'
import { useEffect } from 'react'
import { Button } from 'antd'
import { EditOutlined } from '@ant-design/icons';
import { useDispatch , useSelector } from 'react-redux'
import { getAllDonation, reverseDonation } from '../redux/actions/donationsActions'
import moment from 'moment'
import { getPaymentType, getStatusPay} from './../helpers/helpers'

function Admin() {
  const dispatch = useDispatch()
  const { allDonations } = useSelector((state) => state.donationsReducer);
  const { loading } = useSelector(state => state.alertsReducer)  
  const user = JSON.parse(localStorage.getItem('user'))

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
      title: 'Usuário',
      dataIndex: 'name',
      key: 'name',
      align: "center",
      render: (record) => (
        <div style={{fontSize:14}}>
          {record}
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
    {
      title: 'Estornar',
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button
          shape="circle" 
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {user?.adm ? 
        <TableDonations 
          dataSource={allDonations} 
          columnsDetails={columnsDetails} 
          loading={loading} 
          adm={true}/> 
      : window.location.href='/' }    
    </>
  )
}

export default Admin;