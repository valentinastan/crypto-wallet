import React from "react";
import { useColorMode } from "@chakra-ui/react";
import { MdLightMode, MdModeNight } from "react-icons/md";
import { IconButton } from "@chakra-ui/react";

const SwitchTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <React.Fragment>
      <IconButton
        aria-label="Switch theme"
        onClick={toggleColorMode}
        icon={colorMode === "light" ? <MdModeNight /> : <MdLightMode />}
      ></IconButton>
    </React.Fragment>
  );
};
export default SwitchTheme;
