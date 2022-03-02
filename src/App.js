import "./App.css";
import React from "react";
import { appRoutes } from "./routes/routes";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";

function App() {
  return (
    <React.Fragment>
    <ColorModeScript initialColorMode='dark'/>
    <ChakraProvider>

      {appRoutes}
    </ChakraProvider>
    </React.Fragment>
  );
}

export default App;
