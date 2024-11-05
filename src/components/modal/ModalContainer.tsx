"use client";
import useModalStore from "@/hooks/modalStore";

const ModalContainer: React.FC = () => {
  const { modals, close } = useModalStore();

  return (
    <>
      {modals.map((modal, idx) => {
        const { Component, props } = modal;
        return (
          <div
            key={idx}
            className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={close}
          >
            <div className="modal-content">
              <Component {...props} />
            </div>
          </div>
        );
      })}
    </>
  );
};
export default ModalContainer;
