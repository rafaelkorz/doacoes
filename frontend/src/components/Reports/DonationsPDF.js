import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import moment from 'moment'

function DonationsPDF(donations){
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

  const reportTitle = [
    {
      text: 'Doações',
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45] // left, top, right, bottom
    }
  ];

  const dados = donations.map((donation) => {
    return [
      {text: getPaymentType(donation.type_payment), fontSize: 9, margin: [0, 2, 0, 2]},
      {text: `R$ ${parseFloat(donation.value).toLocaleString('pt-BR', 2)}`, fontSize: 9, margin: [0, 2, 0, 2]},
      {text: donation.reverse ? 'Sim' : 'Não', fontSize: 9, margin: [0, 2, 0, 2]},
      {text: donation.anonymous ? 'Sim' : 'Não', fontSize: 9, margin: [0, 2, 0, 2]},
      {text: getStatusPay(donation.status), fontSize: 9, margin: [0, 2, 0, 2]},
      {text: donation.name, fontSize: 9, margin: [0, 2, 0, 2]},
      {text: moment(donation.createdAt).format('DD/MM/YYYY'), fontSize: 9, margin: [0, 2, 0, 2]}
    ] 
  });

  const details = [
    {
      table:{
        headerRows: 1,
        widths: ['*', '*', '*', '*', '*', '*', '*'],
        body: [
          [
            {text: 'Forma de pagamento', style: 'tableHeader', fontSize: 10},
            {text: 'Valor', style: 'tableHeader', fontSize: 10},
            {text: 'Estornado', style: 'tableHeader', fontSize: 10},
            {text: 'Anônimo', style: 'tableHeader', fontSize: 10},
            {text: 'Situacao', style: 'tableHeader', fontSize: 10},
            {text: 'Usuário', style: 'tableHeader', fontSize: 10},
            {text: 'Data', style: 'tableHeader', fontSize: 10}
          ],
          ...dados
        ]
      },
      layout: 'headerLineOnly' // headerLineOnly
    }
  ];

  function Rodape(currentPage, pageCount){
    return [
      {
        text: currentPage + ' / ' + pageCount,
        alignment: 'right',
        fontSize: 9,
        margin: [0, 10, 20, 0] // left, top, right, bottom
      }
    ]
  }

  const docDefinitios = {
    pageSize: 'A4',
    pageMargins: [15, 50, 15, 40],

    header: [reportTitle],
    content: [details],
    footer: Rodape
  }

  pdfMake.createPdf(docDefinitios).open({}, window.open('', '_blank'));
}

export default DonationsPDF;