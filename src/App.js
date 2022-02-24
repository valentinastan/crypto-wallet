import "./App.css";
import React from "react";
import { appRoutes } from "./routes/routes";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";

function App() {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {appRoutes}
    </ChakraProvider>
  );
}

export default App;
