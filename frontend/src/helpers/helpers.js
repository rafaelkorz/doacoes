export const getPaymentType = (type) => {
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

export const getStatusPay = (type) => {
  if (type === 1) {
    return 'Aprovado '
  } else if (type === 2) {
    return 'Andamento'
  } else {
    return 'Estornado'
  }        
}