import React from "react";
import { Box, Divider, Center } from "@chakra-ui/react";
import '../pages/pages.css'


const Footer = () => {

  return (
    <React.Fragment>
      <div className="footer">
        <Box h='30px' />
        <Center>
          <Divider/>
        </Center>
        <Box h='100px' />
        <Center h='10px' color='gray' fontSize='12px' padding='15px'>
          2022 @Disertatie
        </Center>
      </div>
    </React.Fragment>
  );
};
export default Footer;