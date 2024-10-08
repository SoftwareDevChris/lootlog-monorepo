import { useModalStore } from "@/store/modal-store";

import { Modal } from "./Modal";

export const ModalRoot = () => {
  const isVisible = useModalStore().isVisible;

  return (
    <div id="modal-root" className={`${isVisible && "active"}`}>
      {isVisible && <Modal />}
    </div>
  );
};
