import { useEffect } from 'react'
import {Table , Col , Form , Input, Card} from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch , useSelector} from 'react-redux'
import { getUserDonation, getAllDonation } from '../redux/actions/donationsActions'
import Spinner from '../components/Spinner';
import DefaultLayout from './../components/DefaultLayout'

function TableDonations({dataSource, columnsDetails, loading}) {  
    return (
      <DefaultLayout>
        <div style={{ height: '100%', display: 'flex',alignItems: 'center', justifyContent: 'space-around' }}>
            <Card 
              bordered={false}
              title="Doações"
              style={{ width: 850,  borderRadius: '8px'}}
            >
              {loading ? 
              <div style={{height: 500}}>
                <Spinner />
              </div> : 
                  <Table                                         
                    dataSource={dataSource}                     
                    columns={columnsDetails} 
                    rowKey={(record) => record.name}
                    scroll={{ x: "none", y: "400px" }}
                    pagination={{ pageSize: 50 }}        
                  /> 
                }                
            </Card>
        </div>
      </DefaultLayout>
    )
}

export default TableDonations