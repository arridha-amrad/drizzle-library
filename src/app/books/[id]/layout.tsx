import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  modal: ReactNode;
  loanList: ReactNode;
  review: ReactNode;
};

export default async function Layout({ children, modal }: Props) {
  return (
    <main className="px-8">
      {children}
      {modal}
    </main>
  );
}
