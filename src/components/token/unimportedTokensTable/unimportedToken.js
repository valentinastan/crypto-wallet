import React from "react";
import {
  Tr,
  Td,
  Avatar,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { SmallAddIcon } from '@chakra-ui/icons'

const UnimportedToken = (props) => {
  console.log("props", props);


 
  return (
    <React.Fragment>
      <Tr
        _hover={{ 
          bg: '#ebedf0',
          borderRadius:'40px'
         }}
        borderRadius='2px'
      >
        {/* <Td>{props.index + 1}</Td> */}
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
        <Td>
         <IconButton 
          // onClick={() => <DeleteTokenAlert onOpen='true' deleteToken={deleteToken}></DeleteTokenAlert>}
          variant='outline'
          colorScheme='teal'
          aria-label='Add Token' 
          icon={<SmallAddIcon />} />
        </Td>
      </Tr>

    </React.Fragment>
  );
};
export default UnimportedToken;
