import React, { useState } from "react";
import {
  Tr,
  Td,
  Avatar,
  HStack,
  useColorModeValue,
  IconButton
} from "@chakra-ui/react";
import './css/token.css'
import { ChevronDownIcon, ChevronUpIcon, MinusIcon } from "@chakra-ui/icons";
import Charts from "../charts/lineChartToken";

const Token = (props) => {
  const [showChart, setShowChart] = useState(false)

  const calculateTotal = () => {
    if(parseFloat(props.token.balance) > 0 && props.token.price > 0 ){
      return (parseFloat(props.token.balance)*props.token.price).toFixed(2)
    } else {
      return 0;
    }
  }

  const stylingDecimals = (numericValue) => {
    if(numericValue) {
      if(numericValue > 1 || numericValue === 0) {
        return parseFloat(numericValue).toFixed(2)
      } else if(numericValue > 0.0001) {
        return parseFloat(numericValue).toFixed(4)
      } else {
        return parseFloat(numericValue).toFixed(6)
      }
    } else return 0
  }

  const bg = useColorModeValue('#EDF2F7', '#212938')
  const color = useColorModeValue('#3182ce', 'white')

  return (
    <React.Fragment>
      <Tr
        _hover={{ 
        bg:bg, 
        color:color,
        }}
      >
        <Td>{props.index + 1}</Td>
        <Td>
        <HStack spacing='5px'>
          <Avatar
            src={props.token.image}
            size="sm" //or xs
            name={props.token.symbol}
            ml={-1}
            mr={2}
          />
          <div className="token-symbol">{props.token.symbol}</div>
          </HStack>
        </Td>
        <Td isNumeric className={props?.token?.price_change_percentage_24h > 0 ? 'green-price' : props?.token?.price_change_percentage_24h < 0 ? 'red-price' : ''}>
          {stylingDecimals(props?.token?.price_change_percentage_24h || 0)}%
        </Td>
        <Td isNumeric>
          {stylingDecimals(props?.token?.price || 0)} $
        </Td>
        <Td isNumeric>
          {stylingDecimals(props?.token?.balance || 0)}
        </Td>
        <Td isNumeric>
          {stylingDecimals(calculateTotal() || 0)} $
        </Td>
        <Td isNumeric>
          <IconButton
            onClick={() => props.deletePressed(props?.token?.symbol)}
            variant="ghost"
            colorScheme="red"
            aria-label="Delete Token"
            icon={<MinusIcon />}
          />
        </Td>
        <Td>
          <IconButton
            onClick={() => {
              return setShowChart(!showChart)}}
            variant="ghost"
            colorScheme="teal"
            aria-label="View Token"
            icon={!showChart ? <ChevronDownIcon /> : <ChevronUpIcon />}
          />
        </Td>
      </Tr>
      {showChart &&  
        <Tr>
          <Td colSpan='8'>
          <Charts tokenSymbol={props.token.symbol}></Charts>
          </Td>
        </Tr>
      }
    </React.Fragment>
  );
};
export default Token;
