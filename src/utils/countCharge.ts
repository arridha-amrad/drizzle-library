const countCharge = (dueDate: Date) => {
  const dueTime = dueDate.getTime();
  const currTime = new Date().getTime();
  if (currTime <= dueTime) return 0;
  const charge =
    Math.floor((currTime - dueTime) / (1000 * 60 * 60 * 24)) * 1000;
  return charge <= 0 ? 0 : charge;
};

export default countCharge;
