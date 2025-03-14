"use client";

import { ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
};

export default function Modal({ children }: Props) {
  const refDialog = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    refDialog.current?.showModal();
  }, []);
  return (
    <dialog ref={refDialog} id="modal_add_book" className="modal">
      <div className="modal-box w-[400px]">{children}</div>
    </dialog>
  );
}
