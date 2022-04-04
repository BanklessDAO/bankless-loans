import React, { useContext, createContext, ReactNode } from 'react'
import { useDisclosure } from '@chakra-ui/hooks'

interface ModalContextProps {
    isModalOpen: boolean
    closeModal: () => void
    openModal: () => void
    children?: ReactNode
}

const ModalContext = createContext({} as ModalContextProps)

export function ModalProvider({ children }: ModalContextProps) {
    const modal = useModalDisclosure()
    return (
        <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>
    )
}

export const useModal = () => {
    return useContext(ModalContext)
}

function useModalDisclosure() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const isModalOpen = isOpen
    const closeModal = onClose
    const openModal = onOpen
    return {
        isModalOpen,
        closeModal,
        openModal,
    }
}
