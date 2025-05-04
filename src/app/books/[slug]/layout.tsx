import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default async function Layout({ children }: Props) {
  return <main className="xl:px-8 px-4">{children}</main>;
}
