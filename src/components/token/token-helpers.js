export const calculateTokenAmount = (balance, price) => {
  if(parseFloat(balance) > 0 && price > 0 ){
    return (parseFloat(balance)*price).toFixed(2)
  } else {
    return 0;
  }
}

export const calculateTokenPercentage = (tokenAmount, walletAmount) => {
  return (100 * tokenAmount) / walletAmount;
} 

export const calculateWalletAmount = (amounts) => {
  return amounts.reduce((partialSum, tokenAmount) => partialSum + tokenAmount, 0)
}