import "./modal.css";

type ModalProps = {
  children?: React.ReactChild;
  isOpen: boolean;
  closeModal: () => void;
};

export default function Modal({ children, isOpen, closeModal }: ModalProps) {
  const modalClickHandler = (e: React.SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return (
    <div
      className={!!isOpen ? "modal open" : "modal"}
      onClick={modalClickHandler}
    >
      {children}
    </div>
  );
}
