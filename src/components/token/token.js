import React, { useState } from "react";
import {
  Tr,
  Td,
  Avatar,
  HStack,
  useColorModeValue,
  IconButton,
  useDisclosure,
  Fade,
  Collapse,
  ScaleFade,
  Flex,
  SlideFade
} from "@chakra-ui/react";
import './css/token.css'
import { ChevronDownIcon, ChevronUpIcon, MinusIcon } from "@chakra-ui/icons";
import LineChartToken from "../charts/lineChartToken";
import { stylingDecimals } from "./token-helpers";
import "./css/token.css";

const Token = (props) => {
  const [showChart, setShowChart] = useState(false)

  const bg = useColorModeValue('#EDF2F7', '#212938')
  const color = useColorModeValue('#3182ce', 'white')

  const { isOpen, onToggle } = useDisclosure()

  return (
    <React.Fragment>
      <Tr
        _hover={{ 
        bg:bg, 
        color:color,
        fontWeight: '500',
        }}
        opacity={(!props.token.balance || props.token.balance <= 0.00001) ? 0.33 : 1}
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
          <Flex direction="column">
            <div className="token-symbol">{props.token.symbol}</div>
            <div className="token-name">{props.token.name}</div>
          </Flex>
          </HStack>
        </Td>
        <Td isNumeric className={props?.token?.price_change_percentage_24h > 0 ? 'green-price' : props?.token?.price_change_percentage_24h < 0 ? 'red-price' : ''}>
          {parseFloat(props?.token?.price_change_percentage_24h || 0).toFixed(2)} %
        </Td>
        <Td isNumeric>
          {stylingDecimals(props?.token?.price || 0)} $
        </Td>
        <Td isNumeric>
          {stylingDecimals(props?.token?.balance || 0)}
        </Td>
        <Td isNumeric>
          {stylingDecimals(props?.token?.amount || 0)} $
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
              onToggle()
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
          <SlideFade in={isOpen}>
            <LineChartToken tokenSymbol={props.token.symbol}></LineChartToken>
          </SlideFade >
          </Td>
        </Tr>
      }
    </React.Fragment>
  );
};
export default Token;
