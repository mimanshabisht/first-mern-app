import { Box, Button } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./elements/Navbar";
import { useColorModeValue } from "./components/ui/color-mode";

function App() {
  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
        <Navbar />
        <Outlet />
      </Box>
    </>
  );
}

export default App;
