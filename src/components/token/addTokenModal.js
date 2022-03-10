import React, { useState, useRef, useEffect } from "react";
import allTokens from "../../const";
import UnimportedToken from "./unimportedToken";
import { getPricesRequest } from "../../requests/token";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  FormControl,
  Table,
  Tbody,
  Divider,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const AddTokenModal = (props) => {
  const [value, setValue] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState("inside");
  const finalRef = useRef();
  const initialRef = useRef();

  const userTokens = props.tokens;
  let searchResultTokens = [];
  const [unimportedTokensWithDetails, setUnimportedTokensWithDetails] =
    useState();

  //show unimported tokens
  const unimportedTokens = Object.keys(allTokens).filter(
    (key) => !(key in userTokens)
  );

  useEffect(() => {
    let newVal = {};
    getPricesRequest(unimportedTokens).then((res) => {
      if (res !== undefined && res.length > 0) {
        res.map((token) => {
          newVal[token.symbol.toUpperCase()] = { ...token };
        });
      }
      setUnimportedTokensWithDetails({ ...newVal });
    });
  }, []);

  value === ""
    ? (searchResultTokens = unimportedTokens)
    : (searchResultTokens = unimportedTokens.filter((key) =>
        key.includes(value)
      ));

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="auto"
      // backdropFilter='blur(10px) hue-rotate(90deg)'
      backdropBlur="10px"
    />
  );
  const [overlay, setOverlay] = useState(<OverlayOne />);

  return (
    <>
      <Button
        colorScheme="teal"
        size="sm"
        height="40px"
        width="120px"
        border="2px"
        // borderColor='green.500'
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        <AddIcon />
      </Button>

      <Modal
        isCentered
        finalFocusRef={finalRef}
        initialFocusRef={initialRef}
        scrollBehavior={scrollBehavior}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setValue("");
        }}
      >
        {overlay}
        <ModalContent>
          <ModalHeader>Add token</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                value={value}
                onChange={(event) => setValue(event.target.value.toUpperCase())}
                variant="filled"
                ref={initialRef}
                placeholder="Search token..."
              />
            </FormControl>
            <Divider height="22px" />
            <Table variant="unstyled" colorScheme="twitter">
              <Tbody>
                {searchResultTokens !== undefined &&
                  unimportedTokensWithDetails !== undefined &&
                  searchResultTokens.length > 0 &&
                  searchResultTokens.map((token, i) => (
                    <UnimportedToken
                      key={`idToken_${i + 1}`}
                      index={i}
                      token={{
                        ...unimportedTokensWithDetails[token],
                        symbol: token,
                      }}
                      addToken={props.addToken}
                      onClose={onClose}
                    ></UnimportedToken>
                  ))}
              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                onClose();
                setValue("");
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTokenModal;
