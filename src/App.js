import "./App.css";
import React from "react";
import { appRoutes } from "./routes/routes";
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return <ChakraProvider>{appRoutes}</ChakraProvider>;
}

export default App;
