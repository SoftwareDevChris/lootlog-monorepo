"use client";

import { useModalStore } from "@/store/modal-store";
import { useState } from "react";
import { createPortal } from "react-dom";
import { OutsideClickContainer } from "../outsideClick/OutsideClick";
import { Button } from "../ui/button/Button";

export const Modal = () => {
  const modalStore = useModalStore();

  const handleConfirm = () => {
    modalStore.confirmAction();
    modalStore.dismiss();
  };

  return (
    <>
      {createPortal(
        <OutsideClickContainer
          onClose={modalStore.dismiss}
          isOpen={modalStore.isVisible}
        >
          <div
            className={`modal-container ${modalStore.isVisible && "active"}`}
          >
            <span className="modal-title">{modalStore.title}</span>
            <p className="modal-paragraph">{modalStore.paragraph}</p>
            <div className="modal-button-container">
              <Button className="btn-cancel" onClick={modalStore.dismiss}>
                {modalStore.cancelText}
              </Button>
              {modalStore.confirmButtonType === "primary" && (
                <Button className="btn-primary" onClick={handleConfirm}>
                  {modalStore.confirmText}
                </Button>
              )}
              {modalStore.confirmButtonType === "delete" && (
                <Button className="btn-delete" onClick={handleConfirm}>
                  {modalStore.confirmText}
                </Button>
              )}
            </div>
          </div>
        </OutsideClickContainer>,
        document.getElementById("modal-root")!
      )}
    </>
  );
};
