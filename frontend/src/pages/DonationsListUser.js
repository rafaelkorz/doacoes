import TableDonations from './../components/TableDonations'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {apiJWT} from './../services/api';
import moment from 'moment'
import { getPaymentType, getStatusPay} from './../helpers/helpers'

function DonationsListUser() {
  const { loading } = useSelector(state => state.alertsReducer)
  const [usersDonations, setUsersDonations] = useState();
  const { user } = useSelector(state => state.userReducer);

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
      title: 'Estornado',
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
    async function fetchData() {
      const response = await apiJWT.get(`/api/donation/getalluserdonation/${user?._id}`);        
      setUsersDonations(response.data);
    }
    fetchData();
  }, [user?._id]);
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


