"use client";
import { createPortal } from "react-dom";

import { useModalStore } from "@/store/modal-store";

import { OutsideClickContainer } from "../outsideClick/OutsideClick";
import { Button } from "@mui/material";

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
            className={`z-[101] max-h-[40rem] min-h-[10svh] min-w-[25svw] max-w-[40rem] flex-col rounded-md bg-neutral-200 p-4 text-neutral-900 ${
              modalStore.isVisible ? "flex" : "none"
            }`}
          >
            <span className="text-3xl font-bold text-inherit">
              {modalStore.title}
            </span>
            <p className="mb-8 mt-2 flex-1 font-normal text-inherit">
              {modalStore.paragraph}
            </p>
            <div className="flex flex-col justify-end gap-4 md:flex-row">
              <Button
                variant="contained"
                style={{ backgroundColor: "var(--dark-200)" }}
                onClick={modalStore.dismiss}
              >
                {modalStore.cancelText}
              </Button>
              {modalStore.confirmButtonType === "primary" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleConfirm}
                >
                  {modalStore.confirmText}
                </Button>
              )}
              {modalStore.confirmButtonType === "delete" && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleConfirm}
                >
                  {modalStore.confirmText}
                </Button>
              )}
            </div>
          </div>
        </OutsideClickContainer>,
        document.getElementById("modal-root")!,
      )}
    </>
  );
};
