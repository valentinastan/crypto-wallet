import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { MinusIcon } from "@chakra-ui/icons";

const DeleteTokenAlert = (props) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  console.log("ALERTA", props);

  return (
    <React.Fragment>
      {/* <Button onClick={onOpen}>Discard</Button> */}

      {/* <IconButton
        onClick={onOpen}
        variant="ghost"
        colorScheme="red"
        aria-label="Delete Token"
        icon={<MinusIcon />}
      /> */}

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={props.onClose}
        isOpen={props.isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete {props.symbol} token?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={props.onClose}>
              No
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => {
                return props.deleteToken(), props.onClose();
              }}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </React.Fragment>
  );
};
export default DeleteTokenAlert;
