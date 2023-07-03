import { useRef } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
} from '@chakra-ui/react'
export const DrawerGeneral = ({isOpen, onClose, body, buttonExtra}) => {
  const btnRef = useRef()
  return(
    <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size={'md'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          

          <DrawerBody>
            {body}
          </DrawerBody>
          <DrawerFooter>
            {buttonExtra}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  )
}