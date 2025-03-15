"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
};

export default function Modal({ children }: Props) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  useEffect(() => {
    if (pathname !== "/add-user") {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [pathname]);

  if (!open) return null;

  return createPortal(
    <dialog id="modal_add_user" className="modal modal-open">
      <div className="modal-box w-[400px]">{children}</div>
    </dialog>,
    document.body
  );
}
