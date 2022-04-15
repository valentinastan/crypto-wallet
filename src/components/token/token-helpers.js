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

export const getNetwork = (web3, walletState) => {
  if (walletState.networkId !== null) {
    return walletState.networkId;
  } else {
    const target_chain = Object.assign({}, web3.eth.Contract.currentProvider);
    return parseInt(target_chain.networkVersion);
  }
};

export const stylingDecimals = (numericValue) => {
  if(numericValue) {
    if(numericValue > 1) {
      return parseFloat(numericValue).toFixed(2)
    } else if(numericValue > 0.0001) {
      return parseFloat(numericValue).toFixed(4)
    } else if(numericValue < 0.00000000001) {
      return parseFloat(numericValue).toFixed(2)
    }
    else {
      return parseFloat(numericValue).toFixed(6)
    }
  } else return parseFloat(numericValue).toFixed(2)
}

export const sortTokens = (sort, tokensList, setOrderedTokens) => {
  if (sort !== undefined) {
    const { isAsc, filter } = sort;

    switch (filter) {
      case "name":
        if (isAsc === true) {
          const ordered = Object.keys(tokensList).sort((a, b) =>
            tokensList[a].name > tokensList[b].name
              ? 1
              : tokensList[b].name > tokensList[a].name
              ? -1
              : 0
          );

          return setOrderedTokens(ordered);
        } else if (isAsc === false) {
          const orderedDesc = Object.keys(tokensList)
            .sort((a, b) =>
              tokensList[a].name > tokensList[b].name
                ? 1
                : tokensList[b].name > tokensList[a].name
                ? -1
                : 0
            )
            .reverse();
          return setOrderedTokens(orderedDesc);
        }
        break;
      case "24h_percentage":
        if (isAsc === true) {
          const ordered = Object.keys(tokensList).sort(
            (a, b) =>
              tokensList[a].price_change_percentage_24h -
              tokensList[b].price_change_percentage_24h
          );

          return setOrderedTokens(ordered);
        } else if (isAsc === false) {
          const orderedDesc = Object.keys(tokensList)
            .sort(
              (a, b) =>
                tokensList[a].price_change_percentage_24h -
                tokensList[b].price_change_percentage_24h
            )
            .reverse();

          return setOrderedTokens(orderedDesc);
        }
        break;
      case "price":
        if (isAsc === true) {
          const ordered = Object.keys(tokensList).sort(
            (a, b) => tokensList[a].price - tokensList[b].price
          );

          return setOrderedTokens(ordered);
        } else if (isAsc === false) {
          const orderedDesc = Object.keys(tokensList)
            .sort((a, b) => tokensList[a].price - tokensList[b].price)
            .reverse();

          return setOrderedTokens(orderedDesc);
        }
        break;
      case "balance":
        if (isAsc === true) {
          const ordered = Object.keys(tokensList).sort(
            (a, b) => tokensList[a].balance - tokensList[b].balance
          );

          return setOrderedTokens(ordered);
        } else if (isAsc === false) {
          const orderedDesc = Object.keys(tokensList)
            .sort((a, b) => tokensList[a].balance - tokensList[b].balance)
            .reverse();

          return setOrderedTokens(orderedDesc);
        }
        break;
      case "amount":
        if (isAsc === true) {
          const ordered = Object.keys(tokensList).sort(
            (a, b) => tokensList[a].amount - tokensList[b].amount
          );

          return setOrderedTokens(ordered);
        } else if (isAsc === false) {
          const orderedDesc = Object.keys(tokensList)
            .sort((a, b) => tokensList[a].amount - tokensList[b].amount)
            .reverse();

          return setOrderedTokens(orderedDesc);
        }
        break;

      default:
        return setOrderedTokens({ ...tokensList });
    }
  } else {
    return setOrderedTokens({ ...tokensList });
  }
};