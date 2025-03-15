import { CHARGE_PER_DAY } from "@/variables";

const countCharge = (dueDate: Date) => {
  const dueTime = new Date(dueDate).getTime();
  const currTime = new Date().getTime();
  if (currTime <= dueTime) return 0;
  const charge =
    Math.floor((currTime - dueTime) / (1000 * 60 * 60 * 24)) * CHARGE_PER_DAY;
  return charge <= 0 ? 0 : charge;
};

export default countCharge;
