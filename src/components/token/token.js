import React from "react";
import { deleteTokenRequest } from "../../requests/token";
import {
  Tr,
  Td,
  Avatar,
  IconButton,
} from "@chakra-ui/react";
import { MinusIcon } from '@chakra-ui/icons'


const Token = (props) => {
  const currentWallet = localStorage.getItem("address");
  console.log("props", props);
 

  const deleteToken = () => {
    deleteTokenRequest({
      currentWallet,
      symbol: props.token.symbol,
    }).then((result) => {
      if (result === false) {
        console.log("No such document!");
      } else {
        props.deleteToken(props.token.symbol, props.index);
      }
    });
  };

  const calculateTotal = () => {
    if(parseFloat(props.token.balance) > 0 && props.token.price > 0 ){
      return (parseFloat(props.token.balance)*props.token.price).toFixed(2)
    } else {
      return 0;
    }
  }

  return (
    <React.Fragment>
      <Tr>
        <Td>{props.index + 1}</Td>
        <Td>
          <Avatar
            src={props.token.image}
            size="sm" //sau xs
            name={props.token.symbol}
            ml={-1}
            mr={2}
          />
          {props.token.symbol}
        </Td>
        <Td isNumeric>
          {parseFloat(props?.token?.price_change_percentage_24h || 0).toFixed(2)}%
        </Td>
        <Td isNumeric>
          {parseFloat(props?.token?.price || 0).toFixed(4)}
        </Td>
        <Td isNumeric>
          {parseFloat(props?.token?.balance || 0).toFixed(2)}
        </Td>
        <Td isNumeric>
          {parseFloat(calculateTotal() || 0).toFixed(2)}
        </Td>
        <Td>
         <IconButton 
          onClick={deleteToken}
          variant='ghost'
          colorScheme='red'
          aria-label='Delete Token' 
          icon={<MinusIcon />} />
          {/* <button type="button" onClick={deleteToken}>
            Remove
          </button> */}
        </Td>
      </Tr>
      {/* <Tr>
        <Td>{i + 1}</Td>
        <Td>
          <Avatar
            // src={constants[key].logo}
            src={tokens[key].token.image}
            size="sm" //sau xs
            name={key}
            ml={-1}
            mr={2}
          />
          {key}
        </Td>
        <Td isNumeric>
          {tokens[key].token.price_change_percentage_24h ? (Math.round(tokens[key].token.price_change_percentage_24h * 100) / 100).toFixed(2) : 0}%
        </Td>
        <Td isNumeric>
          {tokens[key].token.price ? (Math.round(tokens[key].token.price * 100) / 100).toFixed(4) : 0}
        </Td>
        <Td isNumeric>
          { (Math.round(tokens[key].token.balance * 100) / 100).toFixed(2)}
        </Td>
        <Td isNumeric>
          4
        </Td>
      </Tr> */}


{/* 
      <div>token: {props.token.symbol}</div>
      <div>balance: {parseFloat(props?.token?.balance || 0).toFixed(2)}</div>
      <div>price: {parseFloat(props?.token?.price || 0).toFixed(2)} USD</div>
      <div>total: {calculateTotal()} USD</div>
      <button type="button" onClick={deleteToken}>
        Remove
      </button> */}
    </React.Fragment>
  );
};
export default Token;
