import React, { useState, useRef, useEffect } from "react";
import allEthTokens from "../../constants/ethChain/const";
import allBnbTokens from "../../constants/bnbChain/const";
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
import { useGlobalState } from "../../state-management/stores/store";
import { sortTokens } from "./token-helpers";

const AddTokenModal = (props) => {
  const networkId = useGlobalState().walletState.networkId;
  const [value, setValue] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior] = useState("inside");
  const finalRef = useRef();
  const initialRef = useRef();

  const userTokens = props.tokens;
  let searchResultTokens = [];
  const [unimportedTokensWithDetails, setUnimportedTokensWithDetails] =
    useState();

  const [filteredTokens, setFilteredTokens] = useState([]);
  const [sortedFilteredTokens, setSortedFilteredTokens] = useState([]);
  var defaultSortParams = {
    isAsc: true,
    filter: "name",
  };

  useEffect(() => {
    if (networkId) {
      updateUnimportedTokens();
    }
  }, [networkId, userTokens]);

  const updateUnimportedTokens = () => {
    if (networkId) {
      switch (networkId) {
        case 1:
          return setFilteredTokens(
            Object.keys(allEthTokens).filter((key) => !(key in userTokens))
          );
        case 56:
          return setFilteredTokens(
            Object.keys(allBnbTokens).filter((key) => !(key in userTokens))
          );
        default:
          return [];
      }
    }
  };

  useEffect(() => {
    if (userTokens && networkId) {
      let newVal = {};
      getPricesRequest({
        tokens: filteredTokens,
        networkId,
      }).then((res) => {
        if (res !== undefined && res.length > 0) {
          res.map((token) => {
            return (newVal[token.symbol.toUpperCase()] = { ...token });
          });
        }
        setUnimportedTokensWithDetails(newVal);
        sortTokens(defaultSortParams, newVal, setSortedFilteredTokens);
      });
    }
  }, [filteredTokens]);

  value === ""
    ? (searchResultTokens = sortedFilteredTokens)
    : (searchResultTokens = sortedFilteredTokens.filter((key) =>
      key.includes(value) || unimportedTokensWithDetails[key].name.toUpperCase().includes(value)
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
