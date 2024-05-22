import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return <main className="xl:px-8 px-2 py-4">{children}</main>;
}
