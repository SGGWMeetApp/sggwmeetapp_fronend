import Modal from "react-modal";
import style from "./Modal.module.css";

export default function ModalWindow(props) {
  const { children, openModal, closeModal } = props;
  return (
    <Modal className={style.Modal} isOpen={openModal} onRequestClose={closeModal} ariaHideApp={false}>
      {children}
    </Modal>
  );
}
