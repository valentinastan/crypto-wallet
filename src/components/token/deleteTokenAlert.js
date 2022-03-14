import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button
} from "@chakra-ui/react";

const DeleteTokenAlert = (props) => {
  const cancelRef = React.useRef();

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
                props.deleteToken() 
                return props.onClose();
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
