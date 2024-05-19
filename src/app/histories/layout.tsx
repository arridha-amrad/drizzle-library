import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default async function Layout({ children }: Props) {
  return <main className="px-8 py-4">{children}</main>;
}
