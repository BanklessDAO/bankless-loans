import React, { useContext, createContext, ReactNode } from 'react'
import { useDisclosure } from '@chakra-ui/hooks'

interface ModalContextProps {
    isModalOpen: boolean
    closeModal: () => void
    openModal: () => void
    children?: ReactNode
}

const ModalContext = createContext({} as ModalContextProps)
// Provider component that wraps your app and makes modal object ...
// ... available to any child component that calls useModal().
export function ModalProvider({ children }: ModalContextProps) {
    const modal = useModalDisclosure()
    return (
        <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>
    )
}

// Hook for child components to get the modal object ...
// ... and re-render when it changes.
export const useModal = () => {
    return useContext(ModalContext)
}

// Provider hook that creates modal object and handles state
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
