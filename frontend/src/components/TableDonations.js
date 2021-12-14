import { useRef, useState } from 'react'
import {Table , Button , Form , DatePicker, Card, Checkbox} from 'antd'
import moment from "moment";
import { useDispatch } from 'react-redux'
import { getAllDonationDates } from '../redux/actions/donationsActions'
import Spinner from '../components/Spinner';
import DefaultLayout from './../components/DefaultLayout'
import { SearchOutlined } from '@ant-design/icons';

function TableDonations({dataSource, columnsDetails, loading, adm}) {
  const { RangePicker } = DatePicker;  
  const formRef = useRef();
  const dispatch = useDispatch();
  const [checkReverse, setCheckReverse] = useState();

  const onFinish = (filters) => {
    const data = {
      dt_start: filters.rangeDate[0].format('YYYY-MM-DD 00:00:00'),
      dt_end: filters.rangeDate[1].format('YYYY-MM-DD 23:59:59'),
      reverse: checkReverse
    }
    dispatch(getAllDonationDates(data)); 
  }

  const onChangeCheckReverse = (e) => {
    setCheckReverse(e.target.checked)
  }

  return (
    <DefaultLayout>
      <div style={{ height: '100%', 
                    display: 'flex',
                    alignItems: 'center', 
                    justifyContent: 'space-around', 
                    flexDirection: 'column' }}>          
        {adm ?
          <Form 
            ref={formRef} 
            onFinish={onFinish}
          >
            <div style={{ display: 'flex'}}>
              <Form.Item 
                name="rangeDate"
                rules={[{ required: true, message: 'Informe as datas'}]}>
                <RangePicker
                  ranges={{
                    '1 Dia': [moment().subtract(1, 'days'), moment()],
                    '1 Semana': [moment().subtract(7, 'days'), moment()],
                    '1 Mês': [moment().startOf('month'), moment().endOf('month')],
                    '6 meses': [moment().subtract(6, 'months'), moment()],
                    '12 meses': [moment().subtract(12, 'months'), moment()],
                  }}
                  format="DD/MM/YYYY"
                  placeholder={[
                    'Data Inicial',
                    'Data Final'
                  ]}
                  style={{ width: '100%' }}
                  dateRender={current => {
                    const style = {};
                    if (current.date() === 1) {
                      style.border = '1px solid #666';
                      style.borderRadius = '50%';
                    }
                    return (
                      <div className="ant-picker-cell-inner" style={style}>
                        {current.date()}
                      </div>
                    );
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Checkbox style={{ marginLeft: 25 }} onChange={onChangeCheckReverse}>Estonado</Checkbox>
              </Form.Item>
              <Button
                style={{ marginLeft: 20 }} 
                htmlType="submit" 
                className="filtersSubmit"
                type="primary" 
                shape="circle" 
                icon={<SearchOutlined />} />                   
            </div>      
          </Form> :
          <></>
        }
        <Card 
          bordered={false}
          title="Doações"
          style={{ width: 1000,  borderRadius: '8px'}}
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