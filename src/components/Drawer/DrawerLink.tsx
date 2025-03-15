"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  url: string;
  name: string;
};

export default function DrawerLink({ url, name }: Props) {
  const pathname = usePathname();
  return (
    <Link
      scroll={false}
      href={url}
      className={`${pathname === url ? "text-primary font-semibold" : ""}`}
    >
      {name}
    </Link>
  );
}
