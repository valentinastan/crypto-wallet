import React, { useState } from "react";
import { deleteTokenRequest } from "../../requests/token";
import DeleteTokenAlert from './deleteTokenAlert'
import {
  Tr,
  Td,
  Avatar,
  HStack,
  useColorModeValue,
  Tfoot,
} from "@chakra-ui/react";
import TokenToast from "../tokenToast";
import './css/token.css'

const Token = (props) => {
  const currentWallet = localStorage.getItem("address");
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  console.log("props", props);
 

  const deleteToken = () => {
    deleteTokenRequest({
      currentWallet,
      symbol: props.token.symbol,
    }).then((result) => {
      if (result === false) {
        console.log("No such document!");
      } else {
        setShowDeleteToast(true)
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

  const bg = useColorModeValue('#EDF2F7', '#212938')
  const color = useColorModeValue('#3182ce', 'white')

  return (
    <React.Fragment>
      <Tr
        _hover={{ 
        bg:bg, 
        color:color,
        // borderRadius:'40px',
        }}
      >
        <Td>{props.index + 1}</Td>
        <Td>
        <HStack spacing='5px'>
          <Avatar
            src={props.token.image}
            size="sm" //sau xs
            name={props.token.symbol}
            ml={-1}
            mr={2}
          />
          <div className="token-symbol">{props.token.symbol}</div>
          </HStack>
        </Td>
        <Td isNumeric className={props?.token?.price_change_percentage_24h > 0 ? 'green-price' : props?.token?.price_change_percentage_24h < 0 ? 'red-price' : ''}>
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
        </Td>
      </Tr>
      {showDeleteToast && (
        <TokenToast
          actionStatus="error"
          title="Token deleted."
          description="We've deleted your token."
        ></TokenToast>
      )}
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
