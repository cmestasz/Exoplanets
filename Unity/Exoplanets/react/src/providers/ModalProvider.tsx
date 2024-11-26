import Modal from '@components/modals/Modal';
import { useModal } from '@lib/hooks';
import { createContext, useContext } from 'react';

const ModalContext = createContext<({ title, children, onAccept }: {
  title: string, children?: React.ReactNode, onAccept: () => void,
}) => void
>(null);

interface ModalProviderProps {
  children?: React.ReactNode;
}

export function useModals() {
  return useContext(ModalContext);
}

export default function ModalProvider({
  children,
}: ModalProviderProps) {
  const {
    modalVisible, content, showModal, cancel, accept,
  } = useModal();
  return (
    <ModalContext.Provider
      value={showModal}
    >
      {
        modalVisible && (
          <Modal
            title={content.title}
            onCancel={cancel}
            onAccept={accept}
          >
            {content.children}
          </Modal>
        )
      }
      {children}
    </ModalContext.Provider>
  );
}
