import { useRef } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Center,
  Button,
} from '@chakra-ui/react'
export const DrawerGeneral = ({ isOpen, onClose, body, buttonExtra }) => {
  const btnRef = useRef()
  return (
    <Drawer
      isOpen={isOpen}
      placement='left'
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
        <Center>
          <DrawerFooter>
            {buttonExtra}

          </DrawerFooter>
        </Center>
      </DrawerContent>
    </Drawer>
  )
}