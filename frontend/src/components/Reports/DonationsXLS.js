import XLSX from 'xlsx'
import { getPaymentType, getStatusPay} from './../../helpers/helpers'
import moment from "moment";

function DonationsXLS(dataSource) {
  let data;
  const template = dataSource.map(donation => { 
    data = {
      tipo_pagamento: getPaymentType(donation.type_payment),
      valor: `R$ ${parseFloat(donation.value).toLocaleString('pt-BR', 2)}`,
      estorno: donation.reverse ? 'Sim' : 'Não',
      anonimo: donation.anonymous ? 'Sim' : 'Não',
      status: getStatusPay(donation.status),
      name: donation.name,
      data: moment(donation.createdAt).format('DD/MM/YYYY')
    }
    return data;
  })

  const newData = template.map(row => {
    delete row.tableData
    return row
  })
  const workSheet = XLSX.utils.json_to_sheet(newData)
  const workBook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workBook,workSheet,"doacoes")
  //Binary string
  XLSX.write(workBook,{bookType:"xlsx",type:"binary"})
  //Download
  XLSX.writeFile(workBook,"ListaDoacoes.xlsx")
}

export default DonationsXLS
