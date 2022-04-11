import React from "react";
import { Button, Stack, Divider } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import SwitchTheme from "../switchTheme";
import '../token/css/token.css'

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('address');
    navigate('/');
  }

  return (
    <React.Fragment>
      <Stack direction='row' spacing={4} align='center' justify='end' height='60px' >
        {/* <Button colorScheme='teal' variant='outline'>
          Change wallet
        </Button>         */}
        <SwitchTheme></SwitchTheme>
        <Button className="logout-button" colorScheme='teal' variant='ghost' onClick={handleLogout}>
          Logout
        </Button>
      </Stack>
      <Divider />
    </React.Fragment>
  );
};

export default NavBar;
