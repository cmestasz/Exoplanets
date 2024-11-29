export interface AlertOptions {
  message: string;
  type?: 'error' | 'success';
  duration?: number;
}
export interface ModalContent {
  title: string;
  onAccept: () => void;
}
