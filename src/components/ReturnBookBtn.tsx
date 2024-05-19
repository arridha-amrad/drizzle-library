"use client";

import { returnBook } from "@/actions/bookActions";
import { LoanTable } from "@/drizzle/schema";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  data: typeof LoanTable.$inferSelect;
};
export default function ReturnBookBtn({ data }: Props) {
  const [loading, setLoading] = useState(false);
  const returnBookAction = async () => {
    setLoading(true);
    try {
      await returnBook(data);
      toast.success("Book return successfully");
    } catch (err) {
      toast.error("Book return failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      disabled={loading}
      onClick={returnBookAction}
      className="btn btn-warning btn-sm"
    >
      Return
    </button>
  );
}
