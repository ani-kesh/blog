import months from "../constants/months";

export function getCurrentDateStr() {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();

  const currentDate = `${months[month]} ${day}, ${year} `;

  return currentDate;
}


export function getCurrentDateInMilliseconds() {
  const now = new Date();

  const currentDate = now.getTime();

  return currentDate;
}