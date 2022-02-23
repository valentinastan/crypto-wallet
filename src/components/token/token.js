import React from "react";
import { deleteTokenRequest } from "../../requests/token";
import DeleteTokenAlert from './deleteTokenAlert'
import {
  Tr,
  Td,
  Avatar,
  IconButton,
  useDisclosure,
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

  //const { isOpen, onOpen, onClose } = useDisclosure()

  const openDeleteTokenAlert = () => {
  return <deleteAlert props='lala'></deleteAlert>
    return <DeleteTokenAlert onOpen='true' deleteToken={deleteToken}></DeleteTokenAlert>
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
          <DeleteTokenAlert show='true' deleteToken={deleteToken} token={{...props.token, index: props.index}}></DeleteTokenAlert>
         {/* <IconButton 
          onClick={() => <DeleteTokenAlert onOpen='true' deleteToken={deleteToken}></DeleteTokenAlert>}
          variant='ghost'
          colorScheme='red'
          aria-label='Delete Token' 
          icon={<MinusIcon />} /> */}
          {/* <button type="button" onClick={deleteToken}>
            Remove
          </button> */}
        </Td>
      </Tr>

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
