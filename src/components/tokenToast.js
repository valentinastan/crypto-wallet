import { useToast } from '@chakra-ui/react'
import React from 'react'

const TokenToast = (props) => {
  const toast = useToast()
  const id = props.title
  const {
    actionStatus,
    title,
    description
  } = props
  let status;

  actionStatus === 'success' ?
    status = 'success' :
      status = 'error'

  console.log('this is actionstatus', actionStatus)
  const displayToast = () => {
    toast({
      title,
      description,
      status,
      duration: 900,
      isClosable: true,
      variant: 'left-accent',
    })
  }

  return (
    <React.Fragment>
      {
        (!toast.isActive(id)) &&
        displayToast()
      }
    </React.Fragment>
  )
}
export default TokenToast
