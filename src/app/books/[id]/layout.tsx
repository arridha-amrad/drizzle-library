import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  modal: ReactNode;
  loanList: ReactNode;
};

export default async function Layout({ children, modal, loanList }: Props) {
  return (
    <main className="px-8">
      {children}
      {modal}
      {loanList}
    </main>
  );
}
