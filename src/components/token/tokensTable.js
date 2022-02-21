import React from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";
import constants from "../../const";

const TokensTable = (props) => {
  console.log("PROPS", props);
  const tokens = { ...props.tokens };

  return (
    <Table variant="simple" colorScheme="twitter">
      <Thead>
        <Tr>
          <Th>Index</Th>
          <Th>Symbol</Th>
          <Th isNumeric>Balance</Th>
          <Th isNumeric>Price</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tokens !== undefined &&
          Object.keys(tokens).length > 0 &&
          Object.keys(tokens).map((key, i) => (
            <Tr>
              <Td>{i + 1}</Td>
              <Td>
                <Avatar
                  src={constants[key].logo}
                  size="sm" //sau xs
                  name={key}
                  ml={-1}
                  mr={2}
                />
                {key}
              </Td>
              <Td isNumeric>{tokens[key].token.balance}</Td>
              <Td isNumeric>
                {tokens[key].token.price ? tokens[key].token.price : 0}
              </Td>
            </Tr>
          ))}

        {/* <Tr>
        <Td>
        <Avatar
          src='https://www.logolynx.com/images/logolynx/91/9147cbcba879619a4fa14ec70fd06fb0.jpeg'
          size='sm' //sau xs
          name='Segun Adebayo'
          ml={-1}
          mr={2}
        >
        <AvatarBadge boxSize='1.25em' bg='green.500' />
        </Avatar>
        </Td>
        <Td>millimetres (mm)</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td>feet</Td>
        <Td>centimetres (cm)</Td>
        <Td isNumeric>30.48</Td>
      </Tr>
      <Tr>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td isNumeric>0.91444</Td>
      </Tr>*/}
      </Tbody>
    </Table>
  );
};
export default TokensTable;
