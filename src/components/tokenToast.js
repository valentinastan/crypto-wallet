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

  return (
    (!toast.isActive(id)) && 
      toast({
        title,
        description,
        status,
        duration: 9000,
        isClosable: true,
        variant: 'left-accent',
      })
  )
}
export default TokenToast