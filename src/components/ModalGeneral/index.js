import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import React from "react"

export const ModalGeneral = ({ isOpen, onClose, overlay, body, title, size="md" }) => {
    //Modal Settings
    
    
    
    return (
        <Modal size={size} isCentered isOpen={isOpen} onClose={onClose} >
            {overlay}
            <ModalContent>
                <ModalHeader textAlign="center">{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {body}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}