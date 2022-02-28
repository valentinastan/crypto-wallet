import React, { useState } from "react";
import { Tr, Td, Avatar, useColorModeValue, Tfoot } from "@chakra-ui/react";
import { addTokenRequest } from "../../requests/token";
import { Flex, HStack } from "@chakra-ui/react";
import "./css/token.css";
import TokenToast from "../tokenToast";

const UnimportedToken = (props) => {
  const walletAddress = localStorage.getItem("address");
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const importToken = () => {
    addTokenRequest({
      walletAddress,
      tokenSymbol: props.token.symbol,
    }).then((data) => {
      if (false || !data.exists) {
        console.log("No such document!");
      } else {
        props.addToken(data.data().tokenSymbol);

        setShowSuccessToast(true);
        props.onClose();
      }
    });
  };

  const bg = useColorModeValue("#EDF2F7", "#3c4960");
  const color = useColorModeValue("#3182ce", "white");

  return (
    <React.Fragment>
      <Tr
        _hover={{
          bg: bg,
          color: color,
          // borderRadius:'40px',
        }}
        borderRadius="2px"
        onClick={importToken}
      >
        <Td cursor="pointer">
          <HStack spacing="5px">
            <Avatar
              src={props.token.image}
              size="sm" //sau xs
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
      </Tr>
      {showSuccessToast && (
        <TokenToast
          actionStatus="success"
          title="Token added."
          description="We've added your token."
        ></TokenToast>
      )}
    </React.Fragment>
  );
};
export default UnimportedToken;
