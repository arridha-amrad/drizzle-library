import { CHARGE_PER_DAY } from "@/constants";
import { ClassValue, clsx } from "clsx";
import slugify from "slugify";
import { twMerge } from "tailwind-merge";

export const countCharge = (dueDate: Date) => {
  const dueTime = new Date(dueDate).getTime();
  const currTime = new Date().getTime();
  if (currTime <= dueTime) return 0;
  const charge =
    Math.floor((currTime - dueTime) / (1000 * 60 * 60 * 24)) * CHARGE_PER_DAY;
  return charge <= 0 ? 0 : charge;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

export const formatDate = (date: Date, isIncludeTime?: boolean) => {
  if (isIncludeTime) {
    return new Intl.DateTimeFormat("id", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  }
  return new Intl.DateTimeFormat("id").format(date);
};

export const formatToRupiah = (value: number) => {
  return "Rp " + new Intl.NumberFormat("id-ID").format(value);
};

export const createSlug = (text: string) => {
  return slugify(text, { lower: true });
};
