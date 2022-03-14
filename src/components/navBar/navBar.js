import React from "react";
import { Button, Stack, Divider } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

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
        <Button colorScheme='teal' variant='outline' onClick={handleLogout}>
          Logout
        </Button>
      </Stack>
      <Divider />
    </React.Fragment>
  );
};

export default NavBar;
