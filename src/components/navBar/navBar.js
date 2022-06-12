import React from "react";
import { Button, Stack, Divider, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import SwitchTheme from "../switchTheme";
import '../token/css/token.css'
import './navBar.css'
import logoD from "../../images/logo-dark.png"
import logoL from "../../images/logo-light.png"

const NavBar = () => {
  const navigate = useNavigate();
  const logoimg = useColorModeValue(logoL, logoD);

  const handleLogout = () => {
    localStorage.removeItem('address');
    navigate('/');
  }

  return (
    <React.Fragment>
      <div className="header">
      <img src={logoimg} alt="logo"></img>
      <Stack direction='row' spacing={4} align='center' justify='end' height='60px' >
        {/* <Button colorScheme='teal' variant='outline'>
          Change wallet
        </Button>         */}
        <SwitchTheme></SwitchTheme>
        <Button className="logout-button" colorScheme='teal' variant='ghost' onClick={handleLogout}>
          Logout
        </Button>
      </Stack>
      </div>
      <Divider />
    </React.Fragment>
  );
};

export default NavBar;
