import months from "../constants/months";

export function getCurrentDate() {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();

  const currentDate = `${months[month]} ${day}, ${year} `;

  return currentDate;
}
